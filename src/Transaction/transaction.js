import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './transaction.css';
import firebaseApp  from '../firebaseConfig';

class Transaction extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogged: false,
      user: null,
      openLogin: false,
      openSignUp: false,
    }
    
  }



  render() {
   
    return (
      <div className="Transaction">
        transaction
      </div>
    );
  }
}

export default Transaction;
