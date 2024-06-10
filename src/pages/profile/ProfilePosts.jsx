import { Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import useGetUserPost from "../../hooks/useGetUserPost";
import useShowToast from "../../hooks/useShowToast";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPost();
  const noPostFound = !isLoading && posts.length === 0;

  if (noPostFound) return <Text>No Posts Found 🧐</Text>;
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((item, index) => (
          <VStack key={index} borderRadius={4} gap={4}>
            <Skeleton w={"300px"} h={"300px"} />
          </VStack>
        ))}
      {!isLoading && posts.length > 0 && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;
