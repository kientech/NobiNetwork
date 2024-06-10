import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { where } from "firebase/firestore";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUser = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          orderBy("uid"),
          where("uid", "not-in", [...authUser.following, authUser.uid]),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUsers(users);
      } catch (error) {
        console.log("🚀 ~ getSuggestedUser ~ error:", error);
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUser();
  }, [authUser, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUser;
