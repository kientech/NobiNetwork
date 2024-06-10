import {
  Box,
  Flex,
  InputGroup,
  Text,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentModal from "../comments/CommentModal";

const PostFooter = ({ post, username, isProfilePage, creatorProfile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };
  const commentRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);
  const { isLiked, handleLikePost, likes } = useLikePost(post);

  return (
    <Box mt={"auto"} mb={10}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={1}>
        <Box
          onClick={handleLikePost}
          cursor={"pointer"}
          userSelect={"none"}
          mt={2}
          fontSize={18}
        >
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box
          // onClick={handleLiked}
          cursor={"pointer"}
          userSelect={"none"}
          mt={2}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {isProfilePage && <Text>Posted {timeAgo(post.createdAt)}</Text>}
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.username}_{" "}
            <Text as={"span"} fontWeight={400}>
              {post?.caption}
            </Text>
          </Text>
          {post?.comments.length > 0 && (
            <Text
              fontSize={"sm"}
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post?.comments.length} comments
            </Text>
          )}
          {isOpen ? (
            <CommentModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
          mb={4}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                color={"blue.500"}
                _hover={{
                  color: "white",
                }}
                fontWeight={600}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
