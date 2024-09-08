import React, { useEffect, useState } from "react";

import "./CustomInputField/CustomInputPlaceholderStyle.css";
import CustomInputField from "./CustomInputField/CustomInputField";
import RippleButton from "../RippleButton/RippleButton";
import { toast } from "react-toastify";
import axios from "axios";;
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


const Login = ({setIsPasswordFieldActive}) => {
  const navigate = useNavigate();

  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(()=>{
    setIsPasswordFieldActive(false)
  }, [])
  return(
    <span className="formZoomInAnimation w-full h-max flex flex-col justify-center items-center">
      <CustomInputField placeholder={"Username"} inputFieldState={username} setInputFieldState={setUsername}/>
      <CustomInputField placeholder={"Password"} isPassword={true} functionOnFocusOrBlur={setIsPasswordFieldActive} inputFieldState={password} setInputFieldState={setPassword} />
      <RippleButton value={!isLoggingIn?"Login":<ClipLoader size="20" color="white"/>} onMouseDown={()=>{
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
    </span>
  );
};

export default Login;
