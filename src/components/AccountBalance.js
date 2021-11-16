import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    return (
        <div>
          Balance: {Math.round(this.props.accountBalance*100)/100}

        </div>
    );
  }
}
/////{Math.round((this.props.accountBalance*100)/100).toFixed(2)}
export default AccountBalance;
