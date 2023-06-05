import {
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsersAction } from "../../Redux/action";
import { SearchNormal } from "iconsax-react";

const DrawerFile = ({ btnRef, isOpen, onOpen, onClose }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const fetchSearchUsers = () => {
    dispatch(searchUsersAction(search));
  };
  const { loading, users } = useSelector((state) => state.searchUserReducer);
  console.log(users?.data?.users);
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerFile;
