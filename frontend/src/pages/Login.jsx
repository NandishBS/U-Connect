import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

function Login() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      login page
      <form onSubmit={handleSubmit(onSubmit)}>
      
      </form>
      dont have account ? <Link to={"/register"}>register here</Link>
    </div>
  )
}

export default Login


    