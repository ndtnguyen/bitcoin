import React, { Component } from 'react';
import './accountBalance.css';
import firebaseApp from '../firebaseConfig';
import * as localKey from '../Global/localKey';

class AccountBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletID:'',
            balances:'',
            ether:'',
        }
    this.getData = this.getData.bind(this);
    }

    getData () {
        let that = this;
        let user = JSON.parse(localStorage.getItem(localKey.USER));
        if (user) {
            var userWallet = firebaseApp.database().ref('wallet/'+ user.walletID);
            userWallet.on('value', function(snapshot) {
                let wallet = snapshot.val();
                that.setState({walletID: user.walletID, balances: wallet.balance});
        });
        }
        
    }
    componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <div className="AccountBalance">
                <div className="panel panel-default">
                    <div className="panel-heading">Account Balance</div>
                    <div className="panel-body">
                        <div className="walletInfo">Your wallet ID: {this.state.walletID}</div>
                        <div className="walletInfo">Your balances: {this.state.balances}</div>
                        </div>
                    
                </div>
            </div>
        );
    }
}

export default AccountBalance;
