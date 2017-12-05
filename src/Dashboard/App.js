import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from '../Login/login';
import SignUp from '../SignUp/signUp';
import SideBar from '../Sidebar/sideBar';
import firebaseApp from '../firebaseConfig';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AccountBalance from '../AccountBalance/accountBalance';
import TransferSerivce from '../TransferService/transferService';
import Transaction from '../Transaction/transaction';
import * as localKey from '../Global/localKey';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false,
      openSignUp: false,
      state: false,
      user: null,
    }
    this.renderLogin = this.renderLogin.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.temp = this.temp.bind(this);
  }

  renderLogin() {
    ReactDOM.render(<Login onLogin={this.temp} />, document.getElementById('myModal'));
  }

  renderSignUp() {
    ReactDOM.render(<SignUp />, document.getElementById('myModal'));

  }

  temp() {
    let user = localStorage.getItem(localKey.USER);
    this.setState({state:true, user:user});  
  }

  logOut() {
    let that = this;
    firebaseApp.auth().signOut().then(function () {
      that.setState({state:false});
      localStorage.removeItem(localKey.USER);
      localStorage.setItem(localKey.ISLOGGED,false);
    })
  }

  componentWillMount () {
    let state = localStorage.getItem(localKey.ISLOGGED);
    this.setState({state:state})
    if (state) {
      let user = localStorage.getItem(localKey.USER);
      console.log(user);
      this.setState({user:user});  
    }
 
}
  render() {
    let isLogged;
    let myModal;
    let state = this.state.state;
    if (!state || state==='false') {
      isLogged = <ul className="nav navbar-nav navbar-right" >
        <li onClick={this.renderSignUp}><a data-toggle="modal" data-backdrop="static" data-target="#sign-up-modal"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li onClick={this.renderLogin}><a data-toggle="modal" data-backdrop="static" data-target="#login-modal"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>;
      myModal = <div id="myModal">
      </div>;
    } else {
      let user = JSON.parse(this.state.user);
      console.log(user);
        isLogged = <ul className="nav navbar-nav navbar-right">
        <li><a>Hello user <b>{user.email}</b></a></li>
        <li onClick={this.logOut}><a><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
      </ul>;
      myModal = null;
      
     
    }
    return (
        <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
                      

          <div className="row">
            <div className="menu">
              <div className="navbar-header">
                <a>M Y B L O C K C H A I N</a>
              </div>
              <div>
                {isLogged}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-md-2 col-lg-2 sidebarMenu">
              <SideBar />
            </div>
            <div className="col-sm-10 col-md-10 col-lg-10">
            <Switch>
                  <Route exact path="/account" component={AccountBalance} />
                  <Route path="/transfer" component={TransferSerivce} />
                  <Route path="/transaction" component={Transaction} />
                </Switch>
            </div>
          </div>
             

        </div>
        {myModal}
      </div>
       </BrowserRouter>
    );
  }
}

export default App;
