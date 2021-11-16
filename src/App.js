import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login'
import Debits from './components/Debits'
import Credits from './components/Credits'
import axios from "axios";


class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      debit: [],
      credit: [],
      currentUser: {
        userName: 'Homer_Simpson',
        memberSince: '07/23/96',
      },
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

  render() {


    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);

    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    )

    const DebitComponent = () => (
      <Debits debits = {this.state.debits}/>
    )

    const CreditComponent = () => (
      <Credits credits = {this.state.credits}/>
    )
    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
          </div>
        </Router>
    );

  }

}

export default App;
