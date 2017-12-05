import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './transferService.css';
import firebaseApp from '../firebaseConfig';
import * as rand from 'rand-token';
import * as hash from 'js-md5';

class TransferService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money:'',
      walletID:'',
      description:''
    }
    this.transferMoney = this.transferMoney.bind(this);
  }

  handleChangeWalletID = (e) =>{ 
    this.setState({walletID: e.target.value});
  }

  handleChangeDescription= (e) =>{ 
    this.setState({description: e.target.value});
  }

  handleChangeMoney= (e) =>{ 
    this.setState({money: e.target.value});
  }

  transferMoney = function() {
    let that = this;
    let result = window.confirm("Do you want to transfer "+this.state.money+"bitcoin to "+this.state.walletID+"?");
    if (result === true) {
      const db = firebaseApp.database();
      db.ref('wallet/'+this.state.walletID).once("value").then(function (result) {
        let currentWallet = result.val();
        let balance = currentWallet.balance + that.state.money;
        db.ref('wallet/'+that.state.walletID).set({balance:balance}).then(function (result) {
          alert("Transfer successful");
          let date = new Date().toString();
          var history = {
            transactID : "BIT"+hash(rand.generate(6))+ date,
            date : date,
            description : that.state.description,
            money : that.state.money
          }
          db.ref('wallet/'+that.state.walletID).set({history:history});
      });
      });
     
    }
    
  }
  

  render() {
    return (
      <div className="AccountBalance">
        <div className="panel panel-default">
          <div className="panel-heading">Send Bitcoin</div>
          <div className="panel-body">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="label-control col-md-1">To:</label>
                <div className="col-md-10">
                  <input className="form-control" type="text"value={this.state.walletID} onChange={this.handleChangeWalletID} placeholder="Enter beneficiary's walletID" />
                </div>
              </div>
              <div className="form-group">
                <label className="label-control col-md-1">Amount:</label>
                <div className="col-md-10">
                  <input className="form-control" value={this.state.money} onChange={this.handleChangeMoney} type="number" placeholder="Enter money"/>
                </div>
              </div>
              <div className="form-group">
                <label className="label-control col-md-1">Description:</label>
                <div className="col-md-10">
                  <textarea className="form-control"value={this.state.description} onChange={this.handleChangeDescription} placeholder="Enter description. E.g: money for buying present..."></textarea>
                </div>
              </div>
              <button type="button" onClick={this.transferMoney}>Transfer</button>
            </form>

          </div>

        </div>
      </div>
    );
  }
}

export default TransferService;
