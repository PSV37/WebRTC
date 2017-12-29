import React, { Component } from 'react'


class PageTitle extends Component {
	render(){
		return(
			<h1 className="page-title"> {this.props.title}
                <br/><small className="font-blue-chambray">{this.props.titleDescription}</small>
            </h1>
		)
	}
}

export default PageTitle