import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login'
import Debits from './components/Debits'
import Credits from './components/Credits'
import './App.css'
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'Homer_Simpson',
        memberSince: '07/23/96',
      }

    }
  }

  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    //get data from API response
    debits = debits.data
    credits = credits.data

    //calculates debit and credit totals
    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })
    //calculates balance and sets it as well as credit sum and debit
    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  }

  mockLogIn = (logInInfo) => {
    const newUser = {
    ...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }


  addDebit = (e) => {
    //send to debits view via props
    //updates state based off user input
    e.preventDefault();
    // gets the current date and formats it
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //isolates the description and amount from the passed input
    const description  = e.target[0].value;
    const amount  = Number(e.target[1].value);
    //creates a new debit object from the passed values
    const newDebit = {id: this.state.debits.length, amount: amount, description: description, date:date}
    //updates account balance, the debit sum and adds the newdebit to the list
    this.setState({accountBalance: this.state.accountBalance - amount, debitSum: this.state.debitSum+amount, debits: [newDebit, ...this.state.debits]})
  }

  addCredit = (e) => {
    //send to debits view via props
    //updates state based off user input
    e.preventDefault();
    // gets the current date and formats it
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //isolates the description and amount from the passed input
    const description  = e.target[0].value;
    const amount  = Number(e.target[1].value);
    //creates a new debit object from the passed values
    const newCredit = {id: this.state.credits.length, amount: amount, description: description, date:date}
    //updates account balance, the debit sum and adds the newdebit to the list
    this.setState({accountBalance: this.state.accountBalance + amount, creditSum: this.state.creditSum+amount, credits: [newCredit, ...this.state.credits]})

  }

  render() {

    const {debits} = this.state;
    const {credits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);

    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );

    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} accountBalance={this.state.accountBalance}/>);

    const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={credits} accountBalance={this.state.accountBalance} />);

    return (
        <Router>
          <Switch>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </Switch>
        </Router>
    );

  }

}

export default App;
