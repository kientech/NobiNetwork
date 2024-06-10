import React, { useRef } from "react";
import { SearchLogo } from "../../assets/constants";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Tooltip,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import SuggestedUser from "../suggested_users/SuggestedUser";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import useSearchUser from "../../hooks/useSearchUser";
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const searchRef = useRef(null);
  const handleSearchUser = (e) => {
    try {
      e.preventDefault();
      getUserProfile(searchRef.current.value);
    } catch (error) {
      console.log("🚀 ~ handleSearchUser ~ error:", error);
    }
  };
  console.log("🚀 ~ Search ~ user:", user);
  return (
    <>
      <Tooltip
        hasArrow
        placement="right"
        label={"Search"}
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo size={25} />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Link>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="sideInLeft">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="username" ref={searchRef} />
              </FormControl>
              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
