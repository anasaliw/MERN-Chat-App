import {
  Avatar,
  Box,
  Button,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Spinner,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, CloseCircle } from "iconsax-react";
import { createChatGroupAction, searchUsersAction } from "../../Redux/action";
import LoadingSkeleton from "../LoadingSkeleton.";
import { ChatState } from "../../Context/Context";

const ChatList = ({ chatList, selectedChat, setSelectedChat }) => {
  const { reHit, setReHit } = ChatState();
  const dispatch = useDispatch();
  const toast = useToast();

  // ! creation of group starts here
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [chatName, setChatName] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async (query) => {
    setLoading(true);
    await dispatch(searchUsersAction(query));
    setLoading(false);
  };
  const searchUsers = useSelector((state) => state.searchUserReducer);
  // console.log(searchUsers?.users?.data?.users);

  const handleAddUser = (userToAdd) => {
    if (selectedUsers?.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (data) => {
    setSelectedUsers(selectedUsers?.filter((user) => user._id !== data._id));
  };
  const handleCreateGroup = async () => {
    if (!chatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setLoadingButton(true);
    const userIds = JSON.stringify(selectedUsers.map((u) => u._id));
    // console.log(userIds);
    await dispatch(createChatGroupAction(chatName, userIds));
    setLoadingButton(false);
    onClose();
    setReHit(!reHit);
  };

  // ! creation of group ends here

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
        <Box
          marginTop='20px'
          display='flex'
          w='100%'
          justifyContent='space-between'
          alignItems='center'
        >
          <Text textAlign='start' fontSize='20px'>
            My Chats
          </Text>
          <Button rightIcon={<Add />} onClick={onOpen}>
            New Group Chat
          </Button>
        </Box>
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
                mt={1}
                py={2}
                mb={1}
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
      {/* // Modal for groupChat*/}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Input
                  placeholder='Enter Group Name'
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                />
              </FormControl>
              <FormControl marginTop='20px'>
                <Input
                  placeholder='Search Users'
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <Box w='100%' d='flex' flexWrap='wrap'>
                {selectedUsers?.map((data) => (
                  <Badge
                    // as={"span"}
                    key={data._id}
                    px={2}
                    py={1}
                    borderRadius='lg'
                    m={1}
                    mb={2}
                    variant='solid'
                    fontSize={12}
                    colorScheme='purple'
                    cursor='pointer'
                    textAlign='center'
                    // display='dl'
                    onClick={() => handleDelete(data)}
                  >
                    {/* <Text as='span'></Text> */}
                    {data.name}
                    <CloseIcon pl={1} />

                    {/* {admin === user._id && <span> (Admin)</span>} */}
                  </Badge>
                ))}
              </Box>
              {loading ? (
                <>
                  <Spinner
                    color='orange.500'
                    size='xl'
                    margin='10px auto'
                    textAlign='center'
                    display='flex'
                    justifyContent='center'
                  />
                </>
              ) : (
                searchUsers?.users?.data?.users
                  ?.slice?.(0, 5)
                  ?.map((user, index) => (
                    <Box
                      key={index}
                      onClick={() => handleAddUser(user)}
                      cursor='pointer'
                      bg='#E8E8E8'
                      _hover={{
                        background: "#38B2AC",
                        color: "white",
                      }}
                      w='100%'
                      display='flex'
                      alignItems='center'
                      color='black'
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
                        name={user.name}
                        src={user.pic.url}
                      />
                      <Box>
                        <Text>{user.name}</Text>
                        <Text fontSize='xs'>
                          <b>Email : </b>
                          {user.email}
                        </Text>
                      </Box>
                    </Box>
                  ))
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme='blue'
                isLoading={loadingButton}
                onClick={handleCreateGroup}
              >
                Create Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
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
