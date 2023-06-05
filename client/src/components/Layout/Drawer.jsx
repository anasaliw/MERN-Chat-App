import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accessOrCreateChatAction,
  searchUsersAction,
} from "../../Redux/action";
import { SearchNormal } from "iconsax-react";
import LoadingSkeleton from "../LoadingSkeleton.";
import { ChatState } from "../../Context/Context";

const DrawerFile = ({ btnRef, isOpen, onOpen, onClose }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchUsers = () => {
    setShow(true);
    dispatch(searchUsersAction(search));
  };
  const { reHit, setReHit } = ChatState();
  const handleCreateChat = async (id) => {
    setIsLoading(true);
    await dispatch(accessOrCreateChatAction(id));
    setReHit(!reHit);
    setIsLoading(false);
  };
  const { loading, users } = useSelector((state) => state.searchUserReducer);
  // console.log(users?.data?.users);
  return (
    <>
      <Drawer
        // drawerStyle={{ background: "red !important" }}
        // background='red'
        isOpen={isOpen}
        // bg='tomato'
        // sx={{ background: "red !important" }}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        {/* <DrawerContent bg={{ backgroundColor: "#2b2b2b !important" }}> */}
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display='flex' alignItems='center'>
              <Input
                placeholder='Type here...'
                value={search}
                marginRight='10px'
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={fetchSearchUsers}>
                <SearchNormal cursor='pointer' size='32' color='#FF8A65' />
              </Button>
            </Box>

            {isLoading ? (
              <Box
                sx={{
                  display: "grid",
                  alignItem: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Spinner color='orange.500' size='xl' />
              </Box>
            ) : (
              <>
                {show &&
                  (loading ? (
                    <LoadingSkeleton />
                  ) : (
                    users?.data?.users?.map((user, index) => (
                      <Box
                        onClick={() => handleCreateChat(user?._id)}
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
                  ))}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerFile;
