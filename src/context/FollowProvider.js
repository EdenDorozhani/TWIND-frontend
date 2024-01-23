import { createContext, useEffect, useState } from "react";

export const Follow = createContext({});

const FollowProvider = ({ children }) => {
  const [isFollowed, setIsFollowed] = useState("0");

  const setFollow = (isFollow) => {
    setIsFollowed(isFollow);
  };

  console.log(isFollowed);

  const providerValue = {
    setFollow,
    isFollowed,
  };

  return <Follow.Provider value={providerValue}>{children}</Follow.Provider>;
};

export default FollowProvider;
