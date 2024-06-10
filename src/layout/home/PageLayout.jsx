import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/navbar/Navbar";
import { Spinner } from "@chakra-ui/react";

const PageLoadingSpinner = () => {
  return (
    <Flex
      flexDirection={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const canRenderNavBar = !user && !loading && pathname !== "/auth";
  const canRenderSideBar = pathname !== "/auth" && user;
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLoadingSpinner />;

  return (
    <Flex flexDirection={canRenderNavBar ? "column" : "row"}>
      {canRenderSideBar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}
      {canRenderNavBar ? <Navbar /> : null}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
