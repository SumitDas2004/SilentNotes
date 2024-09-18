import { ToastContainer } from "react-toastify";
import LoginRegisterIndex from "./loginAndRegister/LoginRegisterIndex";
import "react-toastify/dist/ReactToastify.css";
import FeedPage from "./FeedPage/FeedPage";
import CreatePost from "./CreateFeedPage/CreatePost";
import PostDetails from "./FeedPage/PostDetails";
import Navbar from "./Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import en from "javascript-time-ago/locale/en"
import TimeAgo from "javascript-time-ago";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage />,
    children: [
      {
        path: "/post/create",
        element: <CreatePost />,
      },
      {
        path: "/sign-in",
        element: <LoginRegisterIndex />,
      },
    ],
  },
  {
    path: "/post/details/:id",
    element: <PostDetails />,
  },
]);

function App() {
  TimeAgo.addDefaultLocale(en)
  
  return (
    <>
      <Navbar />
      <section className="selection:bg-accent selection:text-white py-16 overflow-y-auto bg-secondary h-screen w-full flex flex-col items-center">
        <RouterProvider router={router} />
        <ToastContainer
          theme="colored"
          position="top-right"
          newestOnTop={true}
        />
      </section>
    </>
  );
}

export default App;

export {router}
