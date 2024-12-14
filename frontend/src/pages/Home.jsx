import React, { useEffect, useState } from 'react'
import Modal from '../components/generalComponents/Modal'
import Post from '../components/post/Post'
import postService from '../app/services/post'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../app/postSlice'


function Home() {
  const posts = useSelector(state=>state.post.posts)
  const dispacth = useDispatch()
  
  const fetchPosts = async ()=> {
    const posts = await postService.getPosts();
    console.log(posts)
  }

useEffect(() => {
  fetchPosts()
}, [])


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