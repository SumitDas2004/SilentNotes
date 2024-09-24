import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import CreatePost from "./CreateFeedPage/CreatePost.jsx";
import LoginRegisterIndex from "./loginAndRegister/LoginRegisterIndex.jsx";
import Login from "./loginAndRegister/Login.jsx";
import Register from "./loginAndRegister/Register/Register.jsx";
import OTPValidation from "./loginAndRegister/OTPValidation.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostDetails from "../src/FeedPage/PostDetails.jsx";
import FeedPage from "./FeedPage/FeedPage.jsx";
import Navbar from "./Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
    children: [
      {
        path: "/",
        element: <FeedPage />,
      },
      {
        path: "/post/details/:id",
        element: <PostDetails />,
      },
      {
        path: "/post/create",
        element: <CreatePost />,
      },
      {
        path: "/auth",
        element: <LoginRegisterIndex />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/otp",
            element: <OTPValidation />,
          },
        ],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
