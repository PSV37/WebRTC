
// The initial application state
const initialState = {
  phone_numbers : [],

};

// Takes care of changing the application state
export default function numberReducer(state = initialState, action) {
  switch (action.type) {
    case 'PHONE_NUMBER_LIST':
      state = {
        ...state,
        phone_numbers : action.payload,
      }
      break;
    default:
      return state;
  }
  return state;
}
