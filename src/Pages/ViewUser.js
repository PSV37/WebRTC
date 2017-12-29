import React, { Component } from 'react'
import { BreadCrump, PageTitle } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userList } from '../actions/userListActions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'react-loader-advanced';

class ViewUser extends Component {
constructor(props){
        super(props);
        
         this.state = {
      users: [],
      name:'',
      account_sid : props.user.user.AccountSid,
      loading:false,
    };
 
    }
    
    componentDidMount(){
     var self = this;
     this.setState({loading : true});
            this.props.userList(self.state).then(function(response){
                console.log('into data');
                console.log(response);
                console.log(response.data.Message360.ResponseStatus);
                
                self.setState({users: response.data.Message360.UserList.User});
                self.setState({loading : false});
                setTimeout(function(){
                  console.log(self.state);
                  console.log('userlist')
                }, 2000)
                
            }).catch(function (error) {
                console.log('into error');
                self.setState({loading : false});
                
            });
    }

    priceFormatter(cell, row) { 

      var row_data = row;
      // JSX example
      return (
          <Link to={"changeuser/"+row_data.Username} > <span className="title"><a>Manage User</a></span> </Link>
        );
    }

    statusFormatter(cell, row) { 

      var row_data = row;
      // JSX example
      if(row_data.IsActive==1){
        return (
              <span>Active</span>
            );
      }
      if(row_data.IsActive==0){
        return (
              <span>Inactive</span>
            );
      }
      if(row_data.IsActive==2){
        return (
              <span>Deleted</span>
            );
      }
     
    }

    render(){
      const loader = <span> <img src="theme/assets/global/img/ajax-loading.gif" alt="Loader" /> <br /> Loading... </span>
        const options = {searchField: this.createCustomSearchField,defaultSortName: 'FirstName',defaultSortOrder: 'desc' };
        return(
            <Home>
                <BreadCrump />
                <PageTitle title="VIEW USERS" titleDescription="" />
                
                <div className="portlet light bordered">
                  <div className="portlet-body">              
                      <div className="form-group">                
                        <div>
                          <Loader show={this.state.loading} message={loader} messageStyle={{ fontSize:'1.5em', color:'white' }}>
                          <BootstrapTable
                            data={ this.state.users }
                            pagination options={options} search>
                            <TableHeaderColumn dataField='FirstName' isKey dataSort>First Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='LastName'  dataSort>Last Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='Username' dataSort>Username</TableHeaderColumn>
                            <TableHeaderColumn dataField='CountryCode' dataSort>CountryCode</TableHeaderColumn>
                            <TableHeaderColumn dataField='IsActive' dataFormat={ this.statusFormatter }>Active</TableHeaderColumn>
                            <TableHeaderColumn dataField='PhoneNumber' dataSort>Phone Number</TableHeaderColumn>                            
                             <TableHeaderColumn dataField='PhoneNumber' dataFormat={ this.priceFormatter }>Actions</TableHeaderColumn>                                      
                          </BootstrapTable>
                        </Loader>
                        </div>
                    </div>
                  </div>
                </div>
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

function matchDispatchToProps(dispatch){
    return bindActionCreators({userList: userList}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(ViewUser);
