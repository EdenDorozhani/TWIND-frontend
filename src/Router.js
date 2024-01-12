import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootParent from "./roots/RootParent";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Signup/Signup";
import RootSidebar from "./roots/RootSidebar";
import RootHome from "./roots/RootHome";
import PostModal from "./pages/PostModal/PostModal";
import RootProfile from "./roots/RootProfile";
import EditProfile from "./pages/EditProfile/EditProfile";
import ManagePost from "./pages/ManagePost/ManagePost";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootParent />,
      children: [
        { index: true, element: <Login /> },
        { path: "signup", element: <Signup /> },
        {
          path: "twind",
          element: <RootSidebar />,
          children: [
            {
              path: "/twind",
              element: <RootHome />,
              children: [{ path: "p/:postId", element: <PostModal /> }],
            },
            { path: "create", element: <ManagePost /> },
            { path: "edit/:postId", element: <ManagePost /> },
            {
              path: ":username",
              element: <RootProfile />,
              children: [
                {
                  path: "p/:postId",
                  element: <PostModal />,
                },
              ],
            },
            { path: "edit-profile", element: <EditProfile /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
