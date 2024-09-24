import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedPage from "./FeedPage/FeedPage";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { useEffect } from "react";
import Navbar from "./Navbar";


function App() {
  useEffect(()=>{
    TimeAgo.addDefaultLocale(en); 
  }, [])

  return (
    <>
      <Navbar/>
      <section className="selection:bg-accent selection:text-white py-16 overflow-y-auto bg-secondary h-screen w-full flex flex-col items-center">
        <ToastContainer
          theme="colored"
          position="top-right"
          newestOnTop={true}
        />
        <FeedPage/>
      </section>
    </>
  );
}

export default App;
