import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const authUser = useAuthStore((state) => state.user);
  const { handleSignOut, loading, error } = useLogOut();
  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor="pointer"
        >
          <InstagramLogo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          marginX={"auto"}
          display={{ base: "block", md: "none" }}
          cursor="pointer"
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>

        <Flex direction={"column"} justifyContent={'center'} alignItems={'center'} gap={5} cursor={"pointer"}>
          <SideBarItem />
        </Flex>

        <Tooltip
          hasArrow
          placement="right"
          alignItems={"center"}
          label={"Log out"}
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleSignOut}
            display={"flex"}
            alignItems={"center"}
            gap={4}
            mt={"auto"}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              isLoading={loading}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
            >
              Log out
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default SideBar;
