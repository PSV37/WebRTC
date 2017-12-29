import React, { Component } from 'react'
import { BreadCrump, PageTitle, SetUpdateDomainForm } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';



class Domain extends Component {
    render(){
        return(
            <Home>
                <BreadCrump />
                <PageTitle title="SET/UPDATE DOMAIN" titleDescription="" />
                <SetUpdateDomainForm />    
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


export default connect(mapStateToProps)(Domain);
