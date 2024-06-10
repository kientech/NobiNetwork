import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
  const { userProfile } = useGetUserProfileById(comment.createdBy);
  return (
    <Flex w={"full"} gap={4} my={2}>
      <Flex gap={2}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar
            src={userProfile?.profilePicUrl}
            name={userProfile?.fullname}
            size={"md"}
          />
        </Link>
        <Box>
          <Text fontWeight={"bold"}>{userProfile?.username}</Text>
          <Text as={"span"} fontSize={14} color={"gray.500"}>
            {timeAgo(comment?.createdAt)}
          </Text>
        </Box>
      </Flex>
      <Text>{comment?.comment}</Text>
    </Flex>
  );
};

export default Comment;
