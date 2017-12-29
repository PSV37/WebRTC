import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


class PrivateRoute extends Component{
  constructor(props){
    console.log('private routes')
    super(props);
    console.log(props)
  }

  render() {
    
    
    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        render={props => (
          this.props.authenticated ? (
            React.createElement(this.props.component, props)
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}/>
          )
        )}
      />
    );
  }
}

const { object, bool, string, func } = PropTypes;

PrivateRoute.propTypes = {
  component: func.isRequired,
  exact: bool,
  path: string.isRequired,
  authenticated: bool,
  location: object
};

export default PrivateRoute;