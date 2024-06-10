import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = userProfileStore((state) => state.userProfile);
  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
        console.log("🚀 ~ getPosts ~ posts:", posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setPosts, userProfile]);
  return { isLoading, posts };
};

export default useGetUserPost;
