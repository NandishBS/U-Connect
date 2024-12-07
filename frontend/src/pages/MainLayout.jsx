import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import authentication from '../app/services/authentication';

function MainLayout() {
  const login = true;

 const getInfo = async()=>{
    try {
      const userInfo =  await authentication.getUserInfo()
      console.log(userInfo)
    } catch (error) {
      console.log("final error", error)
    }
  }


  return (
    <div>
        {login ? <NavBar/> : <Navigate to="/login" />}
        {login ? <Outlet/> : <Navigate to="/login" />}

        <button onClick={()=>{getInfo()}}> getuser </button>
    </div>
  )
}

export default MainLayout
