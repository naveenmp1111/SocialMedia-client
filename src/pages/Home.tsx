import  { useEffect, useState } from 'react'
import PostListing from '../components/PostListing'
import { getAllPosts } from '../api/post'

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch()
  }, [])
  const fetch = async () => {
    const response = await getAllPosts()
    setPosts(response.posts)
    console.log(response.posts)
  }
  return (
    <div>
      <PostListing posts={posts} />
    </div>
  )
}

export default Home