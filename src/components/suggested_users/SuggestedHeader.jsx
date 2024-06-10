import {
  Flex,
  Avatar,
  Box,
  Text,
  Link,
  textDecoration,
} from "@chakra-ui/react";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import { auth } from "../../firebase/firebase";

const SuggestedHeader = () => {
  const { handleSignOut, loading, error } = useLogOut();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) return null;
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Link
        as={RouterLink}
        to={`${authUser.username}`}
        textDecoration={"none"}
        _hover={{ textDecoration: "none" }}
      >
        <Flex alignItems={"center"} gap={2}>
          <Avatar
            size={"sm"}
            name={authUser.fullname}
            src={authUser.profilePicUrl}
          />
          <Box fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Box>
        </Flex>
      </Link>
      <Box _hover={{ textDecoration: "none" }}>
        <Flex
          onClick={handleSignOut}
          alignItems={"center"}
          gap={2}
          color={"blue.400"}
          _hover={{ color: "white", textDecoration: "none" }}
          transition={"0.2s ease-in-out"}
          cursor={"pointer"}
        >
          <BiLogOut />
          <Text fontSize={12} fontWeight={"bold"}>
            Log out
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SuggestedHeader;
