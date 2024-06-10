import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { Timestamp } from "firebase/firestore";
const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        showToast("Success", "Login successful", "success");
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullname: newUser.user.displayName,
          username: newUser.user.email.split("@")[0],
          profilePicUrl: newUser.user.photoURL,
          bio: "",
          posts: [],
          followers: [],
          following: [],
          createdAt: Timestamp.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        showToast("Success", "Registration successful", "success");
      }
    } catch (error) {
      console.log("🚀 ~ handleGoogleAuth ~ error:", error);
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Flex
        gap={2}
        onClick={handleGoogleAuth}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
      >
        <Image
          src="/public/images/google.png"
          alt="Google Logo"
          w={5}
          objectFit={"cover"}
        />
        <Text color={"blue.500"} mx={2}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
