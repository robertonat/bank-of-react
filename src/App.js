import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login'
import Debits from './components/Debits'
import Credits from './components/Credits'
import axios from "axios";
import './App.css'


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

    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })
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
    const today = new Date()
    const description  = e.target[0].value;
    const amount  = Number(e.target[1].value);
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //const date = String(2021)+ "-"+ String(11) + "-" + String(16)
    const newDebit = {id: this.state.debits.length, amount: amount, description: description, date:date}
    this.setState({accountBalance: this.state.accountBalance - amount, debitSum: this.state.debitSum+amount, debits: [newDebit, ...this.state.debits]})

  }



  render() {

    const {debits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);

    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );

    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} />);

    const CreditComponent = () => (<Credits credits = {this.state.credits}/>);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
          </div>
        </Router>
    );

  }

}

export default App;
