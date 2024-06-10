import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import userProfileStore from "../store/userProfileStore";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { Timestamp, arrayUnion, collection } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const userProfile = userProfileStore((state) => state.userProfile);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = userProfileStore((state) => state.addPost);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (!selectedFile) {
      showToast("Error", "Please select an image", "error");
      return;
    }

    setIsLoading(true);

    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Timestamp.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile?.uid === authUser?.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile?.uid === authUser?.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      console.error("Error creating post:", error);
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
