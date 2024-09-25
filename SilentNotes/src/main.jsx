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
import { ScrollRestoration } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration
          getKey={(location, matches) => {
            return location.pathname;
          }}
        />
        <Navbar />
        <App />
      </>
    ),
    children: [
      {
        path: "/",
        element: <FeedPage />,
        children: [
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
          },
          {
            path: "/post/create",
            element: <CreatePost />,
          },
        ],
      },
      {
        path: "/post/details/:id",
        element: <PostDetails />,
      },
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
