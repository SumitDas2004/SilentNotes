import React, { useRef, useState } from "react";
import RippleButton from "../RippleButton/RippleButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../CreateFeedPage/ContentEditableDivPlaceholder.css"
import { ClipLoader } from "react-spinners";

export const PostDetailsFooter = ({ postId }) => {
  const inputField = useRef();
  const navigate = useNavigate();
  const [isCommenting, setIsCommenting] = useState(false)

  return (
    <footer className=" items-center cursor-auto w-full h-max flex justify-center bg-primary fixed bottom-0 left-0 z-10">
      <div
        ref={inputField}
        contentEditable={true}
        data-placeholder-value="Add comments..."
        className="contentEditableDivPlaceHolder text-sm my-3 mx-1 sm:mx-4 outline-none text-wrap whitespace-pre overflow-y-auto text-md px-3 py-2 rounded-md text-textcolor w-[80%] max-w-[600px] max-h-20 bg-white"
      ></div>
      <RippleButton
        value={!isCommenting?"Comment":<ClipLoader size={20} color="white"/>}
        style={{ marginRight: "10px", width:"100px" }}
        onClick={async() => {
          if(isCommenting)return ;
          setIsCommenting(true)
          try{
          if(!inputField.current.innerText.trim()){
            toast.warn("Comment can't be empty.")
            return ;
          }
          const body = inputField.current.innerText.trim()
          inputField.current.innerText = ""
          await axios({
            url: import.meta.env.VITE_BACKEND + "/comment/",
            method: "POST",
            withCredentials: true,
            "Content-type": "application/json",
            data: {
              postId: postId,
              body: body,
            },
          })
          setIsCommenting(false)
          toast.success("Added comment successfully.")
        }catch(err){
            if(err.response.status===401)navigate("/sign-in")
            toast.error((err.response && err.response.data && err.response.data.error) || "Something went wrong.")
          }
        }}
      />
    </footer>
  );
};