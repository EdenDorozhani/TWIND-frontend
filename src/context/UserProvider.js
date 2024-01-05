import { createContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userLoggedInData, setUserLoggedInData] = useState({});

  const storeData = (data) => {
    setUserLoggedInData(data);
  };

  const providerValue = {
    userLoggedInData,
    storeData,
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
