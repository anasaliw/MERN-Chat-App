import { Box, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { checkChat } from "./ChatList";
import { Eye, Icon } from "iconsax-react";
import GroupSettingsModal from "./GroupSettingsModal";

const Conversation = ({ selectedChat, setSelectedChat }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
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
            onClick={() => setSelectedChat()}
          />
          <Text fontSize='4xl'>
            {checkChat(users?.data?.user, selectedChat)}
          </Text>
          {selectedChat?.isGroupChat === true && (
            <IconButton
              onClick={onOpen}
              icon={<Eye size={22} color='#FF8A65' />}
            ></IconButton>
          )}
        </Box>
      </Box>
      <GroupSettingsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedChat={selectedChat}
      />
    </>
  );
};

export default Conversation;
