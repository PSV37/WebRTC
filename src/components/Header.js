import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import { sessionService } from 'redux-react-session';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Header extends Component {
	constructor(props){
        super(props);
        if(props.user){
        	this.state = {
	        	FirstName : props.user.FirstName,
	        	LastName : props.user.LastName,
	        	ProfilePic:props.user.Profile,
	        }
        }else{
        	this.state = {
	        	FirstName : '',
	        	LastName : '',
	        	ProfilePic:'theme/assets/layouts/layout/img/avatar3_small.jpg',
	        }
        }
        
        this.handleLogout = this.handleLogout.bind(this);
        this.sideBarToggle = this.sideBarToggle.bind(this);
        
    }
    handleLogout(e){
    	this.props.logout(this.props.user);
    	sessionService.deleteSession();
    	sessionService.deleteUser();
    	this.context.router.history.push('/login');
    }

    sideBarToggle(e){
    	window.toggleSidebar();
    }
	render(){
		return(
			<div className="page-header navbar navbar-fixed-top">
			    <div className="page-header-inner ">
			        <div className="page-logo">
			            <a href="/">
			                <img src="/theme/assets/layouts/layout/img/m360logo-ytel_clean.svg" alt="logo" className="logo-default dashboardlogo" /> </a>
			            <div className="menu-toggler sidebar-toggler" onClick={this.sideBarToggle}>
			                <span></span>
			            </div>
			        </div>
			        <a  className="menu-toggler responsive-toggler" >
			            <span></span>
			        </a>
			        <div className="top-menu">
			            <ul className="nav navbar-nav pull-right">
			                <li className="dropdown dropdown-user">
			                    <a  className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
			                        <img alt="" className="img-circle" src= {this.state.ProfilePic} />
			                        <span className="username username-hide-on-mobile"> {this.state.FirstName} {this.state.LastName}</span>
			                        <i className="fa fa-angle-down"></i>
			                    </a>
			                    <ul className="dropdown-menu dropdown-menu-default">

			                        <li>
			                            <a onClick={this.handleLogout}>
			                                <i className="icon-key"></i> Log Out </a>
			                        </li>
			                    </ul>
			                </li>
			            </ul>
			        </div>
			    </div>
			</div>
		)
	}
}

function mapStateToProps(state, session){
    return {
        user: state.user.user,
    };
}


function matchDispatchToProps(dispatch){
    return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);

Header.contextTypes = {
    router : PropTypes.object.isRequired
}

