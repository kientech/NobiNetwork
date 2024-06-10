import { Button, Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Image
          src="/images/logo.png"
          display={{ base: "none", sm: "block" }}
          h={20}
          cursor={"pointer"}
        />
        <Flex gap={4}>
          <Link to={"/auth"}>
            <Button colorScheme={"blue"} size={"sm"}>
              Login
            </Button>
          </Link>

          <Link to={"/auth"}>
            <Button variant={"outline"} size={"sm"}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
