import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/loginActions';
import '../App.css';
import { Login } from './index';

class LoginPage extends Component {
  render() {
    const { loginRequest } = this.props
    return (
      <div className="App login">
        <Login loginRequest={loginRequest} />
      </div>
    );
  }
}



export default connect((state)=> { return {} }, {loginRequest})(LoginPage);