import { useState, useEffect } from 'react'
import PostListing from './PostListing'
import { getAllPosts } from '../../../api/post'

const  Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    const response = await getAllPosts()
    setPosts(response.posts)
  }

  return (
    <>
      <div className="bg-gray-100 sm:px-10 p-5 w-full">
      {posts.map((post:any) => (
        <PostListing post={post} />
      ))}
      </div>
    </>
  )
}

export default Home