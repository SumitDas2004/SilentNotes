import React from "react";
import { useState, useEffect } from "react";
import Register from "./Register/Register";
import Login from "./Login";
import RippleButton from "../RippleButton/RippleButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Panda = () => {
  const username = useSelector(state=>state.userdetails.username)
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPasswordFieldActive, setIsPasswordFieldActive] = useState(false);
  const [loginOrSignUp, setLoginOrSignUp] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX) / window.innerWidth;
      setCurrentX(x * 30 - 15);
      const y = (e.clientY+100) / window.innerHeight;
      setCurrentY(y * 30 - 15);
    });
  }, []);

  useEffect(() => {
    if (username) navigate("/");
  }, [username]);

  return (
    <div className=" flex-col h-[26rem] w-72 sm:w-96 sm:h-[31rem] flex items-center relative">
      {/* Head */}
      <div
        className={` h-44 w-44 sm:h-52 sm:w-52 bg-white rounded-full relative z-10 flex flex-col items-center`}
      >
        {/* eyes */}
        <div className="flex flex-row mt-2 sm:mt-4 -mb-4">
          {/* left eyes */}
          <div
            style={{ borderRadius: "57% 43% 53% 42% / 47% 47% 50% 50%" }}
            className=" items-center flex  h-16 w-11 sm:h-20 sm:w-14 bg-black rotate-[30deg] mr-5 sm:mr-8 mt-8"
          >
            <span className="sm:ml-4 ml-3 overflow-hidden -rotate-[30deg] flex justify-center items-center mb-2 h-7 w-7 sm:h-9 sm:w-9 bg-white rounded-full">
              <span
                style={{ transform: `translateX(${currentX}px) translateY(${currentY}px)` }}
                className={` bg-black h-5 w-5 rounded-full inline-block`}
              ></span>
            </span>
          </div>
          {/* right eyes */}
          <div
            style={{ borderRadius: "42% 56% 36% 60% / 47% 46% 52% 50%" }}
            className=" items-center flex h-16 w-11 sm:h-20 sm:w-14 bg-black -rotate-[30deg] mt-8"
          >
            <span className="overflow-hidden ml-1 rotate-[30deg] flex justify-center items-center mb-2 h-7 w-7 sm:h-9 sm:w-9 bg-white rounded-full">
              <span
                style={{
                  transform: `translateX(${currentX}px) translateY(${currentY}px)`
                }}
                className={` -rotate-45 bg-black h-5 w-5 rounded-full inline-block`}
              ></span>
            </span>
          </div>
        </div>
        {/* Nose */}
        <span
          style={{ borderRadius: "49% 51% 48% 51% / 32% 36% 56% 59%" }}
          className=" mt-5 sm:mt-3 h-4 sm:h-6 w-8 sm:w-10 bg-black"
        ></span>
      </div>
      {/* ears */}
      <div className=" h-20 w-20 rounded-full bg-pink-300 inline-block border-[0.8rem] sm:border-[1rem] box-border border-black absolute left-9 sm:left-16 -top-5"></div>
      <div className=" h-20 w-20 rounded-full bg-pink-300 inline-block border-[0.8rem] sm:border-[1rem] box-border border-black absolute right-9 sm:right-16 -top-5"></div>
      {/* Body */}
      <div
        style={{ borderRadius: "33% 32% 37% 38% / 50% 50% 25% 25%" }}
        className="bg-white sm:w-8/12 w-9/12 flex-grow rounded-full "
      ></div>
      {/* Paws */}
      {/* left paws */}
      <div
        style={{ borderRadius: "25% 25% 46% 54% / 22% 22% 78% 76%" }}
        className=" h-24 w-16 sm:h-32 sm:w-20 bg-black absolute z-40 -bottom-6 left-3 sm:left-4 flex flex-col items-center"
      >
        <span className=" w-full flex justify-evenly mt-2">
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
        </span>
        <span
          style={{ borderRadius: "48% 48% 47% 49% / 25% 25% 67% 67%" }}
          className="h-10 w-9 sm:h-14 sm:w-12 rounded-full bg-pink-300 inline-block mt-2"
        ></span>
      </div>
      {/* right paws */}
      <div
        style={{ borderRadius: "25% 25% 46% 54% / 22% 22% 78% 76%" }}
        className=" h-24 w-16 sm:h-32 sm:w-20 bg-black absolute z-40 -bottom-6  right-3 sm:right-4 flex flex-col items-center"
      >
        <span className=" w-full flex justify-evenly mt-2">
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
          <span
            style={{ borderRadius: "48% 46% 44% 54% / 46% 47% 52% 51%" }}
            className="h-8 w-4 sm:h-10 sm:w-5 bg-pink-300 inline-block"
          ></span>
        </span>
        <span
          style={{ borderRadius: "48% 48% 47% 49% / 25% 25% 67% 67%" }}
          className="h-10 w-9 sm:h-14 sm:w-12 rounded-full bg-pink-300 inline-block mt-2"
        ></span>
      </div>
      {/* Board */}
      <form
        onSubmit={e=>e.preventDefault()}
        className={`${
          isPasswordFieldActive ? "bottom-20 sm:bottom-24" : "bottom-4"
        } absolute flex flex-col justify-center items-center w-[110%] h-[18rem] sm:h-[21rem] shadow-xl z-30 rounded-sm bg-secondary text-lg transition-all duration-300`}
      >
        {/* left hand */}
        <span className="flex flex-col absolute -left-5 top-[35%]">
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full -mb-1"></span>
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full -mb-1"></span>
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full"></span>
        </span>
          <RippleButton value={loginOrSignUp?"Login":"signup"} style={{alignSelf:'flex-end', position:"absolute", top:"0px", width:"80px"}} onClick={()=>setLoginOrSignUp(e=>!e)}/>
          {loginOrSignUp?<Register setIsPasswordFieldActive={setIsPasswordFieldActive}/>:
          <Login setIsPasswordFieldActive={setIsPasswordFieldActive}/>}
        <span className="flex flex-col absolute -right-5 top-[35%]">
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full -mb-1"></span>
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full -mb-1"></span>
          <span className="bg-black h-4 w-9 sm:h-5 sm:w-10 inline-block rounded-full"></span>
        </span>
      </form>
    </div>
  );
};

export default Panda;
