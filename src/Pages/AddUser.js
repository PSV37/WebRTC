import React, { Component } from 'react'
import { BreadCrump, PageTitle, AddUserForm } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';


class AddUser extends Component {
    render(){
        return(
            <Home>
                <BreadCrump />
                <PageTitle title="ADD USER" titleDescription="" />
                
                <AddUserForm />    
            </Home>
        )
    }
}

function mapStateToProps(state, session){
    return {
        user: state.user,
        state : state,
        checked: state.session.checked,
        authenticated: state.session.authenticated,
        session: state.session,
        userSession: state.session.user
    };
}


export default connect(mapStateToProps)(AddUser);
