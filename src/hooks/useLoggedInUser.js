import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const useLoggedInUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("user context should be used inside user provider");
  }
  return context;
};

export default useLoggedInUser;
