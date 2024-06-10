import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);
  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser()
      showToast("Success", "Sign out success", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleSignOut, loading, error };
};

export default useLogOut;
