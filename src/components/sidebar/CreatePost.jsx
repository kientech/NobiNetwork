import React, { useRef, useState } from "react";
import { CreatePostLogo } from "../../assets/constants";
import {
  Box,
  Tooltip,
  Link,
  Textarea,
  Input,
  Image,
  Flex,
  CloseButton,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AiFillFileImage } from "react-icons/ai";
import usePreviewImage from "../../hooks/usePreviewImage";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const showToast = useShowToast();
  const { selectedFile, handleChangeImage, setSelectedFile } =
    usePreviewImage();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Tooltip
        hasArrow
        placement="right"
        label={"Create"}
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Link
          to={"/"}
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={"full"}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo size={25} />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Link>
      </Tooltip>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption ...."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleChangeImage}
            />
            <AiFillFileImage
              mt={"15px"}
              ml={"5px"}
              cursor={"pointer"}
              size={0}
              onClick={() => imageRef.current.click()}
            />

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile("");
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePostCreation}
              isLoading={isLoading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
