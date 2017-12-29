import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import UserReducer from './reducer-users';
import numberReducer from './reducer-number';
import addUserRequest from './reducer-adduser';

const allReducers = combineReducers({
	user : UserReducer,
	session : sessionReducer,
	numberReducer,
	addUserRequest
});

export default allReducers;