import React, { useEffect, useRef, useState } from "react";
import RippleButton from "../RippleButton/RippleButton";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const LogoutBox = ({ setShowLogout, avatarContainer }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate()

  const logoutEvent = (e) => {
    if (
      !ref.current.contains(e.target) &&
      !avatarContainer.current.contains(e.target)
    )
      setShowLogout(false);
  };

  useEffect(() => {
    document.addEventListener("click", logoutEvent);
    return () => document.removeEventListener("click", logoutEvent);
  }, []);

  const ref = useRef();
  return (
    <div
      ref={ref}
      className="curtainDownAnimationClass overflow-hidden flex justify-center items-center h-32 w-60 bg-slate-50 shadow-md shadow-[#00000048] rounded-lg absolute right-6 top-16 mt-1"
    >
      <RippleButton
        value={loggingOut?<ClipLoader color="white" size={"20px"}/>:"Logout"}
        onClick={() => {
          if(loggingOut)return ;
          setLoggingOut(true)
          axios({
            url: import.meta.env.VITE_BACKEND + "/user/logout",
            withCredentials: true,
          }).then((res) => {
            setLoggingOut(false)
            navigate("/");
            window.location.reload();
          }).catch(()=>{
            setLoggingOut(false)
          })
        }}
      />
    </div>
  );
};

export default LogoutBox;
