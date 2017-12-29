  import React, { Component } from 'react';
import { BreadCrump, PageTitle } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';
import { bindActionCreators } from 'redux';
import { callLogsRequest } from '../actions/callLogsAction';
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'react-loader-advanced';
import CsvCreator from 'react-csv-creator';
import Popover from 'react-simple-popover';

class ViewCallLogs extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          users: [],
          name:'',
          account_sid : props.user.user.AccountSid,
          call_logs:[],
          start_date:'',
          end_date:'',
          date : '2017-04-24',
          call_logs_error : {status:false , message:"No calls found"},
          loading:false,
          input_start_date:{
            'className' : 'form-control',
            'placeholder' : 'Start Date'
          },
          input_end_date:{
            'className' : 'form-control',
            'placeholder' : 'End Date'
          },
          headers:[{
            id: 'AccountSid',
            display: 'Account SID'
          },{
            id: 'CallSid',
            display: 'Call SID'
          },{
            id: 'From',
            display: 'From'
          },{
            id: 'To',
            display: 'To'
          },{
            id: 'StartTime',
            display: 'Start Time'
          },{
            id: 'EndTime',
            display: 'End Time'
          },  {
            id: 'Direction',
            display: 'Direction'
          }, {
            id: 'Status',
            display: 'Status'
          },{
            id: 'DurationBilled',
            display: 'Billed Duration'
          }, {
            id: 'Amount',
            display: 'Cost'
          },],
          rows:[],
        };
        this.onChange = this.onChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSeach = this.onSeach.bind(this);
        this.onClear = this.onClear.bind(this);
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
      if(moment(this.state.start_date).isSameOrAfter(this.state.end_date)){
        this.setState({loading : false, call_logs_error: {status:true , message:"Please select start date less than end date."}});
        setTimeout(function(){this.setState({call_logs_error: ''});  }, 10000);
      }else{
      this.loadCallLogs();
      }
    }

    onClear(e){
      var self = this;
      e.preventDefault();
      this.setState({loading : true});
      this.setState({
        start_date: ''
      });
      this.setState({
        end_date: ''
      });
      setTimeout(function(){
        self.loadCallLogs();
      }, 3000);
      
    }

    onStartDateChange(date){
      this.setState({
        start_date: moment(date).format('YYYY-MM-DD')
      });
    }
    onEndDateChange(date){
      this.setState({
        end_date: moment(date).format('YYYY-MM-DD')
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
      
        this.props.callLogsRequest(self.state).then(function(response){
            if(response.data.Message360.ResponseStatus === 0){
              response.data.Message360.Errors.Error.forEach(function(value,key) {
                  if(value.Code==='ER-M360-CAL-101'){
                      self.setState({call_logs: [],loading : false,rows:[],call_logs_error: {status:true , message:"No calls found."}});
                      setTimeout(function(){self.setState({call_logs_error: ''});  }, 10000);
                  }else{
                      self.setState({call_logs: [],loading : false,rows:[], call_logs_error: {status:true , message:"No calls found."}});

                      setTimeout(function(){self.setState({call_logs_error: ''});  }, 10000);
                  }
              });
            }else{
              self.setState({call_logs: response.data.Message360.Calls.Call, loading : false, rows:response.data.Message360.Calls.Call});

            }
            

        }).catch(function (error) {
            self.setState({call_logs: [],loading : false, call_logs_error: {status:true , message:"Something went wrong."}});
            setTimeout(function(){self.setState({call_logs_error: ''});  }, 10000);
        });
      
    }


    render(){
      const options = {searchField: this.createCustomSearchField,defaultSortName: 'StartTime',defaultSortOrder: 'desc' };
      const loader = <span> <img src="theme/assets/global/img/ajax-loading.gif" alt="Loading" /> <br /> Loading... </span>
        return(
            <Home>
              <BreadCrump />
              <PageTitle title="VIEW CALL LOGS" titleDescription="" />
              { this.state.call_logs_error.status && 
                <div className="custom-alerts alert alert-danger fade in">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>{this.state.call_logs_error.message}
                </div>
              }
               
              <div className="portlet light bordered">
                 <div className="portlet-body">
                  <form className="form-inline">

                      <div className="form-group margin_right_10">
                          <label className="sr-only">Start Date</label>
                         <Datetime
                            defaultValue = {this.state.start_date}
                            viewMode = {'years', 'months', 'days'}
                            timeFormat = {false}
                            dateFormat="YYYY-MM-DD"
                            onChange={this.onStartDateChange}
                            value={this.state.start_date}
                            inputProps={this.state.input_start_date}
                         />
                      </div>
                      <div className="form-group margin_right_10">
                          <label className="sr-only">End Date</label>
                          <Datetime
                            defaultValue = {this.state.end_date}
                            viewMode = {'years', 'months', 'days'}
                            timeFormat = {false}
                            dateFormat="YYYY-MM-DD"
                            onChange={this.onEndDateChange}
                            value={this.state.end_date}
                            inputProps={this.state.input_end_date}
                         />                          
                      </div>
                      <div className="form-group margin_right_10">
                      <button type="submit" className="btn btn-primary" onClick={this.onSeach}>Search</button>
                      </div>
                      <div className="form-group margin_right_10">
                      <button type="submit" className="btn btn-primary-secondary" onClick={this.onClear}>Clear</button>
                      </div>
                      <div className="form-group margin_right_10">
                      <CsvCreator
                        filename='call_logs'
                        headers={this.state.headers}
                        rows={this.state.rows}
                      >
                        <button type="button" className='btn btn-primary'>Download CSV</button>
                      </CsvCreator>
                      </div>
                  </form>
                  <hr />
                  <div className="form-group">                
                      <Loader show={this.state.loading} message={loader} messageStyle={{ fontSize:'1.5em', color:'white' }}>
                        <BootstrapTable
                          data={ this.state.call_logs }
                          pagination options={options} search>
                          <TableHeaderColumn dataField='CallSid' isKey dataSort tdStyle={ { whiteSpace: 'normal' } } width="19%">Call SID</TableHeaderColumn>
                          <TableHeaderColumn dataField='From'  dataSort>Caller Number</TableHeaderColumn>
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
    return bindActionCreators({callLogsRequest}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(ViewCallLogs);
