import React, { useRef, useState } from "react";
import "./CustomInputPlaceholderStyle.css";

const CustomInputField = ({
  inputFieldState,
  setInputFieldState,
  placeholder,
  isPassword,
  functionOnFocusOrBlur
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const ref = useRef(null)

  const functionOnEyeClick=() => {
    setTimeout(()=>{ref.current.focus()})
    setShowPassword((p) => !p);
  }


  return (
    <span className="inline-block mb-5 w-9/12 relative">
      <input
        autoComplete="true"
        ref ={ref}
        onFocus={() => functionOnFocusOrBlur && functionOnFocusOrBlur(true)}
        onBlur={() => showPassword && functionOnFocusOrBlur && functionOnFocusOrBlur(false)}
        onChange={(e) => setInputFieldState(e.target.value)}
        value={inputFieldState}
        required
        style={{ boxShadow: "0px 2px #E07A5F" }}
        type={isPassword && showPassword ? "password" : "text"}
        className=" text-base w-full px-2 outline-none bg-transparent text-textcolor"
      />
      <span className=" duration-300 transition-all placeholder px-3 left-0 absolute -z-10 text-gray-400">
        {placeholder}
      </span>
      {isPassword && (
        <span
          onMouseDown={functionOnEyeClick}
          className=" cursor-pointer text-gray-500 absolute right-2"
        >
          <i className={`m-full w-full fa-regular fa-${!showPassword ? 'eye-slash' :'eye'}`}></i>
        </span>
      )}
    </span>
  );
};

export default CustomInputField;
