import React from "react";
import Search from "./Search";
import Home from "./Home";
import Notifications from "./Notifications";
import CreatePost from "./CreatePost";
import ProfileLink from "./ProfileLink";

const SideBarItem = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SideBarItem;
