import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { checkChat } from "./ChatList";
import { Eye, Icon, Send2 } from "iconsax-react";
import GroupSettingsModal from "./GroupSettingsModal";

const Conversation = ({ selectedChat, setSelectedChat }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { users } = useSelector((state) => state.getUserDetailsReducer);
  // console.log(users?.data?.user);
  // console.log(selectedChat);

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && message) {
      console.log("ok");
    } else {
      return;
    }
  };

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
        <Divider />
        {selectedChat ? (
          <>
            {loading ? (
              <Spinner size='xl' color='red.500' margin='auto' />
            ) : (
              <>
                <Box display='flex' marginTop='auto' alignItems='center'>
                  <Input
                    onKeyDown={handleSendMessage}
                    placeholder='Enter Message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button colorScheme='teal' marginLeft='5px'>
                    Send
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            marginTop='auto'
            marginBottom='auto'
          >
            <Text fontSize='2xl'>Please Select a chat</Text>
          </Box>
        )}
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
