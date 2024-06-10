import React, { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import userProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = userProfileStore();
  const { showToast } = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setUserProfile(null);
        } else {
          const userDoc = querySnapshot.docs[0].data();
          setUserProfile(userDoc);
        }
      } catch (error) {
        console.log("🚀 ~ getUserProfile ~ error:", error)
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
