import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function addUserRequest(userData){
	return dispatch=>{
		return axios.post(config.ADD_USER, userData);
	}
}
