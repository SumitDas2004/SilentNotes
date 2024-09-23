import React from 'react'
import { Outlet } from 'react-router-dom'

const LoginRegisterIndex = () => {
  return (
    <div style={{"backdropFilter":"blur(6px)"}} className={`bg-[#00000045] overflow-hidden fixed z-30 top-0 h-screen w-screen flex justify-center items-center`}>
      <Outlet/>
    </div>
  )
}

export default LoginRegisterIndex