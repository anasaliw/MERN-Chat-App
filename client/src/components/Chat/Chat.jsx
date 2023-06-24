import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../Redux/action";
import { ChatState } from "../../Context/Context";
import ChatList from "./ChatList";
import Conversation from "./Conversation";

const Chat = () => {
  // const [selectedChat, setSelectedChat] = useState();

  const dispatch = useDispatch();
  const fetchAvailableChat = async () => {
    await dispatch(fetchChats());
  };

  const { loading, chats } = useSelector((state) => state.getChatsReducer);
  // console.log(chats?.data?.data);
  const { reHit, setReHit, selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    fetchAvailableChat();
  }, [reHit]);
  return (
    <Box display='flex'>
      <ChatList
        // style={{ width: "100%" }}
        chatList={chats?.data?.data}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      <Conversation
        // style={{ width: "100%" }}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </Box>
  );
};

export default Chat;
