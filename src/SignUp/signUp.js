import React, { Component } from 'react';
import '../Login/login.css';
import firebaseApp from '../firebaseConfig';
import * as constant from '../Global/constants';
import '../Global/global.css';
import $ from 'jquery';
import * as rand from 'rand-token';
import * as hash from 'js-md5';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPW: '',
      isSubmitted: false,
    }
    this.signUp = this.signUp.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handleChangeConfirmPW = (e) => {
    this.setState({ confirmPW: e.target.value });
  }

  signUp() {
    // axios.post();
    let that = this;
    this.setState({ isSubmitted: true });
    if (this.state.isSubmitted) {
      let isValidate = this.validateForm();
      if (isValidate) {     
        let email = this.state.email;
        const db = firebaseApp.database();
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(function (user) {
            alert("Tạo tài khoản thành công");
            let walletID = hash(rand.generate(6));
            db.ref('users/' + user.uid).set({ email: email, walletID: walletID }); // I added user
            db.ref('wallet/'+walletID).set({ balance: "1000" }); // I added user
            that.setState({isSubmitted:false});
            $("#closeSignUp").click();
          })
      }
    }
  }

  validateForm() {
      if (!this.state.email || !this.state.password || !this.state.confirmPW || this.state.confirmPW !== this.state.password) {
        return false;
      } else {
        return true;
      }       
  }

  resetData() {
    this.setState({email:'',password:'',confirmPW:'',isSubmitted:false});
  }
  render() {
    
    return (
      <div className="SignUp">
        <div className="modal fade" id="sign-up-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
          <div className="modal-dialog">
            <div className="loginmodal-container">
              <button id="closeSignUp" type="button" className="close" data-dismiss="modal" onClick={this.resetData}>&times;</button>
              <h1>Create your Wallet</h1>
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="label-control">Email</label>
                  <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail} />
                  {!this.state.email && this.state.isSubmitted  ? <div className="warning">{constant.EMAIL_REQUIRED}</div> : null}
                </div>
                <div className="form-group">
                  <label className="label-control">New Password</label>
                  <input type="password" name="newPW" value={this.state.password} onChange={this.handleChangePassword} />
                  {!this.state.password && this.state.isSubmitted ? <div className="warning" >{constant.PASSWORD_REQUIRED}</div> : null}
                </div><div className="form-group">
                  <label className="label-control">Confirm Password</label>
                  <input type="password" name="confirmPW" value={this.state.confirmPW} onChange={this.handleChangeConfirmPW} />
                  {!this.state.confirmPW && this.state.isSubmitted ? <div className="warning">{constant.CONFIRM_PW_REQUIRED}</div> : null}
                  {this.state.password !== this.state.confirmPW && this.state.confirmPW && this.state.isSubmitted ? <div className="warning">{constant.PW_NOT_EQUAL}</div> : null}
                </div>
                <div className="form-group">
                  <input onClick={this.signUp} type="button" name="signUp" className="login loginmodal-submit" value="Sign Up" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
