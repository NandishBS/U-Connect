import React from 'react'
import Body from '../components/generalComponents/Body'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

function CreatePost() {
  const { register, handleSubmit } = useForm()
  const role = "student"
  // const role = useSelector(state => state.auth.role)

  return (
    <Body className="flex-wrap">
        {role}
    </Body>
  )
}

export default CreatePost
