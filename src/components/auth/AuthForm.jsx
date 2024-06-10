import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={"4"} p={5}>
        <VStack>
          <Image src="/public/images/logo.png" h={24} cursor={"pointer"} />

          {isLogin ? <Login /> : <Signup />}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
          </Flex>

          <GoogleAuth prefix={isLogin ? "Login" : "Signup"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} p={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            cursor={"pointer"}
            color={"blue.500"}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
