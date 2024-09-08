import React from 'react'
import Panda from './Panda'
import { useNavigate } from 'react-router-dom'

const LoginRegisterIndex = () => {
  const navigate = useNavigate()
  return (
    <div className={`leftSlideAnimation overflow-hidden fixed z-30 top-0 h-screen w-screen bg-[#2e4307c1] flex justify-center items-center`}>
        <span className='flex text-white text-2xl top-4 right-4 absolute cursor-pointer' onClick={()=>navigate("/")}><i className="fa-solid fa-xmark"></i></span>
        <Panda/>
    </div>
  )
}

export default LoginRegisterIndex