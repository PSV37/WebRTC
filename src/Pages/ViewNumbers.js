import React, { Component } from 'react';
import { BreadCrump, PageTitle } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';
import { bindActionCreators } from 'redux';
import { viewNumbers , webrtcOverRideRequest} from '../actions/viewNumbers';
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'react-loader-advanced';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

class ViewNumbers extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          users: [],
          name:'',
          account_sid : props.user.user.AccountSid,
          auth_token : props.user.user.AuthToken,
          number_log:[],
          start_date:'',
          end_date:'',
          date : '2017-04-24',
          call_logs_error : {status:false , message:"No calls found"},
          loading:false,
          value:'',
          success:{
            status: false,
            message: ''
          },
          errors:{
            status:false,
            message:''
          },
        };
        this.onChange = this.onChange.bind(this);
        this.priceFormatter = this.priceFormatter.bind(this);
        this.handleBaconChange = this.handleBaconChange.bind(this);
       
    }

    createCustomSearchField = (props) => {
      return (
        <SearchField
            className='my-custom-class'
            defaultValue=''
            placeholder=''/>
      );
    }
    handleBaconChange(event){
      let user_data = {
        account_sid : this.state.account_sid,
        auth_token : this.state.auth_token,
        phone_number : event.target.id,
        action : event.target.checked,
      }
      console.log(user_data);
      var self = this;
      this.props.webrtcOverRideRequest(user_data).then(function(response){
        console.log(response);
        var  error = {};
        var  success = {};
        if(response.data.Message360.ResponseStatus === 0){
            response.data.Message360.Errors.Error.forEach(function(value,key) {
                if(value.Code==='ER-M360-NUM-106'){
                    error = {
                      status: true,
                      message: value.Message
                    }
                }

                if(value.Code==='ER-M360-GEN-157' || value.Code==='ER-M360-GEN-113'){
                   error = {
                      status: true,
                      message: value.Message
                    }
                }else{
                  error = {
                      status: true,
                      message: value.Message
                  }
                }
                success = {
                  status: false,
                  message: ''
                }
                self.setState({ errors : error, success : success });

                 setTimeout(function(){self.setState({errors: '', success : ''});  }, 10000);
            });
        }else{
          success = {
            status: true,
            message: response.data.Message360.Message
          }
          error = {
            status: false,
            message: ''
          }

          self.setState({ errors : error, success : success });
          setTimeout(function(){self.setState({errors: '', success : ''});  }, 10000);
        }
      }).catch(function (error) {
            console.log(error);
      });

    }

    
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }

    componentDidMount(){
        this.loadCallLogs();
    }

    loadCallLogs(){
      this.setState({loading : true});
      var self = this;
      this.props.viewNumbers(self.state).then(function(response){
            console.log('into data');
            console.log(response);
            console.log(response.data.Message360.ResponseStatus);
            self.setState({number_log: response.data.Message360.Phones.Phone});
            self.setState({loading : false});
        }).catch(function (error) {
              this.setState({loading : false});
        });
    }
priceFormatter(cell, row) { 


  // JSX example
  if(cell === 1){
  return ( 
        <Toggle
        defaultChecked={true}
        value={row.AccountSid}
        id={row.PhoneNumber}
        icons={false}
        onChange={this.handleBaconChange} />
    );
}else{
  return ( 
        <Toggle
        defaultChecked={false}
        value={row.AccountSid}
        id={row.PhoneNumber}
        icons={false}
        onChange={this.handleBaconChange} />
    );
}
}

  render(){
      const loader = <span> <img src="theme/assets/global/img/ajax-loading.gif" alt="Loading" /> <br /> Loading... </span>
      const options = {searchField: this.createCustomSearchField,defaultSortName: 'CreatedDate',defaultSortOrder: 'desc' };
        return(
            <Home>
                <BreadCrump />
                <PageTitle title="VIEW NUMBERS" titleDescription="Active Phone Numbers" />
                { this.state.success.status && 
                <div className="custom-alerts alert alert-success fade in">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>{this.state.success.message}
                </div>
              }
              { this.state.errors.status && 
                <div className="custom-alerts alert alert-danger fade in">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>{this.state.errors.message}
                </div>
              }

              
              <div className="portlet light bordered">
                <div className="portlet-body">              
                    <div className="form-group">                
                      <div>
                        <Loader show={this.state.loading} message={loader} messageStyle={{ fontSize:'1.5em', color:'white' }}>
                        <BootstrapTable
                          data={ this.state.number_log }
                          pagination options={options} search>
                          <TableHeaderColumn dataField='Username' isKey dataSort>Username</TableHeaderColumn>
                          <TableHeaderColumn dataField='PhoneNumber' dataSort>Phone Number</TableHeaderColumn>
                          <TableHeaderColumn dataField='CountryCode' dataSort>CountryCode</TableHeaderColumn>
                           <TableHeaderColumn dataField='WebrtcOverride' dataFormat={ this.priceFormatter }>WebrtcOverride</TableHeaderColumn>                  
                          <TableHeaderColumn dataField='CreatedDate' dataSort >Start Date/Time</TableHeaderColumn>
                                                    
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
    return bindActionCreators({viewNumbers, webrtcOverRideRequest}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(ViewNumbers);

