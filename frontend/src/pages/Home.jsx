import React, { useEffect, useState } from 'react'
import Post from '../components/post/Post.jsx'
import postService from '../app/services/post.js'
import { useDispatch, useSelector } from 'react-redux'
import { incrPage, setPosts } from '../app/postSlice.js'


function Home() {
  const posts = useSelector(state => state.post.posts)
  const dispatch = useDispatch()
  const page = useSelector(state => state.post.page)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async ()=> {
    setLoading(true)
    try {
      const response = await postService.getPosts(page);
      const posts = response.data.data;
      dispatch( setPosts(posts))
      dispatch(incrPage())
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchPosts()
  },[])


  return (
    <div className='max-w-lg w-full mx-auto h-full'>     
      {
        posts.map(post => <Post post={post} key={post._id}/>)
      }
      <div className='w-full flex justify-center h-32'>
        {!loading && <button className='bg-blue-500 px-3 py-1 max-h-fit rounded-md' onClick={fetchPosts}> <span className='text-lg'>more</span> &#x25BC;</button>}
      </div>
    </div>
  )
}

export default Home