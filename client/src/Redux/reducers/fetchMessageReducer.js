const fetchMessagesReducer = (
  state = { loading: true, messages: [] },
  action
) => {
  switch (action.type) {
    case "fetchMessages":
      return { ...state, loading: false, messages: action.payload };
    default:
      return state;
  }
};
export default fetchMessagesReducer;
