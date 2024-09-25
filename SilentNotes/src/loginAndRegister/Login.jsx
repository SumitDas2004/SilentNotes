import React, { useState } from "react";

import "./CustomInputField/CustomInputPlaceholderStyle.css";
import CustomInputField from "./CustomInputField/CustomInputField";
import RippleButton from "../RippleButton/RippleButton";
import { toast } from "react-toastify";
import axios from "axios";;
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "../animations.css"


const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  return(
    <div className="-z-10 h-full formZoomInAnimation max-h-[450px] rounded-md relative w-full max-w-[500px] bg-white flex flex-col justify-evenly items-center">
      <span className='flex text-gray-400 text-2xl top-4 right-4 absolute cursor-pointer' onClick={()=>navigate("/")}><i className="fa-solid fa-xmark"></i></span>
      <span className="text-4xl font-bold text-accent">Login</span>
      <CustomInputField placeholder={"Username"} inputFieldState={username} setInputFieldState={setUsername}/>
      <CustomInputField placeholder={"Password"} isPassword={true} inputFieldState={password} setInputFieldState={setPassword} />
      <RippleButton value={!isLoggingIn?"Login":<ClipLoader size="20px" color="white"/>} onMouseDown={()=>{
        if(!username)toast.warn("Username is empty.")
        else if(!password)toast.warn("Password is empty.")
        else{
          setIsLoggingIn(true)
          axios({
            withCredentials:true,
            url:import.meta.env.VITE_BACKEND+"/user/login",
            method:"POST",
            "Content-type":"application/json",
            data:{
              username:username,
              password:password
            }
          }).then(({data})=>{
            toast.success(data.message)
            navigate("/")
            window.location.reload()
            setIsLoggingIn(false)
          }).catch(({response})=>{
            setIsLoggingIn(false)
            toast.error(response.data.error || "Something went wrong.")
          })
        }
      }}/>
      <span><span>New to SilentNotes?</span><button className="text-accent font-bold ml-1 hover:underline" onClick={()=>navigate("/auth/register")}>Register</button></span>
    </div>
  );
};

export default Login;
