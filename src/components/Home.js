import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://static.wikia.nocookie.net/simpsons/images/a/a5/FirstBankofSpringfield.png/revision/latest/scale-to-width-down/624?cb=20100419104147" alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link>

          <AccountBalance accountBalance={this.props.accountBalance}/>
          <Link to="/login">log in</Link>

          <Link to="/debits">debits</Link>
        </div>
    );
  }
}

export default Home;
