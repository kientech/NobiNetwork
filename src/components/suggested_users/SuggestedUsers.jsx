import { Flex, VStack, Text, Box } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUser();
  // if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggeted for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See all
        </Text>
      </Flex>

      {suggestedUsers.map((user) => (
        <SuggestedUser key={user.id} user={user} />
      ))}

      <Box fontSize={12} textAlign={"left"}>
        &copy; 2024 built by Kien Duong Trung
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
