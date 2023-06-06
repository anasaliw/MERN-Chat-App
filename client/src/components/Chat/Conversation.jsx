import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { checkChat } from "./ChatList";

const Conversation = ({ selectedChat, setSelectedChat }) => {
  const { users } = useSelector((state) => state.getUserDetailsReducer);
  // console.log(users?.data?.user);
  console.log(selectedChat);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        // alignItems='center'
        flexDir='column'
        p={3}
        bg='#2b2b2b'
        width={{ base: "100%", md: "100%" }}
        borderRadius='5px'
        borderWidth='1px'
      >
        <Box display='flex' justifyContent='space-between'>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat("")}
          />
          <Text fontSize='4xl'>
            {checkChat(users?.data?.user, selectedChat)}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Conversation;
