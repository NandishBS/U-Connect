import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import authentication from '../app/services/authentication';
import { useDispatch, useSelector } from 'react-redux';
import {logout,login } from '../app/authSlice.js'
import './pages.css'

function MainLayout() {
  const isLogin = useSelector(state => state.auth.login);
  const dispatch = useDispatch();
  const authenticateUser = async()=>{
    try {
      const userInfo =  await authentication.getUserInfo()
      dispatch( login() )
    } catch (error) {
      console.log("get info catch block error", error)
      dispatch( logout() )
    }
  }
 
useEffect(()=>{
    authenticateUser()
  },[])

  return (
    <div className='bg-black scrollbar-hide w-screen h-screen flex justify-center items-center overflow-auto'>
        {isLogin ? <NavBar/> : <Navigate to="/login" />}
        {isLogin ? <Outlet/> : <Navigate to="/login" />}
    </div>
  )
}

export default MainLayout
