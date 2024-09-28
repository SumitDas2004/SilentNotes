import axios from "axios";
import { memo, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../animations.css";
import "../CreateFeedPage/ContentEditableDivPlaceholder.css";
import Reply from "./Reply";
import DOMPurify from "dompurify";
import ReactTimeAgo from "react-time-ago";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

const Comment = ({ data }) => {
  const navigate = useNavigate();
  const {
    id: userId,
    avatar,
    collegeName,
    username,
    collegeDomain,
  } = useSelector((state) => state.userdetails);

  const [likes, setLikes] = useState(data.totalLikes);
  const [isLiked, setIsLiked] = useState(data.liked);
  const [liking, setLiking] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [cursor, setCursor] = useState({
    lastId:"{",
    lastCreatedAt:new Date().toJSON()
  });
  const [loadedReplies, setLoadedReplies] = useState(0);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchReplies = useCallback(() => {
    setLoadingReplies(true);
    getReplies(data, cursor, userId)
      .then(({ data }) => {
        setReplies((replies) => {
          const set = new Set(replies.map((reply) => reply.id));
          const newReplies = data.data;
          const newState = [...replies];
          newReplies.forEach((reply) => {
            if (!set.has(reply.id)) newState.push(reply);
          });
          if (newReplies.length>0) 
            setCursor({
              lastCreatedAt:newReplies[newReplies.length-1].createdAt,
              lastId:newReplies[newReplies.length-1].id
            })
          setLoadedReplies(loadedReplies + newReplies.length);
          return newState;
        });
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          navigate("/auth/login");
          toast.info("Hey! join the discussion here.");
        } else
          toast.error(
            (response && response.data && response.data.error) ||
              "Something went wrong"
          );
      })
      .finally(() => {
        setLoadingReplies(false);
      });
  }, [replies, cursor, loadedReplies]);

  return (
    <section>
      <span className="flex flex-row mt-4 ml-2 w-full">
        <div className=" min-h-9 min-w-9 overflow-hidden mr-2">
          <img src={data.userAvatar} />
        </div>
        <div className=" w-full mr-4">
          <div className=" bg-gray-100 rounded-lg py-2 px-4">
            {/* Top bar container */}
            <span className="flex flex-wrap flex-row text-gray-600 items-center">
              <span className="hover:underline underline-offset-2 inline-block font-semibold text-xs h-max break-all">
                <a target="_blank" href={"https://" + data.collegeDomain}>
                  {data.userCollege}
                </a>
              </span>
              {/* Seperator */}
              <span className="text-[0.3rem] flex justify-center items-center mx-1">
                <i className="fa-solid fa-circle"></i>
              </span>
              <span className="text-xs flex justify-center items-center h-full">
                {data.username}
              </span>
              {/* Seperator */}
              <span className="text-[0.3rem] flex justify-center items-center mx-1">
                <i className="fa-solid fa-circle"></i>
              </span>
              <span className="text-xs flex justify-center items-center h-full">
                <ReactTimeAgo date={new Date(data.createdAt)} locale="en-US" />
              </span>
            </span>
            <div
              className="mt-2 break-all"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.body.substring(0, 400), {
                  ADD_ATTR: ["target", "className"],
                }),
              }}
            ></div>
          </div>
          <span className="mt-1 ml-1 flex">
            <span
              onClick={async () => {
                try {
                  setIsLiked(false);
                  setLiking(true);
                  const res = await axios({
                    url:
                      import.meta.env.VITE_BACKEND + `/like/comment/${data.id}`,
                    method: "POST",
                    withCredentials: true,
                  });
                  setLikes((likes) => likes + res.data.event);
                  setIsLiked(res.data.event == 1);
                  setLiking(false);
                } catch ({ response }) {
                  if (response.status === 401) {
                    navigate("/auth/login");
                    toast.info("Hey! join the discussion here.");
                  } else
                    toast.error(
                      (response && response.data && response.data.error) ||
                        "Something went wrong"
                    );
                }
              }}
              className="text-sm buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full flex "
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
              <span>{likes}</span>
            </span>
            |{/* Reply button */}
            <button
              onClick={() => setShowReplyBox(true)}
              className="text-sm buttonDataShakeAnimation active:text-accent hover:bg-gray-100 transition-all py-1 px-2 rounded-full"
            >
              <span className="font-semibold">Reply</span>
            </button>
          </span>
          {showReplyBox && (
            <ReplyInput
              commentId={data.id}
              setShowReplyBox={setShowReplyBox}
              userId={userId}
              avatar={avatar}
              collegeName={collegeName}
              username={username}
              setReplies={setReplies}
              collegeDomain={collegeDomain}
            />
          )}
          {replies.map((reply, ind) => (
            <Reply key={ind} data={reply} />
          ))}
          {/* Show replies button */}
          {replies.length < data.replyCount && (
            <span
              onClick={fetchReplies}
              className="text-blue-500 flex justify-start px-4 hover:text-accent items-center text-xs"
            >
              Show {data.replyCount - loadedReplies} replies
            </span>
          )}
          {/* Reply loader */}
          {loadingReplies && (
            <span className="flex justify-center items-cente">
              <ClipLoader color="gray" size={"25px"} />
            </span>
          )}
        </div>
      </span>
    </section>
  );
};

