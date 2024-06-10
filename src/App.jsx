import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import PageLayout from "./layout/home/PageLayout";
import ProfilePage from "./pages/profile/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/auth" />}
        ></Route>
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        ></Route>
        <Route path="/:username" element={<ProfilePage></ProfilePage>}></Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
