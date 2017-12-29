import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function userList(userData){
	console.log(config);
	return dispatch=>{		
		return axios.post(config.USER_LIST,userData);
	}
}

export function getUsersInfo(userData){
	console.log(config);
	return dispatch=>{
		return axios.post(config.GET_USER_INFO, userData);
	}
}
export function getUserDeatils(userData){
	return dispatch=>{

		return axios.post(config.GET_USER_DETAILS, userData);
	}
}
