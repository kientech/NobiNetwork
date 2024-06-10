import {
  Container,
  Skeleton,
  SkeletonCircle,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import FeedPost from "./FeedPost";
import useGetFeedPost from "../../hooks/useGetFeedPost";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPost();
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((item, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2} alignItems={"center"}>
              <SkeletonCircle size={10} />
              <VStack>
                <Skeleton h={"10px"} w={"200px"} />
                <Skeleton h={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"} h={"500px"} />
            <Skeleton h={"10px"} w={"full"} />
            <Skeleton h={"10px"} w={"full"} />
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
    </Container>
  );
};

export default FeedPosts;
