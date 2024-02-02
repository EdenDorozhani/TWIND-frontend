import { Outlet } from "react-router-dom";
import React from "react";
import App from "../App";

const RootApp = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default RootApp;
