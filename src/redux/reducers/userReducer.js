const INITIAL_STATE = {
  name: '',
  email: '',
};

export default function saveUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_EMAIL_USER':
    return {
      ...state,
      email: action.payload,
    };
  case 'SAVE_NAME_USER':
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
}
