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
import io from "socket.io-client";
import animationData from "../../Animations/typing.json";
import Lottie from "react-lottie";

const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const Conversation = ({ selectedChat, setSelectedChat }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const { users } = useSelector((state) => state.getUserDetailsReducer);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // console.log(users?.data?.user);
  // console.log(selectedChat);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", JSON.parse(localStorage.getItem("userData")));
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const handleSendMessage = async (e) => {
    //This condition is used to return if message is not feed in
    socket.emit("stop typing", selectedChat._id);
    if (e.key === "Enter" && message) {
      // setLoading(true);
      setMessage("");
      const res = await dispatch(sendMessageAction(message, selectedChat._id));
      // console.log(res.data.data);
      socket.emit("new message", res.data.data);
      setMessages([...messages, res.data.data]);
      // setLoading(false);
    } else {
      return;
    }
  };
  const fetchMessages = async (e) => {
    setLoading(true);
    const res = await dispatch(fetchMessagesAction(selectedChat._id));
    // console.log(res.data.data);
    setMessages(res.data.data);
    setLoading(false);
    socket.emit("join chat", selectedChat._id);
  };
  // const { messages } = useSelector((state) => state.fetchMessagesReducer);
  // console.log(messages);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  // console.log(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // console.log(newMessageReceived);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // if (!notification.includes(newMessageReceived)) {
        //   setNotification([newMessageReceived, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
        overflowY='scroll'
        minHeight='90.8vh'
        maxHeight='90.8vh'
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
                    marginBottom: "10px",
                  }}
                >
                  <ScrollableChat messages={messages} />
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
          <>
            {isTyping ? (
              <>
                <Lottie
                  options={defaultOptions}
                  height={50}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </>
            ) : (
              ""
            )}
            <Input
              onKeyDown={handleSendMessage}
              placeholder='Enter Message...'
              value={message}
              onChange={handleTyping}
            />
          </>
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
