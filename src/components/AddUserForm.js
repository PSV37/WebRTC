import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { numberListRequest, setNumberList } from '../actions/numberActions';
import { addUserRequest } from '../actions/addUserAction';
import Button from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom'

class AddUserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone_numbers : [],
            phone_dropdown_default : "Loading....",
            firstname : '',
            lastname : '',
            username : '',
            password : '',
            password_confirmation : '',
            phonenumber : '',
            account_sid : props.user.user.AccountSid,
            errors : {
                firstname : '',
                lastname : '',
                username : '',
                password : '',
                password_confirmation : '',
                phonenumber : '',
            },
            loading : false,
        };
         this.onChange = this.onChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        console.log('into will count add user');
        var self = this;
        var data = {'account_sid':this.props.user.user.AccountSid};
        console.log('checking data 1');
        console.log(self.state);
        self.setState({ phone_dropdown_default : "Loading...." });
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
        console.log('checking data');
        console.log(self.state);
       
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading: true}); 
        var error = {};
        var error_flag = false;
        var self = this;
        // if(this.state.firstname === ""){
        //     error['firstname'] =  "Please enter first name.";
        //     error_flag  = true;
        // }
        // if(this.state.lastname === ""){
        //     error['lastname'] =  "Please enter last name.";
        //     error_flag  = true;
        // }
        // if(this.state.phonenumber === ""){
        //     error['phonenumber'] =  "Please select phone number.";
        //     error_flag  = true;
        // }
        // if(this.state.username === ""){
        //     error['username'] =  "Please enter username.";
        //     error_flag  = true;
        // }
        // if(this.state.password === ""){
        //     error['password'] =  "Please enter password.";
        //     error_flag  = true;
        // }
        // if(this.state.password_confirmation === ""){
        //     error['password_confirmation'] =  "Please enter confirm password.";
        //     error_flag  = true;
        // }
        if(error_flag===true){
            this.setState({ errors : error });
            self.setState({loading: false});
        }else{
            this.props.addUserRequest(this.state).then(function(response){
                console.log(response);
                if(response.data.Message360.ResponseStatus === 0){
                     response.data.Message360.Errors.Error.forEach(function(value,key) {
                        if(value.Code==='ER-M360-GEN-147' || value.Code==='ER-M360-GEN-148'){
                            error['firstname'] =  value.Message;
                        }

                        if(value.Code==='ER-M360-GEN-149' || value.Code==='ER-M360-GEN-150'){
                            error['lastname'] =  value.Message;
                            
                        }
                        if(value.Code==='ER-M360-GEN-151' || value.Code==='ER-M360-GEN-152'|| value.Code === 'ER-M360-WRT-120' ||  value.Code === 'ER-M360-WRT-117'){
                            error['username'] =  value.Message;
                        }

                        if(value.Code==='ER-M360-GEN-157' || value.Code==='ER-M360-GEN-158'){
                            error['password'] =  value.Message;
                            
                        }
                        if(value.Code==='ER-M360-GEN-159' || value.Code==='ER-M360-GEN-160'){
                            error['password_confirmation'] =  value.Message;
                        }

                        if(value.Code==='ER-M360-NUM-106' || value.Code==='ER-M360-NUM-154'){
                            error['phonenumber'] =  value.Message;
                            
                        }
                        self.setState({ errors : error });
                    });
                 }else{
                     self.context.router.history.push('/viewuser');
                 }
                 self.setState({loading: false});
                
            }).catch(function (error) {
                console.log(error);
                self.setState({loading: false});
            });
        }
        
    }
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
	render(){

		return(
            <div className="portlet light bordered">
                <div className="portlet-body">
                    <form>
                        <div className="form-group">
                            <label>First Name :</label>
                            <input type="text" name="firstname" id="firstname" className="form-control" value={this.state.firstname} placeholder="First Name"  maxLength={20} onChange={this.onChange} />
                            <span className="font-red-thunderbird">{this.state.errors.firstname}</span>
                        </div>
                        <div className="form-group">
                            <label >Last Name :</label>
                            <input type="text" name="lastname" id="lastname" className="form-control" value={this.state.lastname} placeholder="Last Name" maxLength={20}  onChange={this.onChange}/>
                            <span className="font-red-thunderbird">{this.state.errors.lastname}</span>
                        </div>
                        <div className="form-group">
                            <label >Phone Number Select from one of your available Message360 numbers :</label>
                            <select className="form-control" name="phonenumber" data-placeholder="Choose a Category" value={this.state.phonenumber} onChange={this.onChange}>
                            <option value="" key="">Select Number</option>
                            {
                                (this.state.phone_numbers && this.state.phone_numbers.length) ?
                                     this.state.phone_numbers.map((item)=><option key={item.phone_number.toString()} value={item.phone_number} >{item.phone_number}</option>) 
                                      :<option key="Loading" value="..." >{this.state.phone_dropdown_default}</option>
                            }
                            </select>
                            <span className="font-red-thunderbird">{this.state.errors.phonenumber}</span>
                        </div>
                        <div className="form-group">
                            <label >Username :</label>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-user"></i>
                                </span>
                                <input type="text" name="username" id="username" className="form-control" value={this.state.username} placeholder="Username"  maxLength={100}  onChange={this.onChange}/>
                            </div>                            
                            <span className="font-red-thunderbird">{this.state.errors.username}</span>
                        </div>
                        <div className="form-group">
                            <label >Password :</label>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-key"></i>
                                </span>
                                <input type="password" name="password" id="password" className="form-control" value={this.state.password}  maxLength={20}  onChange={this.onChange}/>
                            </div>   
                            <span className="font-red-thunderbird">{this.state.errors.password}</span>
                        </div>
                        <div className="form-group">
                            <label >Confirm Password :</label>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-check"></i>
                                </span>
                                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control"  maxLength={20}  value={this.state.password_confirmation} onChange={this.onChange}/>
                            </div>
                            <span className="font-red-thunderbird">{this.state.errors.password_confirmation}</span>   
                        </div>
                        <Button type="submit" name="create_webrtc_user" className="btn btn-primary all-margin" onClick={this.handleSubmit} loading={this.state.loading}>Create and Save </Button>
                        <Link to="/" className="btn btn-primary-secondary">Back</Link>
                    </form>
                </div>
            </div>
		)
	}
}



function mapStateToProps(state){
    return {
        user: state.user,
        globalState : state,
        phone_numbers : state.numberReducer.phone_numbers
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({numberListRequest,setNumberList, addUserRequest}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddUserForm);

AddUserForm.contextTypes = {
    router : PropTypes.object.isRequired
}