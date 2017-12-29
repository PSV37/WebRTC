import React, { Component } from 'react';
import './index.css';
import {   LoginPage, Dashboard, ViewUser, AddUser ,ChangeUser, ViewCallLogs,ViewNumbers, Domain} from './Pages'
import { BrowserRouter,Route, Redirect, Switch } from 'react-router-dom'
import { PrivateRoute, LoginRoute } from './components';
import { connect } from 'react-redux';
import { persistAuth,logout,regenrateTokenRequest ,setAuth} from './actions/loginActions';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';



class App extends Component {

	componentWillMount(){
		
		var user_data = localStorage.getItem('webrtc_user_auth');
		console.log(user_data);
		if(user_data){
			var obj = JSON.parse(user_data);
			console.log('into application component mount');
			let userAutherization = {
				account_sid : obj.user.AccountSid,
				auth_token : obj.user.AuthToken,
			};
			var self = this;
			this.props.regenrateTokenRequest(userAutherization).then(function(response){
            if(response.data.Message360.ResponseStatus === 0){
                self.setState({ isLoggedIn : false });
                self.props.logout();
            }else{
            	console.log('into app response');
            	console.log(response.data.Message360.User);
                let user_data = {
                	user : response.data.Message360.User,
                	isLoggedIn : true
                }
                self.props.setAuth(user_data);
                sessionService.saveSession({ user_data });
                sessionService.saveUser(user_data.user);
            }
            
        }).catch(function (error) {
            console.log(error);
        });
			console.log(userAutherization);
			this.props.persistAuth(obj);
		}else{
			this.props.logout(this.props.user);
    		sessionService.deleteSession();
    		sessionService.deleteUser();
		}

	}
  
  render() {
    const { authenticated, checked } = this.props
    return (
		<BrowserRouter>
		 
		  { checked &&
		  	 <div>
		  	 <Switch>
		  	 	<LoginRoute exact path='/login' component={LoginPage} authenticated={authenticated}/>
		  		<PrivateRoute exact  path='/' component={Dashboard} authenticated={authenticated} />
		  		<PrivateRoute   path='/domain' component={Domain} authenticated={authenticated} />
		  		<PrivateRoute   path='/viewuser' component={ViewUser} authenticated={authenticated} />
		  		<PrivateRoute   path='/adduser' component={AddUser} authenticated={authenticated} />
		  		<PrivateRoute   path='/changeuser/:username' component={ChangeUser} authenticated={authenticated} />
		  		<PrivateRoute   path='/viewnumbers' component={ViewNumbers} authenticated={authenticated} />
		  		<PrivateRoute   path='/viewcalllogs' component={ViewCallLogs} authenticated={authenticated} />
		    	<Route  component={LoginPage} />
		    </Switch>
		     </div>
		   }
		 
		</BrowserRouter>
    );
  }
}


function mapStateToProps(state, session){
    return {
        user: state.user,
        state : state,
        checked: state.session.checked,
  		authenticated: state.session.authenticated,
  		session: state.session
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({persistAuth,logout,regenrateTokenRequest,setAuth}, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(App);


