import { useDispatch, useSelector } from "react-redux";
import {changeMessage} from './app/services/helloSlice.js'
import {createBrowserRouter,  RouterProvider} from 'react-router-dom'
import MainLayout from "./pages/MainLayout.jsx";
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import ForgetPassword from './pages/ForgetPassword.jsx'
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

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
])


function App() {
  const message = useSelector(state => state.hello.message);
  const user = useSelector(state => state.hello.user)
  const dispatch = useDispatch();

  const clickHandler = ()=>{
    dispatch(changeMessage({
      user : "nandishbs"
    }))
  }
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
