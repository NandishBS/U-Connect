import { useDispatch, useSelector } from "react-redux";
import {createBrowserRouter,  RouterProvider} from 'react-router-dom'
import MainLayout from "./pages/MainLayout.jsx";
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import ForgetPassword from './pages/ForgetPassword.jsx'
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Otp from "./pages/Otp.jsx";
import { useEffect } from "react";
import {logout , login} from './app/authSlice.js'
import authentication from "./app/services/authentication.js";

const router = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        path : '',
        element: <Home/>
      },
      {
        path : 'profile/:usn',
        element : <Profile/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>,
  },
  {
    path : '/register',
    element : <Register/>
  },
  {
    path : '/otp',
    element : <Otp/>
  },
  {
    path : '/forgetpassword',
    element : <ForgetPassword/>
  }
])


function App() {
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
