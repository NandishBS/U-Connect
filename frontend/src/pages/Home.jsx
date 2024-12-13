import React, { useState } from 'react'
import Modal from '../components/generalComponents/Modal'
import Post from '../components/post/Post'

function Home() {
  const [edit, setEdit] = useState(false)
  const closeModal = ()=>{
    setEdit(false)
  }
  return (
    <div className='max-w-lg w-full mx-auto h-full'>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default Home