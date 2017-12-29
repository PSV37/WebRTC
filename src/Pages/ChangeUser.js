import React, { Component } from 'react'
import { BreadCrump, PageTitle } from '../components'
import { connect } from 'react-redux';
import { Home } from '../Pages';
import { bindActionCreators } from 'redux';
import { userPhoneList,userPhoneUpdate,userUpdatePassword,suspendUserStatus,activateUserStatus,deleteUser,updateUsersInfo} from '../actions/userUpdate';
import { numberListRequest, setNumberList } from '../actions/numberActions';
import PropTypes from 'prop-types';
import { getUserDeatils } from '../actions/userListActions';
import Button from 'react-bootstrap-button-loader';
import  { confirmAlert } from 'react-confirm-alert'; // Import 
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css 
import { Link } from 'react-router-dom'


class ChangeUser extends Component {


constructor(props) {
        super(props);
        this.state = {
        users: [],
        phone_number:props.user.user.Phone,        
        username:props.match.params.username,
        phone_dropdown_default : "Loading....",
        firstname:'', 
        lastname:'',
        password : '',
        confirmpassword : '',
        msg:'',
        msgerror:'',
        pwdmsg:'',
        pwdmsgerror:'',
        isSuspend : '',
        phone_numbers : [],
        successmsgsuspend:'',
        successmsgactivate:'',
        successmsgdeleteuser:'',
        delete_loading : false,
        update_password_loading : false,
        suspend_loading : false,
        activate_loading : false,
        update_userinfo_loading:false,
        error_firstname:'',
        error_lastname:'',
        update_user_error:'',
        successupdateuser:'',
        errors : {               
                password : '',
                password_confirmation : '',
                error:'',
                updatephoneerror:'',
                errorpasw:'',
             
            },
           
        account_sid : props.user.user.AccountSid
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.suspendUser = this.suspendUser.bind(this);
        this.actviateUser = this.actviateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount(){
        var self = this;
        var data = {'account_sid':this.props.user.user.AccountSid};
        self.setState({ phone_dropdown_default : "Loading..." });
        this.props.numberListRequest(data).then(function(response){
             if(response.data.Message360.ResponseStatus === 0){
                 console.log(response.data);
             }else{
                 if(response.data.Message360.Numbers.Number){
                    console.log('into it');
                    self.props.setNumberList(response.data.Message360.Numbers.Number);
                    self.setState({ phone_numbers : response.data.Message360.Numbers.Number });
                }else{
                    self.setState({ phone_dropdown_default : "No Number present." });
                }
             }
        }).catch(function (error) {
            console.log(error);
        });

         this.props.getUserDeatils(self.state).then(function(response){          
            if(response.data.Message360.ResponseStatus === 1){
                self.setState({firstname: response.data.Message360.Result.first_name}); 
                self.setState({lastname: response.data.Message360.Result.last_name}); 
                if(response.data.Message360.Result.is_active ===0){
                     self.setState({ isSuspend : true });
                }else{
                     self.setState({ isSuspend : false});
                }
            
            }
            console.log("suspend status : "+self.state.isSuspend);
        });



    }

handleSubmit(e) {
    e.preventDefault();
    var self = this;
    self.props.userPhoneUpdate(self.state).then(function(response){
var error = {}; 
    
    console.log(response);
    console.log(response.data.Message360.ResponseStatus);
    if(response.data.Message360.ResponseStatus === 1){
        self.setState({msg: 'Phone number updated successfully'});  
        setTimeout(function(){self.setState({msg: ''});  }, 10000);

    }else{
       // self.setState({msgerror: 'Phone number not updated'});  
       // setTimeout(function(){self.setState({msgerror: ''});  }, 10000);

        response.data.Message360.Errors.Error.forEach(function(value,key) {
                        if(value.Code==='ER-M360-WRT-126' || value.Code === 'ER-M360-WRT-137' || value.Code === 'ER-M360-NUM-154'){
                            error['updatephoneerror'] =  value.Message;
                        }
                        self.setState({ errors : error });

                        setTimeout(function(){self.setState({errors: ''});  }, 10000);
                    });



    }
    }).catch(function (error) {
    console.log('into error');
   
    });
}

updatePassword(e){
   
    var error = {}; 
    this.setState({update_password_loading: true}); 
     var self=this;
        this.props.userUpdatePassword(self.state).then(function(response){
           
             if(response.data.Message360.ResponseStatus === 1){
                self.setState({update_password_loading: false}); 
                self.setState({pwdmsg: response.data.Message360.Result.Message});  
                setTimeout(function(){self.setState({msg: ''});  }, 10000);

            }else{
                if(response.data.Message360.ResponseStatus === 0){
                     response.data.Message360.Errors.Error.forEach(function(value,key) {
                        if(value.Code==='ER-M360-GEN-159' || value.Code==='ER-M360-GEN-160'){
                            error['confirmpassword'] =  value.Message;
                        }

                        if(value.Code==='ER-M360-GEN-157' || value.Code==='ER-M360-GEN-158'){
                            error['password'] =  value.Message;
                            
                        }
                         if(value.Code==='ER-M360-WRT-126'){
                            error['errorpasw'] =  value.Message;
                            
                        }
                        
                        self.setState({ errors : error });

                        setTimeout(function(){self.setState({errors: ''});  }, 10000);

                    });
                 }
            self.setState({update_password_loading: false}); 

            }

        }).catch(function (error) {
        console.log('into error');
        
        });
        setTimeout(function(){self.setState({errors: ''});  }, 10000);
}

suspendUser(e){
      this.setState({suspend_loading: true}); 
        var self =this;
        let user_data = {
            'account_sid' : self.state.account_sid,
            'username' : self.state.username, 
        }

         confirmAlert({
              title: '',                         
              message: 'Are you sure to suspend this user?',                   
              confirmLabel: 'Ok',                           
              cancelLabel: 'Cancel',                              
              onConfirm: () => {
                        console.log(user_data);
                    console.log("seema into suspend");
                        self.props.suspendUserStatus(self.state).then(function(response){

                         if(response.data.Message360.ResponseStatus === 1){
                            
                               
                                    self.setState({ successmsgsuspend : "User suspended successfully" });
                                    self.setState({isSuspend: true});
                                 setTimeout(function(){self.setState({successmsgsuspend: ''});  }, 10000);
                             
                        }
                        self.setState({suspend_loading: false}); 

                    })
              },    // Action after Confirm 
              onCancel: () => {
                    self.setState({suspend_loading: false});
              },      // Action after Cancel 
            }) ;

        
}

actviateUser(e){    
    this.setState({activate_loading: true}); 
    var self =this; var error = {}; 
            self.props.activateUserStatus(self.state).then(function(response){

             if(response.data.Message360.ResponseStatus === 1){    
                console.log("into seema 111");
              
                self.state.successmsgactivate =  "User actviated successfully";
                self.setState({ successmsgactivate : "User actviated successfully" });

                self.setState({isSuspend: false});  
                self.state.isSuspend = false;

               setTimeout(function(){self.setState({successmsgactivate: ''});  }, 10000);
                 
             
            }else{
                response.data.Message360.Errors.Error.forEach(function(value,key) {
                        if(value.Code==='ER-M360-WRT-134'){
                            error['error'] =  value.Message;
                        }
                        
                        self.setState({ errors : error });
                         setTimeout(function(){self.setState({errors: ''});  }, 10000);
                    });
            }
            self.setState({activate_loading: false});

        })
}

updateUser(e){
 var self=this;
 var error = {}; 
 this.setState({update_userinfo_loading: true}); 
        this.props.updateUsersInfo(self.state).then(function(response){
            
            if(response.data.Message360.ResponseStatus === 1){
                self.setState({update_userinfo_loading: false}); 
                self.setState({successupdateuser: response.data.Message360.Result.Message});  
                setTimeout(function(){self.setState({successupdateuser: ''});  }, 10000);

            }else{
                if(response.data.Message360.ResponseStatus === 0){
                     response.data.Message360.Errors.Error.forEach(function(value,key) {
                        if(value.Code==='ER-M360-GEN-147' || value.Code==='ER-M360-GEN-148' || value.Code==='ER-M360-GEN-182'){
                            error['error_firstname'] =  value.Message;
                        }

                        if(value.Code==='ER-M360-GEN-150' || value.Code==='ER-M360-GEN-183' || value.Code==='ER-M360-GEN-149'){
                            error['error_lastname'] =  value.Message;
                            
                        }

                        if(value.Code==='ER-M360-WRT-126'){
                            error['update_user_error'] =  value.Message;
                            
                        }

                        self.setState({ errors : error });

                        setTimeout(function(){self.setState({errors: ''});  }, 10000);

                    });
                 }
            self.setState({update_userinfo_loading: false}); 

            }

        }).catch(function (error) {
        console.log('into error');
        
        });
       setTimeout(function(){self.setState({errors: ''});  }, 10000);
}

deleteUser(e){
    this.setState({delete_loading: true});
    var self =this;
    confirmAlert({
      title: '',                         
      message: 'Are you sure to delete this user?',                   
      confirmLabel: 'Ok',                           
      cancelLabel: 'Cancel',                              
      onConfirm: () => {
                 self.props.deleteUser(self.state).then(function(response){
                 self.setState({delete_loading: false});    
                 self.context.router.history.push('/viewuser');
             });
      },    // Action after Confirm 
      onCancel: () => {
            self.setState({delete_loading: false});
      },      // Action after Cancel 
    }) ;
      
    
}


onChange(e){
      this.setState({ [e.target.name]: e.target.value });
}

render(){

return(
<Home>
    <BreadCrump />
    <PageTitle title="CHANGE USER" titleDescription="ChangeUser for reports" />

    <div className="portlet light bordered">
        <div className="portlet-body form">
            <div className="form-body">
                <div className="form-group">
                    <div className="row">
                                               
                            
                             <div className="form-group">
                                <p className="text-primary"><small>Continue reading below for more information on what data can be changed for a user.</small></p>
                                <p className="text-danger"><small> A users username cannot be changed because of tracking and management issues. If you need to make a change to any of the fields below, you can suspend/delete the old account and create a new WebRTC user with the correct information.</small></p>
                           
                                {this.state.successupdateuser? 
                                <div>
                                    <div className="alert alert-success">
                                        <button className="close" data-close="alert"></button> {this.state.successupdateuser}
                                 </div>
                                </div>: ''}
                            </div> 
                            <div className="form-group">
                                {this.state.errors.update_user_error ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.errors.update_user_error}
                                 </div>
                                </div>: ''}
                            </div> 
                            <div className="col-md-3"> 

                             <div className="form-group">
                                <label>First Name :</label>
                                <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname}  maxLength={20} onChange={this.onChange} />
                                 <span className="font-red-thunderbird">{this.state.errors.error_firstname}</span>
                            </div>
                            </div>

                        <div className="col-md-3"> 
                        <div className="form-group">
                            <label >Last Name :</label>
                           <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname}  maxLength={20} onChange={this.onChange} />
                            <span className="font-red-thunderbird">{this.state.errors.error_lastname}</span>
                        </div> </div>

                             <div className="col-md-3">  
                            <div className="form-group"><label>Username:</label> <input disabled="disabled" className="form-control" value={this.state.username}/></div>
                            </div>
                    </div>

                          <Button type="button"  className="btn btn-primary margin_right_10" onClick={
                                    this.updateUser}  loading={this.state.update_userinfo_loading} key='handle_submit'>Update User Info</Button>
                          <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>

                </div>
            </div>
        </div>
    </div>



    <div className="portlet light bordered">
        <div className="portlet-title">
            <div className="caption">
                <i className="fa fa-gift"></i>Update Users Phone Number </div>                                
        </div>

        <div className="portlet-body form">
            <div className="form-body">
                <div className="form-group">

                    <div className="row">
                        <div className="col-md-12">

                        <div>
                            <div className="form-group">
                                {this.state.msg ? 
                                <div>
                                    <div className="alert alert-success">
                                        <button className="close" data-close="alert"></button> {this.state.msg}
                                 </div>
                                </div>: ''}
                            </div> 

                            <div className="form-group">
                                {this.state.msgerror ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.msgerror}
                                 </div>
                                </div>: ''}
                            </div> 

