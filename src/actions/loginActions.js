import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function loginRequest(userData){
	return dispatch=>{
		//return axios.post(config.LOGIN, userData);
        return axios({
            method: 'post',
              url: config.LOGIN,
              data: userData,
              headers: {"Content-Type": "Access-Control-Allow-Headers"},
        })
	}
}


export function setAuth(userState){
	return {
        type: "SET_AUTH",
        payload: userState
    };
}

export function persistAuth(userState){
	return {
        type: "PERSIST_AUTH",
        payload: userState
    };
}

export function logout(userState){
	return {
        type: "LOGOUT",
        payload: userState
    };
}

export function regenrateTokenRequest(userData){
    return dispatch=>{
        return axios.post(config.REGENERATE_TOKEN, userData);
    }
}