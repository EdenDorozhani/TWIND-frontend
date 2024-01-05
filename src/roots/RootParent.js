import { Outlet } from "react-router-dom";
import React from "react";
import App from "../App";

const RootParent = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default RootParent;
