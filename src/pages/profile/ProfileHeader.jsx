import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { useDisclosure } from "@chakra-ui/react";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
const ProfileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = userProfileStore();
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const authUser = useAuthStore((state) => state.user);
  const isEditProfile =
    authUser && userProfile?.username === authUser?.username;
  const isAnotherProfile =
    authUser && userProfile?.username !== authUser?.username;
  return (
    <Flex
      gap={{ base: 4, md: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        alignItems={"center"}
        justifyContent={"flex-start"}
        mx={"auto"}
      >
        <Avatar name={userProfile.fullname} src={userProfile.profilePicUrl} />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          w={"full"}
          alignItems={"center"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            {isEditProfile ? (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                base={{ base: "xs", md: "sm" }}
                cursor={"pointer"}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            ) : null}

            {/* modal edit */}
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}

            {isAnotherProfile ? (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                base={{ base: "xs", md: "sm" }}
                cursor={"pointer"}
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            ) : null}
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.posts?.length}
            </Text>
            Posts
          </Text>

          <Text>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.followers?.length}
            </Text>
            Followers
          </Text>

          <Text>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile?.following?.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile?.fullname}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile?.bio}</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
