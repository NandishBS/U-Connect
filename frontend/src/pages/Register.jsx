import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom'
import Body from '../components/generalComponents/Body';
import Container from '../components/generalComponents/Container';
import UConnectText from '../components/generalComponents/UConnectText';
import GreenButton from '../components/generalComponents/GreenButton';
import authentication from '../app/services/authentication';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { verify } from '../app/authSlice';


function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async (data)=>{
    data = {...data, usn : data.usn.toUpperCase()}
    setLoading(true);
    try {
      const response = await authentication.verify(data);
      dispatch(verify(data))
      toast.success(response.data.message)
      setSend(true)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    setLoading(false);
  };

  return (
    <Body>
      <Container className='max-w-sm bg-gray-800 w-full border border-gray-600 border-opacity-30'>
        <h1 className ="text-3xl mt-1 mb-8 font-semibold text-center flex-wrap">
            Welcome to <UConnectText/>
        </h1>
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

          <input className='w-full uppercase p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800' placeholder='USN' type="text" autoComplete='off' required {...register('usn')} />

          <input className='w-full p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800' placeholder='Username' type="text" autoComplete="off" required min="20" {...register('username')} />

          <input className='w-full p-3 placeholder-gray-500 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none autofill:bg-gray-800' placeholder='Password' type="password" minLength="8" required {...register('password')}/>

          <div className='w-full text-xl flex gap-5 justify-center place-items-end'>
            <div className='flex'>
            <label className='cursor-pointer' htmlFor="student">Student &nbsp;</label>
            <input className='cursor-pointer focus: h-7 w-4 text-blue-600' type="radio" id='student' required value="student" {...register('role')} />
            </div>

            <div className='flex'>
            <label className='cursor-pointer' htmlFor="teacher">Teacher &nbsp;</label>
            <input className='cursor-pointer h-7 w-4' type="radio" id='teacher' required value="teacher" {...register('role')} />
            </div>
          </div>

          {loading ? <GreenButton disabled className="text-xl" type="submit">Register</GreenButton>
          : <GreenButton className="text-xl" type="submit">Register</GreenButton>}
          
          <div className='w-full text-lg flex gap-3 justify-center place-items-center'>
            <p>already have an Account ?</p> <Link to='/login' className='text-cyan-400 hover:underline'>login</Link>
          </div>

          {send && <Navigate to='/otp'/>}    

        </form>
      </Container>
    </Body>
  )
}

export default Register
