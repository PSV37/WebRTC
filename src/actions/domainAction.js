import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function updateDomainRequest(userData){
	return dispatch=>{
		return axios.post(config.UPDATE_DOMAIN, userData);
	}
}

export function updateDomain(userState){
	return {
        type: "UPDATE_DOMAIN",
        payload: userState
    };
}
