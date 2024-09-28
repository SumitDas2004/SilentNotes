import React, { useEffect, useRef, useState } from "react";
import RippleButton from "../RippleButton/RippleButton";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserDetailsReducer";

const LogoutBox = ({ setShowLogout, avatarContainer }) => {
  const dispatch = useDispatch()
  const [loggingOut, setLoggingOut] = useState(false);

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
        onClick={async() => {
          if(loggingOut)return ;
          setLoggingOut(true)
          await dispatch(logout())
          setLoggingOut(false)
          window.location.reload()
        }}
      />
    </div>
  );
};

export default LogoutBox;
