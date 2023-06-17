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
import React, { useState, useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { checkChat } from "./ChatList";
import { Eye, Icon, Send2 } from "iconsax-react";
import GroupSettingsModal from "./GroupSettingsModal";
import { fetchMessagesAction, sendMessageAction } from "../../Redux/action";
import ScrollableChat from "./ScrollableChat";

const Conversation = ({ selectedChat, setSelectedChat }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { users } = useSelector((state) => state.getUserDetailsReducer);
  // console.log(users?.data?.user);
  // console.log(selectedChat);

  const handleSendMessage = async (e) => {
    //This condition is used to return if message is not feed in

    if (e.key === "Enter" && message) {
      // setLoading(true);
      setMessage("");
      await dispatch(sendMessageAction(message, selectedChat._id));
      // setLoading(false);
    } else {
      return;
    }
  };
  const fetchMessages = async (e) => {
    setLoading(true);
    await dispatch(fetchMessagesAction(selectedChat._id));
    setLoading(false);
  };
  const { messages } = useSelector((state) => state.fetchMessagesReducer);
  // console.log(messages);
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

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
        overflowY='scroll'
        minHeight='90.8vh'
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                >
                  <ScrollableChat messages={messages.data.data} />
                </div>
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
        {selectedChat ? (
          <Box display='flex' marginTop='auto' alignItems='center'>
            <Input
              onKeyDown={handleSendMessage}
              placeholder='Enter Message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
        ) : (
          ""
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
