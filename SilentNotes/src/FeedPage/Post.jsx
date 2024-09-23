import React, { memo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import "../animations.css";
import "./linkStyle.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ReactTimeAgo from "react-time-ago";



const Post = ({ data }) => {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userdetails.id);

  const [isLiked, setIsLiked] = useState(data.liked);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(data.likes);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) view(data.id);
    },
    triggerOnce: true,
  });

  const throttleSeed = useRef(false);

  return (
    <div
      onClick={() =>
        navigate("/post/details/"+data.id, {
          state: { ...data, likes: likes, liked: isLiked, views: data.views },
        })
      }
      ref={ref}
      className=" transition-all cursor-pointer relative border border-gray-400 hover:shadow-md hover:shadow-[#0000003a] rounded-xl my-4 w-[95%] max-w-[800px] bg-white px-3 py-8 h-min text-textcolor"
    >
      <span className="flex items-center">
        <span className="min-h-14 min-w-14 overflow-hidden inline-block rounded-full">
          <img src={data.avatar} />
        </span>
        <span className="flex flex-col">
          <span>
            <a
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              href={"https://" + data.collegeDomain}
            >
              <span className="hover:underline underline-offset-2 inline-block font-semibold text-base h-max break-all">
                {data.college}
              </span>
            </a>
          </span>
          <span className="">
          <span className="text-sm mr-2">{data.username}</span>
          <span className=" text-xs text-slate-500">
            <ReactTimeAgo date={new Date(data.createdAt)} locale="en-US" />
          </span></span>
        </span>
      </span>
      <div
        className="break-all mt-4 text-sm"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.body.substring(0, 400), {
            ADD_ATTR: ["target", "className"],
          }),
        }}
      ></div>
      {data.body.length>400 && <span className="text-sm text-blue-500 hover:underline">see more...</span>}
      <span className="mt-4 text-sm flex">
        <span
          onClick={async (e) => {
            e.stopPropagation();
            setIsLiked(false);
            try {
              if (!throttleSeed.current) {
                setLiking(true);
                throttleSeed.current = true;
                if (!userId) {
                  navigate("/auth/login");
                  return;
                }
                const res = await axios({
                  url:
                    import.meta.env.VITE_BACKEND +
                    `/like/post?postId=${data.id}&userId=${userId}`,
                  method: "POST",
                  withCredentials: true,
                });
                setLikes((likes) => likes + res.data.event);
                setIsLiked(res.data.event == 1);
                throttleSeed.current = false;
                setLiking(false);
              }
            } catch (err) {
              console.log(err);
              toast.error(
                (err && err.response && response.data.error) ||
                  "Something went wrong."
              );
              throttleSeed.current = false;
              setLiking(false);
            }
          }}
          className={`${
            isLiked ? "text-accent" : ""
          } flex buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full`}
        >
          <span className="w-5 flex items-center justify-center">
            {!isLiked ? (
              <i
                className={` ${
                  liking && "heartBeatAnimation"
                } fa-regular fa-heart mr-1`}
              ></i>
            ) : (
              <img src="https://img.icons8.com/papercut/15/like.png" />
            )}
          </span>
          <span className="">{likes}</span>
        </span>
        <span className="buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full">
          <span>
            <i className=" cursor-pointer fa-regular fa-message mr-1"></i>
          </span>
          <span>{data.comments}</span>
        </span>
        <span className="buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full">
          <span>
            <i className=" cursor-pointer fa-regular fa-eye mr-1"></i>
          </span>
          <span>{data.views}</span>
        </span>
      </span>
    </div>
  );
};

export default memo(Post);

const view = (id) => {
  fetch(import.meta.env.VITE_BACKEND + "/post/view/" + id, {
    method:"POST",
    keepalive:true
  })
};
