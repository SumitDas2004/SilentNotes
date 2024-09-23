import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { PostDetailsFooter } from "./PostDetailsFooter";
import Comment from "./Comment";
import ReactTimeAgo from "react-time-ago";
import { ClipLoader } from "react-spinners";

const PostDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const userId = useSelector((state) => state.userdetails.id);
  const userdetailsStatus = useSelector((state) => state.userdetails.status);

  const marker = useRef();

  const [isLiked, setIsLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  const pageNumber = useRef(0);

  const throttleSeed = useRef();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (userdetailsStatus !== 0) {
      axios({
        url:
          import.meta.env.VITE_BACKEND +
          `/post/details?postId=${id}${
            userdetailsStatus === 1 ? "&userId=" + userId : ""
          }`,
        method: "GET",
      })
        .then(({ data }) => {
          setPostDetails(data.data);
          setIsLiked(data.data.liked);
          setLikes(data.data.likes);
        })
        .catch(({ response }) => {
          toast.error(
            (response && response.data.error) || "Something went wrong."
          );
        });
    }
  }, [userdetailsStatus]);

  useEffect(() => {
    let observer = null;
    if (userdetailsStatus !== 0 && postDetails != null) {
      observer = new IntersectionObserver(
        (element) => {
          setLoadingComments(true);
          axios({
            url:
              import.meta.env.VITE_BACKEND +
              `/comment/getAll?postId=${id}&userId=${userId}&pageNumber=${pageNumber.current}&pageSize=5`,
            method: "GET",
          })
            .then(({ data }) => {
              setLoadingComments(false);
              if (data.data.length > 0) pageNumber.current++;
              setComments((comments) => {
                const set = new Set(comments.map((comment) => comment.id));
                const newComments = data.data;
                const newState = [...comments];
                newComments.forEach((comment) => {
                  if (!set.has(comment.id)) newState.push(comment);
                });
                return newState;
              });
            })
            .catch(({ response }) => {
              setLoadingComments(false);
              toast.error(
                (response && response.data.error) || "Something went wrong."
              );
            });
        },
        {
          threshold: 1,
        }
      );
      observer.observe(marker.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [postDetails]);

  return (
    <section className="mb-10 max-w-[700px] transition-all cursor-pointer relative border border-gray-400 hover:shadow-lg rounded-xl my-4 w-[95%] bg-white px-3 py-8 h-min text-textcolor">
      {postDetails === null && (
        <div className="w-full flex justify-center items-center mt-10">
          <ClipLoader color="gray" size="20px" />
        </div>
      )}

      {postDetails !== null && (
        <>
          {" "}
          <span className="flex items-center">
            <span className="min-h-14 min-w-14 overflow-hidden inline-block ">
              <img src={postDetails.avatar} />
            </span>
            <span className="flex flex-col">
              <a target="_blank" href={"https://" + postDetails.collegeDomain}>
                <span className="hover:underline underline-offset-2 inline-block font-semibold text-base h-max break-all">
                  {postDetails.college}
                </span>
              </a>
              <span>
                <span className="text-sm">{postDetails.username}</span>
                <span className="text-xs text-slate-500 ml-2">
                  <ReactTimeAgo
                    date={new Date(postDetails.createdAt)}
                    locale="en-US"
                  />
                </span>
              </span>
            </span>
          </span>
          <div
            className="break-all mt-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postDetails.body, {
                ADD_ATTR: ["target", "className"],
              }),
            }}
          ></div>
          <span className="mt-4 flex text-sm">
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
                        `/like/post?postId=${postDetails.id}&userId=${userId}`,
                      method: "POST",
                      withCredentials: true,
                    });
                    setLikes((likes) => likes + res.data.event);
                    setIsLiked(res.data.event == 1);
                    throttleSeed.current = false;
                    setLiking(false);
                  }
                } catch (err) {
                  toast.error(
                    (err && err.response && err.response.data.error) ||
                      "Something went wrong."
                  );
                  throttleSeed.current = false;
                  setLiking(false);
                }
              }}
              className={`${
                isLiked ? "text-accent" : ""
              } buttonDataShakeAnimation flex active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full`}
            >
              <span className="w-5">
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
              <span>{likes}</span>
            </span>
            <span className="buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full">
              <span>
                <i className=" cursor-pointer fa-regular fa-message mr-1"></i>
              </span>
              <span>{postDetails.comments}</span>
            </span>
            <span className="buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full">
              <span>
                <i className=" cursor-pointer fa-regular fa-eye mr-1"></i>
              </span>
              <span>{postDetails.views}</span>
            </span>
          </span>
        </>
      )}
      {comments.map((element, ind) => (
        <Comment key={ind} data={element} />
      ))}
      {postDetails && <PostDetailsFooter postId={postDetails.id} />}
      <div ref={marker} className="flex justify-center items-center"></div>
      {loadingComments && (
        <>
          <LoadingComments />
          <LoadingComments />
          <LoadingComments />
        </>
      )}
    </section>
  );
};

export default PostDetails;

const LoadingComments = () => {
  return (
    <section>
      <span className="flex flex-row mt-4 ml-2 w-full">
        {/*avater*/}
        <div className="relative overflow-hidden rounded-full h-9 w-9 mr-3 bg-slate-300">
          <span
            style={{ animationDuration: "0.8s" }}
            className="tiltedMovingLineAnimtation inline-block bg-slate-50
               w-36 h-4"
          ></span>
        </div>
        <div className="relative overflow-hidden w-full mr-4 bg-slate-300 rounded-md h-16">
          <span
            style={{ animationDuration: "1.5s" }}
            className="tiltedMovingLineAnimtation inline-block bg-slate-50
               w-60 h-6"
          ></span>
        </div>
      </span>
    </section>
  );
};
