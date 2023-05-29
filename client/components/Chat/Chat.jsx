import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
const Chat = () => {
  const fetchData = async () => {
    const res = await axios.get("/");
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <Box>Chat</Box>;
};

export default Chat;
