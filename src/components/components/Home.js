import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import icon from '../FirstBankofSpringfield.png'
class Home extends Component {
  render() {
    return (
        <div>
          <img src={icon} alt="bank"/>
          <h1>Bank of React: Springfield branch</h1>

          <Link to="/userProfile">User Profile</Link>

          <AccountBalance accountBalance={this.props.accountBalance}/>
          <Link to="/login">log in</Link>
          <br></br>
          <Link to="/debits">debits</Link>
          <br></br>
          <Link to="/credits">credits</Link>
        </div>
    );
  }
}

export default Home;
