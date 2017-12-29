import React, { Component } from 'react';
import { BreadCrump, PageTitle } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';
import { bindActionCreators } from 'redux';
import { callLogsRequest } from '../actions/callLogsAction';
import { getUsersInfo } from '../actions/userListActions';
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'react-loader-advanced';

class Dashboard extends Component {


    constructor(props){
        super(props);
        console.log('dahsbortc cons');
        console.log(props);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var accountsid = props.user.user.AccountSid ? props.user.user.AccountSid : '';
        this.state = {
          users: [],
          name:'',
          account_sid : accountsid,
          call_logs:[],
          start_date:date,
          end_date:'',
          date : '2017-04-24',
          company_name:'',
          balance:'',
          total_users:'',
          webrtc_domain:'test',
          call_logs_error : {status:false , message:""},
          loading:false,
        };
        this.onChange = this.onChange.bind(this);       
        this.onSeach = this.onSeach.bind(this);
        this.loadCallLogs = this.loadCallLogs.bind(this);
    }

    createCustomSearchField = (props) => {
      return (
        <SearchField
            className='my-custom-class'
            defaultValue=''
            placeholder=''/>
      );
    }

    onSeach(e){
      e.preventDefault();
      this.loadCallLogs();
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
      this.props.callLogsRequest(this.state).then(function(response){
            console.log(response.data.Message360.ResponseStatus);
            if(response.data.Message360.ResponseStatus === 0){
              response.data.Message360.Errors.Error.forEach(function(value,key) {
                  if(value.Code==='ER-M360-CAL-101'){
                      self.setState({call_logs: [],loading : false,call_logs_error: {status:false , message:""}});
                  }else{
                      self.setState({call_logs: [],loading : false, call_logs_error: {status:true , message:"No calls found."}});
                  }
              });
            }else{
              self.setState({call_logs: response.data.Message360.Calls.Call, loading : false});
            }
            

        }).catch(function (error) {
            self.setState({call_logs: [],loading : false, call_logs_error: {status:true , message:"Something went wrong."}});
            console.log('into error');
        });

        this.props.getUsersInfo(self.state).then(function(response){
          
            if(response.data.Message360.ResponseStatus === 1){
                self.setState({company_name: response.data.Message360.AccountInfo.CompanyName});
                self.setState({balance: response.data.Message360.AccountInfo.TotalFund});
                self.setState({total_users: response.data.Message360.AccountInfo.WebrtcUsersCount});
                self.setState({webrtc_domain: response.data.Message360.AccountInfo.WebrtcDomain});

            }
        });
    }


    render(){
      const options = {searchField: this.createCustomSearchField,defaultSortName: 'StartTime',defaultSortOrder: 'desc' };
      const loader = <span><img src="theme/assets/global/img/ajax-loading.gif" alt="Loader" /> <br /> </span>
        return(
            <Home>
              <BreadCrump />
              <PageTitle title="DASHBOARD" titleDescription="" />
              { this.state.call_logs_error.status && 
                <div className="custom-alerts alert alert-danger fade in">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>{this.state.call_logs_error.message}
                </div>
              }
               <div className="row">
                <div className="col-md-9">   
                <div className="portlet light bordered">
                        <div className="portlet-title">
                            <div className="caption">
                                <i className="fa fa-gift"></i>Calls Made Today 
                            </div>
                        </div>

                        <div className="portlet-body">  

                            <div className="form-group">                
                                  <Loader show={this.state.loading} message={loader} messageStyle={{ fontSize:'1.5em', color:'white' }}>
                                    <BootstrapTable
                                      data={ this.state.call_logs }
                                      pagination options={options} search>
                                      <TableHeaderColumn dataField='From' isKey dataSort>Caller Number</TableHeaderColumn>
                                      <TableHeaderColumn dataField='To' dataSort>Called Number</TableHeaderColumn>
                                      <TableHeaderColumn dataField='StartTime' dataSort>Start Date/Time</TableHeaderColumn>
                                      <TableHeaderColumn dataField='Direction' dataSort>Direction</TableHeaderColumn>
                                      <TableHeaderColumn dataField='DurationBilled' dataSort>Duration Billed</TableHeaderColumn>
                                      <TableHeaderColumn dataField='Amount' dataSort>Cost</TableHeaderColumn>
                                      <TableHeaderColumn dataField='Status' dataSort>Status</TableHeaderColumn>
                                    </BootstrapTable>
                                  </Loader>
                            </div>
                        </div>
                  </div>
                </div>

                <div className="col-md-3">
                    <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-gift"></i>ACCOUNT INFORMATION
                                </div>
                            </div>
                             <div className="portlet-body">
                                <div className="note note-info">
                                    <h4>Company :</h4>
                                         <div> {this.state.company_name} </div>           
                                </div>
                                <hr/>

                                 <div className="note note-info">
                                    <h4>Balance :</h4> 
                                     <div> ${ this.state.balance} </div>
                                </div>
                                <hr/>

                                <div className="note note-info">
                                    <h4>Total users :</h4>
                                    <div>  {this.state.total_users} </div>
                                </div>
                                <hr/>
                                 <div className="note note-info">
                                    <h4>Webrtc Domain :</h4>
                                    <div>   {this.state.webrtc_domain} </div>
                                </div>
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
    return bindActionCreators({callLogsRequest,getUsersInfo}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Dashboard);
