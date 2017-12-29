import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function userPhoneList(userData){
	return dispatch=>{		
		return axios.post(config.NUMBER_LIST, userData);
	}
}


export function userPhoneUpdate(userData){
	return dispatch=>{		
			return axios.post(config.UPDATE_PHONE_NUMBER, userData);
	}
}

export function userUpdatePassword(userData){
	return dispatch=>{		
		return axios.post(config.UPDATE_PASSWORD, userData);
	}
}

export function suspendUserStatus(userData){
	return dispatch=>{		
		return axios.post(config.SUSPEND_USER, userData);
	}
}

export function activateUserStatus(userData){
	return dispatch=>{		
		
		return axios.post(config.ACTIVATE_USER, userData);
	}
}


export function deleteUser(userData){
	return dispatch=>{		
		
		return axios.post(config.DELETE_USER, userData);
	}
}
export function updateUsersInfo(userData){
	return dispatch=>{		
		
		return axios.post(config.UPDATE_USERSINFO, userData);
	}
}


