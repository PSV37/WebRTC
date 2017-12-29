import React, { Component } from 'react';
import { Footer, Header, Sidebar } from '../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuth } from '../actions/loginActions';
import { bindActionCreators } from 'redux';


class Home extends Component {
    componentDidMount(){
        //to set height of content
       window.Layout.init();
       window.sidebarState();
       document.body.style.setProperty("background-color", "#003366");
    }
    render(){
        return(
            <div>
                <page>
                    <div className="page-wrapper"> 
                        <Header />
                        <div className="clearfix"> </div>
                            <div className="page-container page-container-bg-solid">
                            <Sidebar />
                            <div className="page-content-wrapper">
                                <div className="page-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </page>
            </div>
        )
    }
}

const { object } = PropTypes;


function mapStateToProps(state){
    return {
        user: state.session.user,
        authenticated: state.session.authenticated
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators( {setAuth: setAuth}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);

Home.contextTypes = {
    router : PropTypes.object.isRequired
}

Home.propTypes = {
  actions: object,
  user: object.isRequired,
};