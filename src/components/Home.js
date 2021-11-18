import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import icon from '../FirstBankofSpringfield.png'
import '../App.css'

class Home extends Component {
  render() {
    document.title = "Home"
    return (
        <div>

          <div class="banner">
            <h1>Bank of React: </h1>
            <p>Springfield branch</p>
          </div>

          <div class ="interface">
            <Link to="/login">log in</Link>
            <br></br>
            <Link to="/userProfile">User Profile</Link>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            <Link to="/debits">debits</Link>    |   <Link to="/credits">credits</Link>
            <br></br>
            <br></br>
            <img src={icon} alt="bank" style={{alignSelf: 'center'}} />
          </div>
          
        </div>
    );
  }
}

export default Home;
