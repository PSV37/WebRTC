import React, { Component } from 'react'


class Notes extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : props.title,
            description : props.description,
            type : props.type
        }
    }
	render(){
		return(
			<div className={ "note note-"+this.state.type }>
                { this.state.title ? <h4 className="block">{this.state.title}</h4> : null }
                <p> {this.state.description} </p>
            </div>
		)
	}
}

export default Notes