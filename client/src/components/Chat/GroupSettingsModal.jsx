import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Input,
  Badge,
  Box,
  useToast,
  Spinner,
  Avatar,
  Text,
} from "@chakra-ui/react";
// import { Box } from "iconsax-react";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToGroupAction,
  removeFromGroupAction,
  renameGroupAction,
  searchUsersAction,
} from "../../Redux/action";
import { ChatState } from "../../Context/Context";
// import { Text } from "iconsax-react";

const GroupSettingsModal = ({ isOpen, onClose, selectedChat }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { reHit, setReHit } = ChatState();
  const [chatName, setChatName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  console.log(selectedChat?.users);
  const searchUsers = useSelector((state) => state.searchUserReducer);
  const { users } = useSelector((state) => state.getUserDetailsReducer);

  const handleRename = async () => {
    if (!chatName) {
      toast({
        title: "Please enter chat name",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    await dispatch(renameGroupAction(selectedChat?._id, chatName));
    setIsLoading(false);
    setReHit(!reHit);
    onClose();
  };
  const handleSearch = async (query) => {
    setSearchLoading(true);
    await dispatch(searchUsersAction(query));
    setSearchLoading(false);
  };

  const handleAddUser = async (user) => {
    const found = selectedChat?.users?.find((data) => data._id === user._id);
    if (found) {
      toast({
        title: "User is already in the chat",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSearchLoading(true);
    await dispatch(addToGroupAction(selectedChat?._id, user?._id));
    setSearchLoading(false);
    setReHit(!reHit);
    onClose();
  };
  const handleRemove = async (id) => {
    setSearchLoading(true);
    await dispatch(removeFromGroupAction(selectedChat?._id, id));
    setSearchLoading(false);
    setReHit(!reHit);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Group Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w='100%' d='flex' flexWrap='wrap' mt={2} mb={2}>
              {selectedChat?.users?.map((data) => (
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
                  onClick={() => handleRemove(data?._id)}
                >
                  {/* <Text as='span'></Text> */}
                  {data.name}
                  <CloseIcon pl={1} />

                  {/* {admin === user._id && <span> (Admin)</span>} */}
                </Badge>
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder='Enter Group Name'
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <Button
                isLoading={isLoading}
                colorScheme='teal'
                onClick={handleRename}
              >
                Rename
              </Button>
            </FormControl>
            {selectedChat?.groupAdmin?._id === users?.data?.user?._id && (
              <FormControl marginTop='20px'>
                <Input
                  placeholder='Search Users'
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
            )}
            {searchLoading ? (
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
            <Button
              colorScheme='red'
              onClick={() => handleRemove(users?.data?.user?._id)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupSettingsModal;
