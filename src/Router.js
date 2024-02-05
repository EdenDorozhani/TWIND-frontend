import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Signup/Signup";
import PostModal from "./pages/PostModal/PostModal";
import EditProfile from "./pages/EditProfile/EditProfile";
import ManagePost from "./pages/ManagePost/ManagePost";
import ChangePassword from "./pages/ChangePassword";
import RootApp from "./routerRoots/RootApp";
import RootSidebar from "./routerRoots/RootSidebar";
import RootHome from "./routerRoots/RootHome";
import RootProfile from "./routerRoots/RootProfile";
import RootExplore from "./routerRoots/RootExplore";
import ErrorPage from "./pages/RouteError/RouteError";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <RootApp />,
      children: [
        { index: true, element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "resetPassword", element: <ChangePassword /> },
        { path: "error", element: <ErrorPage /> },
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
            {
              path: "explore",
              element: <RootExplore />,
              children: [{ path: "p/:postId", element: <PostModal /> }],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
