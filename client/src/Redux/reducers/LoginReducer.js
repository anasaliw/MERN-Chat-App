const LoginReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "loginUser":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default LoginReducer;
