import { useEffect, useState } from 'react'
import PostListing from '../../components/auth/home/PostListing'
import { getAllPosts } from '../../api/post'
import Home from '../../components/auth/home'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  
  return (
    <div>
      <Home/>
    </div>
  )
}

export default HomePage