import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImage from "../../hooks/usePreviewImage";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    bio: "",
  });
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  const fileRef = useRef(null);
  const { selectedFile, handleChangeImage, setSelectedFile } =
    usePreviewImage();

  const { editProfile, isUpdating } = useEditProfile();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"black"} boxShadow={"xl"} mx={3}>
        <ModalCloseButton />
        <ModalBody bg={"gray.800"} rounded={"xl"}>
          <Flex>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              p={6}
              rounded={"xl"}
              my={12}
              bg={"gray.800"}
            >
              <FormControl id="userName">
                <Stack direction={["column", "row"]} spacing={6}>
                  <Center>
                    <Avatar
                      size="xl"
                      src={selectedFile || authUser.profilePicUrl}
                    ></Avatar>
                  </Center>
                  <Center w="full">
                    <Button w="full" onClick={() => fileRef.current.click()}>
                      Change Picture
                    </Button>
                  </Center>
                  <Input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleChangeImage}
                  />
                </Stack>
              </FormControl>
              <FormControl id="fullname" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Full Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.fullname || authUser.fullname}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullname: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="username"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.username || authUser.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="bio" isRequired>
                <FormLabel>Bio</FormLabel>
                <Input
                  placeholder="bio"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={inputs.bio || authUser.bio}
                  onChange={(e) =>
                    setInputs({ ...inputs, bio: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isUpdating}
                  onClick={handleEditProfile}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
