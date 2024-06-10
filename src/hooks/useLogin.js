import useShowToast from "./useShowToast";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { firestore, auth } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleLogin = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
        showToast("Success", "Login Success", "success");
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error);
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, handleLogin };
};

export default useLogin;
