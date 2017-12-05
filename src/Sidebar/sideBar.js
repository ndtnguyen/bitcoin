import React, { Component } from 'react';
import './sideBar.css';
import {Link} from 'react-router-dom';

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <nav className="navbar navbar-default sidebar">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><Link to="/account">ACCOUNT BALANCE<span className="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></Link></li>
                <li ><Link to="/transfer">TRANSFER SERVICE<span className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></Link></li>
                <li ><Link to="/transaction">TRANSACTION<span className="pull-right hidden-xs showopacity glyphicon glyphicon-tags"></span></Link></li>
              </ul>
            </div>
          
        </nav>
      </div>
    );
  }
}

export default SideBar;
