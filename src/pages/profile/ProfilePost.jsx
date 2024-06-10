import {
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  Avatar,
  Box,
  Button,
  Divider,
  VStack,
} from "@chakra-ui/react";
import Comment from "../../components/comments/Comment";
import React, { useState } from "react";
import { ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { AiFillDelete, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import PostFooter from "../../components/feed_posts/PostFooter";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { deleteObject } from "firebase/storage";
import useShowToast from "../../hooks/useShowToast";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = userProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const delelePostFromProfile = userProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure delete this post?")) return;
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      deletePost(post.id);
      delelePostFromProfile(post.id);
      showToast("Success", "Delete post successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          cursor={"pointer"}
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg={"blackAlpha.300"}
          transition={"0.3s ease-in-out"}
          justifyContent={"center"}
          zIndex={1}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.likes?.length}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <AiOutlineComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.comments?.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image src={post.imageURL} w={"full"} h={"full"} objectFit={"cover"} />
      </GridItem>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"blackAlpha.500"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
            >
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.400"}
                flex={1.5}
              >
                <Image
                  src={post.imageURL}
                  w={"full"}
                  h={"full"}
                  objectFit={"cover"}
                />
              </Box>
              <Flex
                w={"full"}
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      name={userProfile.fullname}
                      src={userProfile.profilePicUrl}
                      size={"sm"}
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      bg={"transparent"}
                      isLoading={isDeleting}
                      onClick={handleDeletePost}
                      _hover={{ bg: "whiteAlpha.500", color: "red.600" }}
                    >
                      <AiFillDelete />
                    </Button>
                  )}
                </Flex>
                <Divider mt={4} bg={"gray.500"} />

                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post.caption && (
                    <Text color={"black.500"} fontWeight={"bold"}>
                      {post.caption}
                    </Text>
                  )}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />

                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
