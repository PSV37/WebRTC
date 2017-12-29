import React, { Component } from 'react'


class BreadCrump extends Component {
	render(){
		return(
			<div className="page-bar">
                <ul className="page-breadcrumb">
                    <li>
                        <a href="/">Home</a>
                        <i className="fa fa-circle"></i>
                    </li>
                    
                </ul>
            </div>
		)
	}
}

export default BreadCrump