import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../animations.css";
import { fetchPosts, nextPage } from "../Redux/PostsReducer";



const FeedPage = () => {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const userdetailsStatus = useSelector((state) => state.userdetails.status);
  const posts = useSelector(state=>state.posts.posts)  
  const isLoading = useSelector(state=>state.posts.loadingPosts)
  const marker = useRef();

  useEffect(() => {
    let observer = null;
    if (userdetailsStatus !== 0) {
      observer = new IntersectionObserver((elm) => {
        if(elm[0].isIntersecting)
          dispatch(fetchPosts())
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
    <span className="w-full flex justify-center pb-20 ">
      <Outlet />

      <span className=" lg:w-3/5 w-full flex flex-col items-center justify-center">
        {posts.map((post, ind) => (
          <Post key={post.id} data={post} index={ind} />
        ))}
        <div ref={marker} className="mt-4"></div>
        {isLoading && (
          <>
            <LoadingPost />
            {/* <LoadingPost /> */}
          </>
        )}
      </span>
      <Footer />
      <section className=" fixed right-0 h-full w-1/5 justify-start lg:flex hidden">
        <div onClick={()=>navigate("/post/create")} className="flex justify-center text-center w-11/12 items-center px-4 rounded-full bg-white h-16 mt-10 border-2 border-slate-300 text-gray-800 cursor-pointer">
          <span className="w-10 h-10 mr-2 rounded-full border-4 flex justify-center items-center text-2xl text-accent border-accent"><i className="fa-solid fa-plus"></i></span>Start writing a post</div>
      </section>
    </span>
  );
};

export default memo(FeedPage);





const LoadingPost = () => {
  return (
    <div className=" transition-all cursor-pointer relative border border-gray-400 hover:shadow-md hover:shadow-[#0000003a] rounded-xl my-4 w-[95%] max-w-[800px] bg-white px-3 py-8 h-min text-textcolor">
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
