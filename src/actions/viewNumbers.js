import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function viewNumbers(userData){
	return dispatch=>{
		return axios.post(config.GET_ACTIVATE_NUMBER,userData);
	}
}


export function webrtcOverRideRequest(userData){
	return dispatch=>{
		return axios.post(config.WEBRTC_OVERRIDE_NUMBER,userData);
	}
}

