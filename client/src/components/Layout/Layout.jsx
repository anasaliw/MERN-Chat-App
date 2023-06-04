import {
  Box,
  Button,
  Drawer,
  Text,
  Tooltip,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
// import SearchNormal from "iconsax-react";
import { SearchNormal } from "iconsax-react";
import DrawerFile from "./Drawer";
const Layout = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useBoolean();

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        backgroundColor='#2b2b2b'
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
          <Text>MERN-Chat-App</Text>
        </Box>
      </Box>
      <DrawerFile
        btnRef={btnRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Layout;
