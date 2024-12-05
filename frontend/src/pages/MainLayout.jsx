import React, { useEffect } from 'react'
import NavBar from '../components/navBar/NavBar'
import { Navigate, Outlet } from 'react-router-dom'

function MainLayout() {
  const login = true;

  return (
    <div>
        {login ? <NavBar/> : <Navigate to="/login" />}
        {login ? <Outlet/> : <Navigate to="/login" />}
    </div>
  )
}

export default MainLayout
