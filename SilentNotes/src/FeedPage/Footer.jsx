import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  return (
    <footer className="h-16 w-full bottom-0  lg:hidden fixed bg-primary flex justify-center items-center z-30">
      <button
        onClick={()=>navigate("/post/create")}
        title="Create post"
        className="bg-secondary rounded-full flex justify-center items-center size-12 border-4 border-accent text-2xl text-accent hover:scale-150 hover:mb-6 hover:shadow-md hover:shadow-[#00000077] transition-all duration-200"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </footer>
  );
};

export default Footer;
