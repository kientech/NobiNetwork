import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
import ProfilePosts from "./ProfilePosts";

const ProfileTabs = () => {
  return (
    <Tabs align="center">
      <TabList>
        <Tab>
          <Flex alignItems={"center"} cursor={"pointer"}>
            <BsGrid3X3 size={16} />
            <Text fontWeight={"bold"} ml={1}>
              Posts
            </Text>
          </Flex>
        </Tab>
        <Tab>
          <Flex alignItems={"center"} cursor={"pointer"}>
            <BsBookmark size={16} />
            <Text fontWeight={"bold"} ml={1}>
              Saved
            </Text>
          </Flex>
        </Tab>
        <Tab>
          <Flex alignItems={"center"} cursor={"pointer"}>
            <BsSuitHeart size={16} />
            <Text fontWeight={"bold"} ml={1}>
              Liked
            </Text>
          </Flex>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProfilePosts />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
