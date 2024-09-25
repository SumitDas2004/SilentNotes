import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  return (
    <section className="selection:bg-accent selection:text-white pt-16 h-screen w-full flex flex-col items-center">
      <ToastContainer theme="colored" position="top-right" newestOnTop={true} />
      <Outlet />
    </section>
  );
}

export default App;
