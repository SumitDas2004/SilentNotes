import React from "react";
import CustomInputField from "../CustomInputField/CustomInputField";
import RippleButton from "../../RippleButton/RippleButton";
import { ClipLoader } from "react-spinners";

const PasswordInput = ({registering, setConfirmPasswordActive, setPasswordActive, password, setPassword, setConfirmPassword, confirmPassword, register}) => {
  return (
    <span className="formZoomInAnimation w-full h-max flex flex-col justify-center items-center">
      <CustomInputField
        functionOnFocusOrBlur={(e) => setPasswordActive(e)}
        inputFieldState={password}
        setInputFieldState={(val) => setPassword(val.trim())}
        placeholder={"Password"}
        isPassword={true}
      />
      <CustomInputField
        functionOnFocusOrBlur={(e) => setConfirmPasswordActive(e)}
        inputFieldState={confirmPassword}
        setInputFieldState={(val) => setConfirmPassword(val.trim())}
        placeholder={"Confirm password"}
        isPassword={true}
      />
      <RippleButton value={!registering?"register":<ClipLoader size={20} color="white"/>} onMouseDown={register}/>
    </span>
  );
};

export default PasswordInput;
