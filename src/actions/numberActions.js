import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function numberListRequest(userData){
	return dispatch=>{
		return axios.post(config.NUMBER_LIST, userData);
	}
}


export function setNumberList(numberList){
	return {
        type: "PHONE_NUMBER_LIST",
        payload: numberList
    };
}