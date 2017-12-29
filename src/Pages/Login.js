import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuth, loginRequest } from '../actions/loginActions';
import { sessionService } from 'redux-react-session';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors : {
                email : '',
                password : '',
                common : '',
            },
            user : {},
            email : '',
            password : '',
            isLoggedIn : false,
            
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //to set height of content
       document.body.style.setProperty("background-color", "#F6F6F6");
    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        var error = {};
        this.props.loginRequest(this.state).then(function(response){
            self.setState({ isLoggedIn : response.data.Message360.ResponseStatus });
            if(response.data.Message360.ResponseStatus === 0){
                self.setState({ isLoggedIn : false });
                
                response.data.Message360.Errors.Error.forEach(function(value,key) {
                    if(value.Code==='ER-M360-GEN-151' || value.Code==='ER-M360-GEN-209'|| value.Code==='ER-M360-GEN-152'){
                        error['email'] =  value.Message;
                    }

                    if(value.Code==='ER-M360-GEN-157' || value.Code==='ER-M360-GEN-113'){
                        error['password'] =  value.Message;
                        
                    }
                });
                self.setState({ errors : error });
            }else{
                error['email'] =  '';
                error['password'] =  '';
                self.setState({ errors : error });
                self.setState({ user : response.data.Message360.User });
                self.setState({ isLoggedIn : true });
                self.props.setAuth(self.state);
                var globalState = self.props.globalState;
                var user = self.props.user
                sessionService.saveSession({ globalState });
                sessionService.saveUser(user);
                self.context.router.history.push('/');
            }
            
        }).catch(function (error) {
            console.log(error);
        });
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
  render() {
    

    return (
      <div className="App login">
                     <div className="logo">
                        <a href="index.html">
                            <img src="/theme/assets/layouts/layout/img/m360logo-ytel_clean.svg" alt="" className="logoimg"/> </a>
                    </div>
                <div className="content">
                    <form className="login-form" action="index.html" method="post" onSubmit={this.handleSubmit}>
                    
                        <h2 className="form-title">Login</h2>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert"></button>
                            <span> Enter any email and password. </span>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9"  >Email</label>
                            <div className="input-icon">
                                <i className="fa fa-user"></i>
                                <input className="form-control placeholder-no-fix" type="text"  placeholder="Email" name="email" value={ this.state.email } onChange={this.onChange} /> 
                                <span className="font-red-thunderbird">{ this.state.errors.email }</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Password</label>
                            <div className="input-icon">
                                <i className="fa fa-lock"></i>
                                <input className="form-control placeholder-no-fix" type="password" placeholder="Password" name="password" value={ this.state.password } onChange={this.onChange}/> 
                                <span className="font-red-thunderbird">{ this.state.errors.password }</span>
                            </div>
                        </div>
                        <div >
                            <button type="submit" className="btn btn-primary"> Login </button>
                        </div>
                        
                        <div>
                        </div>
                    </form>
                </div>
                <div className="copyright"> 2017 © Metronic. Admin Dashboard Template.</div>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
        user: state.user,
        globalState : state,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({setAuth: setAuth, loginRequest}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);

Login.contextTypes = {
    router : PropTypes.object.isRequired
}

