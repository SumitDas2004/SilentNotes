import React, { useEffect, useState } from "react";
import CustomInputField from "./CustomInputField/CustomInputField";
import "./CustomInputField/CustomInputPlaceholderStyle.css";
import RippleButton from "../RippleButton/RippleButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../Redux/UserDetailsReducer";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const OTPValidation = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const verified = useSelector((state) => state.userdetails.verified);
  const [validating, setValidating] = useState();
  useEffect(() => {
    if (verified){
         navigate("/");
         return 
    }
  }, [verified]);
  return (
    <div className="-z-10 formZoomInAnimation h-[300px] rounded-md relative w-full max-w-[500px] bg-white flex flex-col justify-evenly items-center">
      <span
        className="flex text-gray-400 text-2xl top-4 right-4 absolute cursor-pointer"
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-xmark"></i>
      </span>
      <span className="text-3xl font-bold text-accent">Email Verification</span>
      <CustomInputField
        placeholder={"Enter OTP"}
        inputFieldState={otp}
        setInputFieldState={setOtp}
      />
      <RippleButton
        value={!validating ? "Verify" : <ClipLoader size="20px" color="white" />}
        onMouseDown={() => {
          if (otp.length === 6 && isIntString(otp)) {
            setValidating(true);
            axios({
              withCredentials: true,
              url: import.meta.env.VITE_BACKEND + "/otp/validate/" + otp,
              method: "GET",
            })
              .then(({ data }) => {
                const res = data.isValid;
                if (res) {
                  setOtp("");
                  dispatch(validate());
                  toast.success("OTP validated successfully.")
                } else toast.error("Invalid OTP.");
              })
              .catch(({ response }) => {
                toast.error("Something went wrong.");
              })
              .finally(() => {
                setValidating(false);
              });
          } else toast.error("Invalid OTP.");
        }}
      />
      <span className="text-justify mx-2 text-sm text-gray-500 select-none">
        An OTP has been sent to your email id. It is valid for next 10 minutes.
      </span>
    </div>
  );
};

export default OTPValidation;

const isIntString = (str) => {
  for (let i = 0; i < 6; i++) {
    const c = str[i];
    if (c < "0" || c > "9") return false;
  }
  return true;
};
