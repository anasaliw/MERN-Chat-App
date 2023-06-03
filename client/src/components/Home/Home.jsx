import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction, registerAction } from "../../Redux/action";

const Home = () => {
  const dispatch = useDispatch();
  const handleFileRef = useRef(null);
  const [image, setImage] = useState();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChangeLogin = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleChangeRegister = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };
  const handleImageChange = (pic) => {
    //convert file to base 64
    // console.log(pic);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(pic);
    fileReader.onloadend = () => {
      console.log(fileReader.result);
      setImage(fileReader.result);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerAction({ ...registerValues, pic: image }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("calling");
    dispatch(loginAction(loginValues));
  };

  return (
    <VStack p={3}>
      <Container
        outline={"1px solid blue"}
        boxShadow={"rgb(83, 0, 248) 1px 1px 5px 5px"}
        borderRadius={"10px"}
        mt={"70px"}
        p={"15px 10px"}
      >
        <Text fontSize={"3xl"} marginLeft='auto' textAlign={"center"}>
          MERN Chat App By Anas
        </Text>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mt={10}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={handleLogin}>
                <VStack>
                  <FormControl mt={5} mb={5} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      name='email'
                      value={loginValues.email}
                      onChange={handleChangeLogin}
                      placeholder='Email'
                    />
                  </FormControl>
                  <FormControl isRequired mb={5}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder='Password'
                      type='password'
                      name='password'
                      value={loginValues.password}
                      onChange={handleChangeLogin}
                    />
                  </FormControl>
                </VStack>
                <Button
                  type='submit'
                  width={"100%"}
                  marginTop={"20px"}
                  colorScheme='facebook'
                >
                  Login
                </Button>
                <Button width={"100%"} marginTop={"20px"} colorScheme='red'>
                  Continue As Guest
                </Button>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={handleRegister}>
                <VStack>
                  <FormControl mt={5} isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type='text'
                      name='name'
                      value={registerValues.name}
                      onChange={handleChangeRegister}
                      placeholder='Name'
                    />
                  </FormControl>
                  <FormControl mt={5} mb={5} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type='email'
                      name='email'
                      value={registerValues.email}
                      onChange={handleChangeRegister}
                      placeholder='Email'
                    />
                  </FormControl>
                  <FormControl isRequired mb={5}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder='Password'
                      type='password'
                      name='password'
                      value={registerValues.password}
                      onChange={handleChangeRegister}
                    />
                  </FormControl>
                  <Input
                    // isRequired
                    type='file'
                    hidden
                    ref={handleFileRef}
                    accept='image/*'
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  ></Input>
                </VStack>

                <Button
                  width={"50%"}
                  marginTop={"20px"}
                  backgroundColor={"#2b2b2b"}
                  borderRadius={"20px"}
                  onClick={() => handleFileRef.current.click()}
                >
                  Upload Profile Picture
                </Button>
                <Button
                  type='submit'
                  width={"100%"}
                  marginTop={"20px"}
                  colorScheme='facebook'
                >
                  Register
                </Button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Box marginTop={"30px"}>margin</Box> */}
      </Container>
    </VStack>
  );
};

export default Home;
