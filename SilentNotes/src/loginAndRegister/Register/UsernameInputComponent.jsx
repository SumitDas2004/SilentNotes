import React from "react";
import AvatarStore from "../AvatarStore";
import CustomInputField from "../CustomInputField/CustomInputField";
import RippleButton from "../../RippleButton/RippleButton";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const UsernameInputComponent = ({
  goToNext,
  isUsernameAvailable,//0 means loading, 1 means available and -1 means not available
  username,
  setUsername,
  setAvatar,
}) => {
  return (
    <span className="formZoomInAnimation w-full h-max flex flex-col justify-center items-center">
      <AvatarStore setPlayerAvatar={setAvatar} />
      <span className="flex justify-center w-10/12 relative">
        <CustomInputField
          placeholder={"Username"}
          setInputFieldState={val=>setUsername(val.trim())}
          inputFieldState={username}
        />
        <span className="h-6 w-6 absolute right-6">
          {isUsernameAvailable == 1 && (
            <img src="https://img.icons8.com/?size=100&id=W9RS5YNuHAdG&format=png&color=40C057" />
          )}
          {isUsernameAvailable == 0 && (
            <ClipLoader size={"1.2rem"} color="gray" />
          )}
          {isUsernameAvailable == -1 && (
            <img src="https://img.icons8.com/?size=100&id=3vXgi59A8WzS&format=png&color=FA5252" />
          )}
        </span>
      </span>
      <span className="w-11/12 inline-block text-xs text-slate-500 text-center">*Choose an username that won't reveal your identity.</span>
      <RippleButton
        value={"Next"}
        onMouseDown={() => {
          if(username.length<3 || username.length>30){
            toast.error("Length of username must be between 3 and 30.");
            return ;
          }
          if(username && isUsernameAvailable===1)
            goToNext();
          else toast.error("Please choose an unique username.")
        }}
      />
    </span>
  );
};

export default UsernameInputComponent;


