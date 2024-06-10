import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { storage } from "../firebase/firebase";
import { getDownloadURL, uploadString } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import userProfileStore from "../store/userProfileStore";
import { ref } from "firebase/storage";
import { doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);
    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }
      const updatedUser = {
        ...authUser,
        fullname: inputs.fullname || authUser.fullname,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicUrl: URL || authUser.profilePicUrl,
      };
      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;
