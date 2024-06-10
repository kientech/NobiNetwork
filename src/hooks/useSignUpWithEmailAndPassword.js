import { Timestamp, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react"; // Import useEffect and useState
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { collection, query, where } from "firebase/firestore";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, loadingAuth, error, user] =
    useCreateUserWithEmailAndPassword(auth);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  useEffect(() => {
    // Set loading state based on auth loading state
    setLoading(loadingAuth);
  }, [loadingAuth]);

  const handleSignUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullname
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      // Set loading to true when sign up process starts
      setLoading(true);

      const newUserCredential = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (newUserCredential && newUserCredential.user) {
        const userDoc = {
          uid: newUserCredential.user.uid,
          email: inputs.email,
          fullname: inputs.fullname,
          username: inputs.username,
          profilePicUrl: "",
          bio: "",
          posts: [],
          followers: [],
          following: [],
          createdAt: Timestamp.now(),
        };

        await setDoc(
          doc(firestore, "users", newUserCredential.user.uid),
          userDoc
        );
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        showToast("Success", "Registration successful", "success");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      showToast("Error", "An error occurred during signup", "error");
    } finally {
      // Set loading to false when sign up process ends
      setLoading(false);
    }
  };

  return { loading, error, handleSignUp };
};

export default useSignUpWithEmailAndPassword;
