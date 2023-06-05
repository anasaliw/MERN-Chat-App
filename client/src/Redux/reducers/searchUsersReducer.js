const searchUserReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "searchUsers":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default searchUserReducer;
