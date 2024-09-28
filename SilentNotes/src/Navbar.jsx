import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoutBox from "./loginAndRegister/LogoutBox";
import RippleButton from "./RippleButton/RippleButton";
import axios from "axios";
import { getUserDetails } from "./Redux/UserDetailsReducer";
import "./animations.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userdetailsStatus = useSelector((state) => state.userdetails.status);
  const emailVerified = useSelector((state) => state.userdetails.verified);
  const avatar = useSelector((state) => state.userdetails.avatar);
  const [showLogout, setShowLogout] = useState(false);

  const avatarContainer = useRef();

  useEffect(() => {
    dispatch(getUserDetails())
  }, []);

  return (
    <nav className="z-30 flex items-center justify-between h-16 shadow-xl w-screen fixed top-0 bg-primary">
      <span className="h-12 w-12 ml-6 flex items-center">
        <img src="https://img.icons8.com/?size=100&id=tNHdLq0L6260&format=png&color=000000" />
        <span
          style={{ textShadow: "2px 1px 0px #E07A5F" }}
          className="text-secondary font-bold text-lg"
        >
          SilentNotes
        </span>
      </span>

      <span className="flex gap-4 items-center">
        {userdetailsStatus === 1 && !emailVerified && (
          <RippleButton
            value={"Get OTP"}
            onClick={() => {
              axios({
                url: `${import.meta.env.VITE_BACKEND}/otp/`,
                method: "GET",
                withCredentials: true,
              });
              navigate("/auth/otp");
            }}
          />
        )}
        {userdetailsStatus === 1 && (
          <span
            ref={avatarContainer}
            onClick={() => setShowLogout(true)}
            className=" rounded-full bg-secondary cursor-pointer size-14 overflow-hidden mr-6 flex items-center"
          >
            <img src={avatar} />
          </span>
        )}
        {userdetailsStatus === -1 && (
          <RippleButton
            value="Login"
            style={{ marginRight: "1rem", fontWeight: "800" }}
            onClick={() => navigate("/auth/login")}
          />
        )}

        {userdetailsStatus === 0 && (
          <span className="relative rounded-full bg-slate-300 cursor-pointer size-14 overflow-hidden mr-6 flex items-center">
            <span
              style={{ animationDuration: "1s" }}
              className="tiltedMovingLineAnimtation inline-block absolute w-48 h-6 bg-slate-50"
            ></span>
          </span>
        )}
      </span>

      {showLogout && (
        <LogoutBox
          setShowLogout={setShowLogout}
          avatarContainer={avatarContainer}
        />
      )}
    </nav>
  );
};

export default Navbar;
