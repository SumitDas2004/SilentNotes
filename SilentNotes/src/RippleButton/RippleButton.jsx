import React from "react";
import "./RippleButton.css";

const RippleButton = ({ value, onClick=()=>{}, onMouseDown=()=>{}, style }) => {
  return (
    <button
    type="button"
      style={style}
      className=" select-none overflow-hidden w-max relative bg-accent text-white px-2 py-1 rounded-sm font-semibold hover:bg-[#ef5656] transition-all"
      onClick={(e) => {
        onClick();
      }}
      onMouseDown={(e)=>{
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        const span = document.createElement("span");
        span.classList.add("ripple");
        span.style.top = y + "px";
        span.style.left = x + "px";
        e.target.appendChild(span);
        setTimeout(() => {
          span.remove();
        }, 700);
        onMouseDown();
      }}
    >
      {value}
    </button>
  );
};

export default RippleButton;
