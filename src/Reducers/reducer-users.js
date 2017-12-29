
// The initial application state
const initialState = {
  user: {
    Email: '',
    Password: '',
    AccountSid : '',
	Address: '',
	AuthToken:'',
	City: '',
	Country: '',
	CountryCode:'',
	FirstName:'',
	Id:'',
	LastName:'',
	Phone:'',
	State:'',
	TotalFund:'',
	Zip:'',

  },
  currentlySending: false,
  loggedIn: false,
  errorMessage: {},
};

// Takes care of changing the application state
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      state = {
        ...state,
        user : {
        	Email: action.payload.user.Email,
        	AccountSid : action.payload.user.AccountSid,
    			Address: action.payload.user.Address,
    			AuthToken: action.payload.user.AuthToken,
    			City: action.payload.user.City,
    			Country: action.payload.user.Country,
    			CountryCode: action.payload.user.CountryCode,
    			FirstName: action.payload.user.FirstName,
    			Id :action.payload.user.Id,
    			LastName: action.payload.user.LastName,
    			Phone: action.payload.user.Phone,
    			State: action.payload.user.State,
    			TotalFund: action.payload.user.TotalFund,
    			Zip: action.payload.user.Zip,
          WebrtcDomain : action.payload.user.WebrtcDomain,
          Profile: action.payload.user.Profile
        },
        loggedIn: action.payload.isLoggedIn,
      }

      localStorage.setItem('webrtc_user_auth', JSON.stringify(state));
      break;
    case 'UPDATE_DOMAIN':
      state = {
        ...state,
        user : {
          ...state.user,
          WebrtcDomain : action.payload.current_domain,
        },
      }
      localStorage.removeItem('webrtc_user_auth');
      localStorage.setItem('webrtc_user_auth', JSON.stringify(state));
      break;
    case 'PERSIST_AUTH':
	      state = action.payload
      break;
    case 'LOGOUT':
	      state = {};
	      localStorage.removeItem('webrtc_user_auth');
      break;
    default:
      return state;
  }
  return state;
}