                        </div>

                             <div className="form-group">
                                {this.state.errors.updatephoneerror ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.errors.updatephoneerror}
                                 </div>
                                </div>: ''}
                            </div> 


                            <div className="form-group">
                            <label>Phone Number:</label>
                             </div>
                            <div className="form-group"> 
                                <select className="form-control" disabled={this.state.isSuspend} data-placeholder="Choose a Category" name='phone_number' value={this.state.phone_number} onChange={this.onChange}>
                                 <option value="">Select Number</option>
                                            {
                               (this.state.phone_numbers && this.state.phone_numbers.length) ?
                                     this.state.phone_numbers.map((item)=><option key={item.phone_number.toString()} value={item.phone_number} >{item.phone_number}</option>) 
                                      :<option key="Loading" value="..." > {this.state.phone_dropdown_default}</option>
                            }
                                </select>

                                </div>
                                <Button type="button"  className="btn btn-primary margin_right_10" onClick={
                                    this.handleSubmit} key='handle_submit'>Update Number</Button>
                                <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="portlet light bordered">
        <div className="portlet-title">
            <div className="caption">
                <i className="fa fa-gift"></i>Update Password </div>                                
        </div>
        <div className="portlet-body form">
            <div className="form-body">
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                         <div>
                            <div className="form-group">
                                {this.state.pwdmsg ? 
                                <div>
                                    <div className="alert alert-success">
                                        <button className="close" data-close="alert"></button> {this.state.pwdmsg}
                                 </div>
                                </div>: ''}
                            </div> 

                            <div className="form-group">
                                {this.state.pwdmsgerror ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.pwdmsgerror}
                                 </div>
                                </div>: ''}
                            </div> 

                             <div className="form-group">
                                {this.state.errors.errorpasw ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.errors.errorpasw}
                                 </div>
                                </div>: ''}
                            </div> 

                        </div>

                           
                            <label>Change Password:</label>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">New Password:</label>
                            <div className="input-icon">
                                <i className="fa fa-lock"></i>
                                <input className="form-control placeholder-no-fix" type="password" placeholder="Password" name="password" value={ this.state.password }  onChange={this.onChange}/> 
                                 <span className="font-red-thunderbird">{this.state.errors.password}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Confirm New Password: </label>
                            <div className="input-icon">
                                <i className="fa fa-lock"></i>
                                <input className="form-control placeholder-no-fix" type="password" placeholder="Confirm Password" name="confirmpassword" value={ this.state.confirmpassword } onChange={this.onChange}/> 
                                 <span className="font-red-thunderbird">{this.state.errors.confirmpassword}</span>
                            </div>
                        </div>
                            <Button type="button" className="btn btn-primary margin_right_10" onClick={
                                this.updatePassword} loading={this.state.update_password_loading} key='update_password'>Update Password</Button>
                             <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="portlet light bordered">
        <div className="portlet-title">
            <div className="caption">
                <i className="fa fa-gift"></i>Other Options
            </div>                                
        </div>
        <div className="portlet-body form">
            <div className="form-body">
                <div className="form-group">
                    <div className="row"> 
                             <div className="form-group">
                                {this.state.successmsgsuspend ? 
                                <div>
                                    <div className="alert alert-success">
                                        <button className="close" data-close="alert"></button> {this.state.successmsgsuspend}
                                 </div>
                                </div>: ''}
                             </div> 
                             <div className="form-group">
                                {this.state.successmsgactivate ? 
                                <div>
                                    <div className="alert alert-success">
                                        <button className="close" data-close="alert"></button> {this.state.successmsgactivate}
                                 </div>
                                </div>: ''}
                            </div> 

                     <div className="form-group">
                                {this.state.errors.error ? 
                                <div>
                                    <div className="alert alert-danger">
                                        <button className="close" data-close="alert"></button> {this.state.errors.error}
                                 </div>
                                </div>: ''}
                            </div> 


                        {this.state.isSuspend ? 
                            <div className="col-md-6">                           
                                <label>Activate User</label>
                                  <p className="text-danger"><small>Re-activating the user will reenable WebRTC capabilities. You can suspend the user again by using the "Suspend" option.</small></p>
                                <Button type="button" className="btn btn-primary margin_right_10" key='activate_user' onClick={
                                    this.actviateUser}  name= "isSuspend" value="true" onChange={this.onChange} loading={this.state.activate_loading}>Activate User</Button>
                                 <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                            </div>

                            :
                               <div className="col-md-6">                           
                                <label>Suspend User</label>
                                  <p className="text-danger"><small>Suspending the user will revoke this accounts WebRTC capabilities. This change can be reverted by using the "Activate" option which will be shown after the account has been suspended.</small></p>
                                <Button type="button" className="btn ytelred margin_right_10" key='suspend_user' onClick={
                                    this.suspendUser} name= "isSuspend" value="false"   onChange={this.onChange} loading={this.state.suspend_loading}>Suspend User</Button>
                                 <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                                </div>

                         }


                        <div className="col-md-6">                           
                            <label>Delete User</label>
                              <p className="text-danger"><small>Deleting the user will erase all account information and data. As this change cannot be reverted, please utilize this option at your own discretion.</small></p>
                                <Button type="button" key='delete_user' className="btn ytelred margin_right_10" onClick={
                                this.deleteUser} loading={this.state.delete_loading}>Delete User</Button>

                                <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                        </div>
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
return bindActionCreators({updateUsersInfo,getUserDeatils,userPhoneList,userPhoneUpdate,userUpdatePassword,suspendUserStatus,activateUserStatus,deleteUser, numberListRequest,setNumberList}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ChangeUser);

ChangeUser.contextTypes = {
    router : PropTypes.object.isRequired
}
