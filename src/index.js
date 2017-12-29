import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './Reducers';
import { sessionService } from 'redux-react-session';



const store = createStore(allReducers,
		applyMiddleware(thunk)
	);
const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'COOKIES' };
sessionService.initSessionService(store, options);




ReactDOM.render(
	<Provider store={store}>
		<App sessionService={sessionService} />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