export default memo(Comment);

const ReplyInput = ({
  commentId,
  setShowReplyBox,
  setReplies,
  userId,
  avatar,
  collegeName,
  username,
  collegeDomain,
}) => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isReplying, setIsReplying] = useState(false);
  return (
    <span className="my-2 flex flex-col w-full">
      <div
        ref={inputRef}
        contentEditable
        data-placeholder-value="Add reply..."
        className="cursor-text contentEditableDivPlaceHolder px-4 py-2 rounded-md text-sm break-all text-justify overflow-y-auto border-2 box-border outline-none border-gray-400 max-h-80"
      ></div>
      <button
        onClick={() => {
          setIsReplying(true);
          const data = {
            body: DOMPurify.sanitize(inputRef.current.innerHTML.trim(), {
              FORBID_ATTR: [
                "src",
                "style",
                "href",
                "onClick",
                "class",
                "className",
              ],
              FORBID_TAGS: ["b", "i", "u", "a", "button"],
            }),
            commentId,
          };
          reply(data)
            .then((res) => {
              toast.success("Reply added successfully.");
              setShowReplyBox(false);
              const id = res.data.id;
              setReplies((replies) => [
                {
                  id,
                  ...data,
                  likeCnt: 0,
                  liked: false,
                  createdAt: Date.now(),
                  userId,
                  avatar,
                  college: collegeName,
                  username,
                  collegeDomain,
                },
                ...replies,
              ]);
              setIsReplying(false);
            })
            .catch(({ response }) => {
              if (response && response.status && response.status === 401) {
                navigate("/auth/login");
                toast.info("Hey! join the discussions here.");
              } else
                toast.error(
                  (response && response.data && response.data.error) ||
                    "Something went wrong"
                );

              setIsReplying(false);
            });
        }}
        className=" self-end text-sm p-1 text-blue-500 font-bold right-0 mr-2 focus:text-blue-700 active:text-blue-700 transition-all"
      >
        {!isReplying ? (
          "Post"
        ) : (
          <ClipLoader color="rgb(59 130 246 / 1)" size={"25px"} />
        )}
      </button>
    </span>
  );
};

const getReplies = async (data, cursor, userId) => {
  const res = await axios({
    url: import.meta.env.VITE_BACKEND + `/comment/reply/get?pageSize=5`,
    method: "POST",
    data: {
      commentId: data.id,
      userId: userId,
      lastId: cursor.lastId,
      lastCreatedAt: cursor.lastCreatedAt,
    },
  });
  return res;
};

const reply = async (data) => {
  const res = await axios({
    url: import.meta.env.VITE_BACKEND + `/comment/reply`,
    method: "POST",
    withCredentials: true,
    data: data,
  });
  return res;
};
