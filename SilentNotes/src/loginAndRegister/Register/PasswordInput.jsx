import React from "react";
import CustomInputField from "../CustomInputField/CustomInputField";
import RippleButton from "../../RippleButton/RippleButton";
import { ClipLoader } from "react-spinners";

const PasswordInput = ({registering, password, setPassword, setConfirmPassword, confirmPassword, register}) => {
  return (
    <>
      <CustomInputField
        inputFieldState={password}
        setInputFieldState={(val) => setPassword(val.trim())}
        placeholder={"Password"}
        isPassword={true}
      />
      <CustomInputField
        inputFieldState={confirmPassword}
        setInputFieldState={(val) => setConfirmPassword(val.trim())}
        placeholder={"Confirm password"}
        isPassword={true}
      />
      <RippleButton value={!registering?"register":<ClipLoader size={"20px"} color="white"/>} onMouseDown={register}/>
    </>
  );
};

export default PasswordInput;
