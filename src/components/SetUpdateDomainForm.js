import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDomainRequest,updateDomain } from '../actions/domainAction';
import Button from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom'


class SetUpdateDomainForm extends Component {
    constructor(props){
        super(props);
          console.log("seema users info : "+props.user.user.WebrtcDomain);
        this.state = {
            current_domain : props.user.user.WebrtcDomain,
            new_domain : '',
            account_sid : props.user.user.AccountSid,
            auth_token : props.user.user.AuthToken,
            errors : {
                new_domain_error : ''
            },
            success:{
                status : false,
                message : ''
            },
            loading : false,
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    componentWillMount(){

    }

    handleUpdate(e){
        e.preventDefault();
        this.setState({loading: true}); 
        var self = this;
        var error = {};
        console.log(this.state);
        if(this.state.account_sid === ''){
            this.setState({ errors :{new_domain_error : 'Please enter webrtc domain.'} });
        }else{
            this.props.updateDomainRequest(this.state).then(function(response){
                console.log(response);
                if(response.data.Message360.ResponseStatus === 0){
                    response.data.Message360.Errors.Error.forEach(function(value,key) {
                    if(value.Code==='ER-M360-WRT-109'){
                        error['new_domain_error'] =  value.Message;
                    }

                    if(value.Code==='ER-M360-WRT-109' || value.Code === 'ER-M360-WRT-138' || value.Code === 'ER-M360-WRT-139'){
                        error['new_domain_error'] =  value.Message;
                        
                    }
                });
                self.setState({ errors : error });
                setTimeout(function(){self.setState({errors: ''});  }, 10000);
                    
                }else{
                   var current_domain = self.state.new_domain;
                   self.setState({ current_domain : self.state.new_domain });
                   self.setState({ new_domain : '' });
                   self.setState({ success : {status : true, message : 'Domain updated successfully.'} });
                   self.props.updateDomain(self.state);

                    setTimeout(function(){self.setState({success:''});  }, 10000);
                }
                self.setState({loading: false});
                
            }).catch(function (error) {
                console.log(error);
                self.setState({loading: false});
            });
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    
	render(){

		return(
            <div>
            { this.state.success.status && 
                <div className="custom-alerts alert alert-success fade in">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true"></button>{this.state.success.message}
                </div>
              }


            <div className="portlet light bordered">
                <div className="portlet-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="well">
                               <h4 className="font-blue-steel">Important Note </h4>
                               Before you can add WebRTC users, you have to set your WebRTC domain here.
                               The domain you set using this page is used by us to manage and track your users for you.
                               Once your WebRTC domain has been set, you can start adding WebRTC users to your account.
                               You can also change your WebRTC domain using the same field below as well. 
                            </div>
                        </div>
                        <div className="col-md-6"> 
                            <form>
                                <div className="form-group">
                                    <h4 className="font-blue-steel">Current Domain</h4>
                                    <p>{this.state.current_domain !== '' ? this.state.current_domain : 'Domain is not set yet.'}</p>
                                </div>
                                <div className="form-group">
                                    <h4 className="font-blue-steel">Set/Update Domain</h4>
                                    <input type="text" placeholder="Desire Domain" name="new_domain" className="form-control" value={this.state.new_domain} onChange={this.onChange} />
                                    <span className="font-red-thunderbird">{ this.state.errors.new_domain_error }</span>
                                </div>
                                <Button type="submit" className="btn btn-primary all-margin" onClick={this.handleUpdate} loading={this.state.loading} >Update Domain</Button>
                                <Link to="/viewuser" className="btn btn-primary-secondary">Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
		)
	}
}



function mapStateToProps(state){
    return {
        user: state.user,
        globalState : state,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateDomainRequest, updateDomain}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SetUpdateDomainForm);

SetUpdateDomainForm.contextTypes = {
    router : PropTypes.object.isRequired
}