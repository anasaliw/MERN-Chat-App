import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [reHit, setReHit] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  return (
    <ChatContext.Provider
      value={{
        reHit,
        setReHit,
        notifications,
        setNotifications,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
