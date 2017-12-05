import React, { Component } from 'react';
import './login.css';
import SignUp from '../SignUp/signUp';
import ReactDOM from 'react-dom';
import firebaseApp from '../firebaseConfig';
import $ from 'jquery';
import * as localKey from '../Global/localKey';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',  
    }
    this.login = this.login.bind(this);
  }

  renderSignUp () {
    ReactDOM.render(<SignUp />, document.getElementById('myModal'));
  }

  login () {
    let that = this;
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(user){
      const db = firebaseApp.database();
      db.ref('users/'+user.uid).once("value").then(function (result) {
        
        let user = JSON.stringify(result.val());
        localStorage.setItem(localKey.USER,user);
        localStorage.setItem(localKey.ISLOGGED,true);
        that.props.onLogin(result.val()); 
      }); // I added user
      $("#closeLogin").click();
     
    })
      
    
  }

  handleChangeEmail = (e) =>{ 
    this.setState({email: e.target.value});
  }

  handleChangePassword = (e) =>{ 
    this.setState({password: e.target.value});
  }


  render() {
    return (
      <div className="Login">
          <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
      
            <div className="loginmodal-container">
              <button id="closeLogin" type="button" className="close" data-dismiss="modal" onClick={this.resetData}>&times;</button>
              <h1>Login to Your Account</h1>
              <span hidden id="closeLogin" data-dismiss="modal">X</span>
              <form>
                <input type="text" name="user" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail}/>
                <input type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword}/>
                <input type="button" name="login" className="login loginmodal-submit" value="Login" onClick={this.login}/>
				      </form>			
              <div className="login-help">
                <a onClick={this.renderSignUp} data-toggle="modal" data-target="#sign-up-modal">or Sign Up</a>
              </div>
				    </div>
			    </div>
		    </div>
      </div>
            );
  }
}

export default Home;
