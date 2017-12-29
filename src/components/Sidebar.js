import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Sidebar extends Component {
	render(){
		return(
			<div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                        <li className="sidebar-toggler-wrapper hide">
                            <div className="sidebar-toggler">
                                <span></span>
                            </div>
                        </li>
                        <li className="nav-item start ">
                            <Link to="/">
                                <i className="icon-home nav-link nav-toggle"></i>
                                <span className="title">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="/domain"><i className="fa fa-building-o"></i>
                                <span className="title">Set/Update Domain</span>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="/viewuser"><i className="fa fa-user-plus"></i>
                                <span className="title">View Users</span>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="/adduser"><i className="fa fa-user"></i>
                                <span className="title">Add User</span>
                            </Link>
                        </li>

                        
                        <li className="nav-item ">
                            <Link to="/viewnumbers"><i className="fa fa-phone"></i>
                                <span className="title">View Numbers</span></Link>
                            </li>
                        <li className="nav-item ">
                            <Link to="/ViewCallLogs"><i className="fa fa-list"></i>
                                <span className="title">View Call Logs</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
		)
	}
}

export default Sidebar