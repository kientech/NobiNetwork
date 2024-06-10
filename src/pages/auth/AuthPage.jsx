import React from "react";
import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/auth/AuthForm";
const AuthPage = () => {
  return (
    <Flex
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"4"}
    >
      <Container maxW={"container.md"} p={"0"}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={"10"}>
          <Box display={{ base: "none", md: "block" }}>
            <Image
              src="/public/images/auth.png"
              h={650}
              alt="Phone NobiNetwork"
            />
          </Box>
          <VStack spacing={4} align={"stretch"}>
            <AuthForm></AuthForm>
            <Box textAlign={"center"}>Get the app</Box>
            <Flex gap={"5"} justifyContent={"center"}>
              <Image
                src="/public/images/playstore.png"
                h={"10"}
                alt="PlayStore"
              />
              <Image
                src="/public/images/microsoft.png"
                h={"10"}
                alt="Microsoft"
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
