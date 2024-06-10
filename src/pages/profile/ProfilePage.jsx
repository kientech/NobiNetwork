import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { Link, useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";

const UserNotFound = () => {
  return (
    <Flex w={'full'} h={'100vh'} flexDirection={"column"} justifyContent={'center'} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link to={"/"} color="'blue.500" w={"max-content"} mx={"auto"}>
        Go home
      </Link>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={24} />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton h={"12px"} w={"150px"} />
        <Skeleton h={"12px"} w={"150px"} />
      </VStack>
    </Flex>
  );
};

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        direction={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        direction={"column"}
      >
        <ProfileTabs />
        {/* <ProfilePosts /> */}
      </Flex>
    </Container>
  );
};

export default ProfilePage;
