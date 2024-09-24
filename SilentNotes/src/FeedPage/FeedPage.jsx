import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import "../animations.css";
import Navbar from "../Navbar";



const FeedPage = () => {
  const navigate= useNavigate()
  const userId = useSelector((state) => state.userdetails.id);
  const userdetailsStatus = useSelector((state) => state.userdetails.status);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const pageNumber = useRef(0);
  const marker = useRef();

  const getFeed = useCallback( async () => {
    try {
      setIsLoading(true)
      const { data } = await axios({
        url:
          import.meta.env.VITE_BACKEND +
          `/post/feed?pageNumber=${pageNumber.current}&pageSize=10 ${
            userId && "&userId=" + userId
          }`,
        method: "GET",
      });
      setPosts((posts) => {
        const set = new Set(posts.map(post=>post.id))
        const newPosts = data.data
        const newState = [...posts]
        newPosts.forEach(post=>{
          if(!set.has(post.id))newState.push(post);
        })
        return newState
      });
      if (data.data.length > 0) pageNumber.current = pageNumber.current + 1;
      setIsLoading(false)
    } catch ({ response }) {
      toast.error(response.data.error || "Something went wrong");
      setIsLoading(false)
    }
  }, [userdetailsStatus])

  useEffect(() => {
    let observer = null;
    if (userdetailsStatus !== 0) {
      observer = new IntersectionObserver(() => {
        getFeed();
        getFeed();
      });
      observer.observe(marker.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [userdetailsStatus]);

  return (
    <span className="w-full flex justify-center ">
      <Outlet />

      <span className=" lg:w-3/5 w-full flex flex-col items-center justify-center">
        {posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
        <div ref={marker} className="mt-4"></div>
        {isLoading && (
          <>
            <LoadingPost />
            <LoadingPost />
          </>
        )}
      </span>
      <Footer />
      <section className="fixed right-0 h-full w-1/5 justify-start lg:flex hidden">
        <div onClick={()=>navigate("/post/create")} className="flex justify-center text-center w-11/12 items-center px-4 rounded-full bg-white h-16 mt-10 border-2 border-slate-300 text-gray-800 cursor-pointer">
          <span className="w-10 h-10 mr-2 rounded-full border-4 flex justify-center items-center text-2xl text-accent border-accent"><i className="fa-solid fa-plus"></i></span>Start writing a post</div>
      </section>
    </span>
  );
};

export default FeedPage;





const LoadingPost = () => {
  return (
    <div className=" transition-all cursor-pointer relative border border-gray-400 hover:shadow-md hover:shadow-[#0000003a] rounded-xl my-4 w-[95%] max-w-[700px] bg-white px-3 py-8 h-min text-textcolor">
      <span className="flex items-center">
        {/* Avatar */}
        <span className="relative bg-slate-300 rounded-full min-h-14 min-w-14 overflow-hidden inline-block">
          <span
            style={{ animationDuration: "1s" }}
            className="tiltedMovingLineAnimtation inline-block bg-slate-50 w-36 h-6"
          ></span>
        </span>
        <span className="flex flex-col">
          {/* College name */}
          <span className="overflow-hidden relative bg-gray-300 inline-block rounded-full w-48 h-6 font-semibold text-base ml-1 break-all">
            <span
              style={{ animationDuration: "1s" }}
              className="tiltedMovingLineAnimtation inline-block bg-slate-50
               w-36 h-6"
            ></span>
          </span>
          <span className="overflow-hidden relative w-20 h-4 mt-1 ml-1 text-sm bg-slate-300 rounded-full inline-block ">
            <span
              style={{ animationDuration: "1s" }}
              className="tiltedMovingLineAnimtation inline-block bg-slate-50 w-36 h-6"
            ></span>
          </span>
        </span>
      </span>
      <div className="relative overflow-hidden break-all mt-4 bg-slate-300 w-full h-20 rounded-lg">
        <span
          style={{ animationDuration: "1.5s" }}
          className="tiltedMovingLineAnimtation inline-block bg-slate-50  w-60 h-16"
        ></span>
      </div>
      <span className="mt-4 text-sm flex">
        <span
          className={`relative overflow-hidden h-4 w-8 bg-slate-300 flex active:text-accent transition-all py-1 px-2 rounded-full`}
        ></span>
        <span className="h-4 w-8 mx-2 bg-slate-300 active:text-accent transition-all py-1 px-2 rounded-full"></span>
        <span className="h-4 w-8 bg-slate-300 active:text-accent transition-all py-1 px-2 rounded-full"></span>
      </span>
    </div>
  );
};
