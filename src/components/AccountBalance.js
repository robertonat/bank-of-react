import React, {Component} from 'react';

class AccountBalance extends Component {
  render() {
    if((Math.round(this.props.accountBalance*100)/100)<0){
      return (
          <div>
            Balance: {Math.round(this.props.accountBalance*100)/100}
            <br></br>
            D'oh your account balance is in the red. Remedy this immediately!
          </div>
      );
    }

    return (
        <div>
          Balance: {Math.round(this.props.accountBalance*100)/100}
        </div>
    );
  }
}
export default AccountBalance;
