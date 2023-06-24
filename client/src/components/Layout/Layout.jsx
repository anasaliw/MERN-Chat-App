import {
  Box,
  Button,
  Drawer,
  Text,
  Tooltip,
  useBoolean,
  useColorMode,
  useDisclosure,
  Menu,
  MenuItem,
  WrapItem,
  Avatar,
  MenuButton,
  MenuList,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import React, { useEffect, useRef } from "react";
// import SearchNormal from "iconsax-react";
import { SearchNormal, ArrowDown2, Notification } from "iconsax-react";
import DrawerFile from "./Drawer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction, logoutAction } from "../../Redux/action";
import { ChatState } from "../../Context/Context";
import { getSender } from "../Chat/ScrollableChat";
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, setNotifications, setSelectedChat, selectedChat } =
    ChatState();

  const btnRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalOpen = useDisclosure();
  const [open, setOpen] = useBoolean();
  // const { users } = useSelector((state) => state.getUserDetailsReducer);

  const fetchUserDetails = () => {
    dispatch(getUserDetailsAction());
  };
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const { users } = useSelector((state) => state.getUserDetailsReducer);
  // console.log(users);

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        backgroundColor='#2D3748'
        p='10px 20px'
        alignItems='center'
      >
        <Box cursor='pointer' ref={btnRef} onClick={onOpen}>
          <Tooltip label='Search Users' p='10px'>
            <Box display='flex' alignItems='center'>
              <SearchNormal
                size='18'
                color='#FF8A65'
                style={{ marginRight: "10px" }}
              />
              <Text>Search</Text>
            </Box>
          </Tooltip>
        </Box>

        <Box>
          <Text>MERN-Chat-App</Text>
        </Box>

        <Box>
          <Menu sx={{ marginRight: "10px" }}>
            <MenuButton
              sx={{ paddingLeft: "-40px" }}
              as={Button}
              rightIcon={<Notification style={{ paddingLeft: "-40px" }} />}
            >
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
              />
            </MenuButton>
            <MenuList>
              <MenuList pl={2}>
                {!notifications.length && "No New Messages"}
                {notifications.map((notif) => (
                  <MenuItem
                    color='black'
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotifications(
                        notifications.filter((n) => n !== notif)
                      );
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(
                          users?.data?.user,
                          notif.chat.users
                        )}`}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuList>
          </Menu>
          &nbsp; &nbsp;
          <Menu>
            <MenuButton as={Button} rightIcon={<ArrowDown2 />}>
              <WrapItem>
                <Avatar
                  name={users?.data?.user?.name}
                  size='sm'
                  src={users?.data?.user?.pic?.url}
                />
              </WrapItem>
            </MenuButton>
            <MenuList color='black'>
              <MenuItem onClick={modalOpen.onOpen}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <DrawerFile isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Modal isOpen={modalOpen.isOpen} onClose={modalOpen.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
          >
            <WrapItem>
              <Avatar
                name={users?.data?.user?.name}
                size='2xl'
                src={users?.data?.user?.pic?.url}
              />
            </WrapItem>
            <Text fontSize='2xl'>{users?.data?.user?.name}</Text>
            <Text fontSize='2xl'>{users?.data?.user?.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={modalOpen.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Layout;
