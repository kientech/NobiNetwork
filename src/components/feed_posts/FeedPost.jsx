import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box borderRadius={8} overflow={"hidden"}>
        <Image src={post.imageURL} />
      </Box>
      <PostFooter creatorProfile={userProfile} post={post} />
    </>
  );
};

export default FeedPost;
