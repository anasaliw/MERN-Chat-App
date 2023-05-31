const RegisterUserReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "registerUser":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default RegisterUserReducer;
