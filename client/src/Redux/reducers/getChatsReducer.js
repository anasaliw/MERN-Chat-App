const getChatsReducer = (state = { loading: true, chats: [] }, action) => {
  switch (action.type) {
    case "fetchChats":
      return { ...state, loading: false, chats: action.payload };
    default:
      return state;
  }
};
export default getChatsReducer;
