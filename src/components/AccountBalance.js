import React, {Component} from 'react';

class AccountBalance extends Component {

  render() {
    //Round up the account balance to two decimal places to properly represent cents
    //set the rounded account balance to variable displayBalance
    let displayBalance = (Math.round(this.props.accountBalance*100)/100);
    //an if statement to display a warning message if the account balance is below 0
    if(displayBalance<0){
      return (
          <div>
            Balance: {displayBalance}
            <br></br>
            D'oh your account balance is in the red. Remedy this immediately!
          </div>
      );
    }

    return (
        <div>
          Balance: {displayBalance}
        </div>
    );
  }
}
export default AccountBalance;
