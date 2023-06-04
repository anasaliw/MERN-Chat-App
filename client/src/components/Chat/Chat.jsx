import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

const Chat = () => {
  const [chat, setChat] = useState();
  // const fetchData = async () => {
  //   // const res = await axios.get("http://localhost:5000/");
  //   const res = await axios.get("http://localhost:5000/api/chat");
  //   console.log(res);
  //   setChat(res.data);
  // };

  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <>
      <Box>hi</Box>
    </>
  );
};

export default Chat;
