import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../../components/feed_posts/FeedPosts";
import SuggestedUsers from "../../components/suggested_users/SuggestedUsers";

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          py={10}
          mr={20}
          display={{ base: "none", md: "block" }}
          maxW={"300px"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
