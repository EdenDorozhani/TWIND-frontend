import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import UserProvider from "./context/UserProvider.js";
import FollowProvider from "./context/FollowProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <FollowProvider>
      <Router />
    </FollowProvider>
  </UserProvider>
);
