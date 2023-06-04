const getUserDetailsReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "getUserDetails":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default getUserDetailsReducer;
