
// The initial application state
const initialState = {
    phone_numbers : {},
    firstname : '',
    lastname : '',
    username : '',
    password : '',
    confirmpassword : '',
    number : '',
    errors : {
        firstname : '',
        lastname : '',
        username : '',
        password : '',
        confirmpassword : '',
        number : '',
    },
};

// Takes care of changing the application state
export default function addUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      state = {
        ...state,
        firstname : action.payload.firstname,
        lastname : action.payload.lastname,
        username : action.payload.username,
        password : action.payload.password,
        confirmpassword : action.payload.confirmpassword,
        number : action.payload.number,
      }
      break;
    default:
      return state;
  }
  return state;
}
