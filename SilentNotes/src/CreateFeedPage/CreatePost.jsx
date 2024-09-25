import React, { lazy, useEffect, useRef, useState } from "react";
import "./ContentEditableDivPlaceholder.css";
import "../animations.css";
import RippleButton from "../RippleButton/RippleButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { ClipLoader } from "react-spinners";
import Picker from "@emoji-mart/react";

const CreatePost = () => {
  const username = useSelector((state) => state.userdetails.username);
  const navigate = useNavigate();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isInputSelected, setIsInputSelected] = useState();
  const [isPosting, setIsPosting] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
  const bodyRef = useRef();
  const containerRef = useRef();
  const inputRef = useRef();
  const smileButton = useRef();
  const emojiPalateContainer = useRef();

  useEffect(() => {
    if (!username) navigate("/auth/login");
    containerRef.current.addEventListener("mousedown", (e) => {
      if (bodyRef.current && !bodyRef.current.contains(e.target)) navigate("/");
    });
  }, []);

  const checkIfEmojiPalateOrButtonIsClicked = (e) => {
    if (
      !emojiPalateContainer.current.contains(e.target) &&
      !smileButton.current.contains(e.target)
    )
      setShowEmoji(false);
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("mousedown", checkIfEmojiPalateOrButtonIsClicked)
    }
    return ()=>document.removeEventListener("mousedown", checkIfEmojiPalateOrButtonIsClicked)
  }, [showEmoji]);

  return (
    <div
      ref={containerRef}
      className="bg-[rgba(0,0,0,0.64)] fixed right-0 z-10 top-0 h-screen w-full flex justify-center items-center "
    >
      <div
        ref={bodyRef}
        className=" max-w-[850px] bg-white w-11/12 h-[31rem] rounded-md border border-gray-400 flex flex-col justify-between px-4 text-justify"
      >
        <div className=" h-16 w-full flex items-center justify-center flex-col">
          <span className="flex gap-1 self-end">
            <span
              title="Bold (ctrl+b)"
              onMouseDown={(e) => {
                if (!isInputSelected) return;
                e.preventDefault();
                document.execCommand("bold");
                setIsBold(document.queryCommandState("bold"));
              }}
              className={` ${
                isBold ? "text-blue-500" : "text-gray-700"
              } buttonDataShakeAnimation hover:bg-gray-100 transition-all rounded-sm  h-7 w-7 active:text-blue-600 flex justify-center items-center cursor-pointer`}
            >
              <i className="fa-solid fa-bold"></i>
            </span>
            <span
              title="Itailc (ctrl+i)"
              onMouseDown={(e) => {
                if (!isInputSelected) return;
                e.preventDefault();
                document.execCommand("italic");
                setIsItalic(document.queryCommandState("italic"));
              }}
              className={`${
                isItalic ? "text-blue-500" : "text-gray-700"
              } buttonDataShakeAnimation hover:bg-gray-100 transition-all rounded-sm  h-7 w-7 active:text-blue-600 flex justify-center items-center cursor-pointer`}
            >
              <i className="fa-solid fa-italic"></i>
            </span>
            <span
              title="Underline (ctrl+u)"
              onMouseDown={(e) => {
                if (!isInputSelected) return;
                e.preventDefault();
                document.execCommand("underline");
                setIsUnderline(document.queryCommandState("underline"));
              }}
              className={`${
                isUnderline ? "text-blue-500" : "text-gray-700"
              } buttonDataShakeAnimation hover:bg-gray-100 transition-all rounded-sm  h-7 w-7 active:text-blue-600 flex justify-center items-center cursor-pointer`}
            >
              <i className="fa-solid fa-underline"></i>
            </span>

            <span
              title="Close"
              onClick={() => {
                navigate("/");
              }}
              className="text-lg buttonDataShakeAnimation hover:bg-gray-100 transition-all rounded-sm  h-7 w-7 active:text-blue-600 flex justify-center items-center cursor-pointer text-gray-700"
            >
              <i className=" fa-solid fa-close"></i>
            </span>
          </span>
        </div>
        <div
          ref={inputRef}
          onMouseOver={(e) => (e.target.contentEditable = true)}
          onFocus={() => setIsInputSelected(true)}
          onBlur={() => setIsInputSelected(false)}
          data-placeholder-value="Share your thoughts here..."
          className="contentEditableDivPlaceHolder text-lg overflow-y-auto relative z-10 outline-none createFeedInput h-[21rem] text-wrap whitespace-pre text-gray-800"
          onKeyUp={(e) => {
            if (e.key === "b" || e.key === "B")
              setIsBold(document.queryCommandState("bold"));
            if (e.key === "i" || e.key === "I")
              setIsItalic(document.queryCommandState("italic"));
            if (e.key === "u" || e.key === "U")
              setIsUnderline(document.queryCommandState("underline"));
          }}
        ></div>
        <div className=" relative h-16 w-full flex justify-between items-center z-40">
          {showEmoji && (
            <div
              ref={emojiPalateContainer}
              className=" z-30 absolute bottom-0 shadow-lg"
            >
              <Picker
              theme={"light"}
              
                onEmojiSelect={(emoji, event) => {
                  event.preventDefault()
                  document.execCommand('insertText', false, emoji.native)
                }}
              />
            </div>
          )}
          <span
            ref={smileButton}
            onMouseDown={(e) => {
              e.preventDefault();
              setShowEmoji(true);
            }}
            className="text-2xl relative text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <i
              onMouseDown={(e) => e.preventDefault()}
              className="fa-regular fa-face-smile"
            ></i>
          </span>
          <RippleButton
            value={isPosting ? <ClipLoader size="20px" color="white" /> : "Post"}
            style={{
              fontWeight: "800",
              background: "rgb(59 130 246 /1)",
              borderRadius: "100px",
              width: "70px",
              fontSize: "1.15rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              let data = inputRef.current.innerHTML;
              if (data.length >= 100000) {
                toast.error("The post is too large.");
                return;
              }
              if (isPosting) return;
              setIsPosting(true);

              axios({
                withCredentials: true,
                url: import.meta.env.VITE_BACKEND + "/post/",
                method: "POST",
                "Content-type": "application/json",
                data: {
                  body: DOMPurify.sanitize(data.trim(), {
                    ADD_ATTR: ["target", "className"],
                    FORBID_ATTR: ["style"],
                  }),
                },
              })
                .then(({ data }) => {
                  setIsPosting(false);
                  toast.success(data.message);
                  navigate("/");
                })
                .catch(({ response }) => {
                  setIsPosting(false);
                  if (response.status === 401) navigate("/auth/login");
                  toast.error(response.data.error || "Something went wrong.");
                });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
