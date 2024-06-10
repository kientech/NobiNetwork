import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Link to={`/${creatorProfile?.username}`}>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
          <Avatar
            size={"sm"}
            name={creatorProfile?.fullname}
            src={creatorProfile?.profilePicUrl}
          />
          <Flex fontSize={12} fontWeight={"bold"} gap={"2"}>
            {creatorProfile?.username}
            <Box color={"gray"}>• {timeAgo(post.createdAt)}</Box>
          </Flex>
        </Flex>
      </Link>
      <Box cursor={"pointer"}>
        <Button
          onClick={handleFollowUser}
          isLoading={isUpdating}
          bg={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
