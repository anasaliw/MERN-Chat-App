import { Avatar, Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const ChatList = ({ chatList, selectedChat, setSelectedChat }) => {
  const { users } = useSelector((state) => state.getUserDetailsReducer);

  return (
    <>
      <VStack
        width={{ base: "100%", md: "33%" }}
        padding='0px 15px'
        backgroundColor='#2D3748'
        overflowY='scroll'
        minHeight='91vh'
      >
        {chatList ? (
          <>
            {chatList.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat?._id === chat?._id ? "white" : "black"}
                // color='black'
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w='100%'
                display='flex'
                alignItems='center'
                px={3}
                mt={2}
                py={2}
                mb={2}
                borderRadius='lg'
              >
                <Avatar
                  mr={2}
                  size='sm'
                  cursor='pointer'
                  //   name={checkChat(users?.data?.user, chat)}
                  src={
                    !chat.isGroupChat
                      ? checkDp(users?.data?.user, chat)
                      : "/assets/group.png"
                  }
                />
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? checkChat(users?.data?.user, chat)
                      : chat.chatName}
                  </Text>
                  {/* <Text fontSize='xs'>
                    <b>Email : </b>
                    {user.email}
                  </Text> */}
                </Box>
              </Box>
            ))}
          </>
        ) : (
          "No Chats"
        )}
      </VStack>
    </>
  );
};

export default ChatList;

const checkChat = (loggedUser, ChatUser) => {
  return loggedUser._id === ChatUser?.users[0]._id
    ? ChatUser?.users[1].name
    : ChatUser?.users[0].name;
};

const checkDp = (loggedUser, ChatUser) => {
  return loggedUser._id === ChatUser?.users[0]._id
    ? ChatUser?.users[1].pic.url
    : ChatUser?.users[0].pic.url;
};
