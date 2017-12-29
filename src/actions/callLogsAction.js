import axios from 'axios';
import config from '../Configuration/UrlConfiguration';

export function callLogsRequest(userData){
	return dispatch=>{
		return axios.post(config.CALL_LOGS, userData);
	}
}


