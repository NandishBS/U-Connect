import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, Navigate} from 'react-router-dom';
import Container from '../components/generalComponents/Container.jsx'
import BlueButton from '../components/generalComponents/BlueButton.jsx'
import Body from '../components/generalComponents/Body.jsx';
import UConnectText from '../components/generalComponents/UConnectText.jsx';
import authentication from '../app/services/authentication.js'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/authSlice.js';

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false)
  const isLogin = useSelector(state => state.auth.login)

  const dispatch = useDispatch()

  const onSubmit = async (data)=>{
    data = {...data, usn : data.usn.toUpperCase()}
    setLoading(true)
    try {
      const response = await authentication.login(data);
      toast.success(response.data.message)
      dispatch(login())
      setSend(true)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
  };

  return (
    <Body>
      {isLogin && <Navigate to='/'/>}
      <Container className='max-w-sm bg-gray-800 w-full border border-gray-600 border-opacity-30'>
        <h1 className ="text-3xl mt-1 mb-8 font-semibold text-center flex-wrap">
            Welcome to <UConnectText/>
        </h1>
        <div className='mb-2'>
        <p>this app is only for UBDT community. so use</p>
        <p>( usn : testuser001 , password : testuser001 )</p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

          <input className='w-full uppercase p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800' placeholder='USN' autoComplete='off' type="text" required {...register('usn')} />

          <input className='w-full p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800' placeholder='Password' autoComplete='off' type="password" required {...register('password')}/>

          {loading ? <BlueButton disabled className="text-xl cursor-wait" type="submit">Login</BlueButton>
          : <BlueButton className="text-xl" type="submit">Login</BlueButton>}
      </form>   
          <div className='w-full mt-3 text-lg flex gap-3 justify-center place-items-center'>
            <p>don't have an Account ?</p> <Link to='/register' className='text-cyan-400 hover:underline'>register here</Link>
          </div>
          
          <div className='w-full flex justify-end place-items-center mt-1 text-cyan-400'>
            <Link to='/forgetpassword' className='hover:underline text-lg'>forget password </Link>&nbsp;
        </div>

        {send && <Navigate to="/"/>}
      </Container>
    </Body>
  )
}

export default Login


    