import React from "react";
import { NotificationsLogo } from "../../assets/constants";
import { Box, Tooltip, Link } from "@chakra-ui/react";

const Notifications = () => {
  return (
    <Tooltip
      hasArrow
      placement="right"
      label={'Notifications'}
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        to={'/'}
        display={"flex"}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={"full"}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <NotificationsLogo size={25} />
        <Box display={{ base: "none", md: "block" }}>Notifications</Box>
      </Link>
    </Tooltip>
  );
};

export default Notifications;
