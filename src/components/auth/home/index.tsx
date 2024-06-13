import { useState, useEffect } from 'react'
import PostListing from './PostListing'
import { getAllPosts } from '../../../api/post'
import { getRestofAllUsers } from '../../../api/user'
import { User } from '../../../types/loginUser'
import { PostDataInterface } from '../../../types/post'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      const response = await getAllPosts()
      setPosts(response.posts)
      const data = await getRestofAllUsers()
      setUsers(data.users)
    } catch (error) {
      console.log('error in fetching posts  ', error)
    }
  }

  return (
    <>
      <div className='flex relative'>
        <div className="bg-gray-00 md:px-10 pt-4 w-fit">
          {posts.map((post: PostDataInterface) => (
            <PostListing post={post} />
          ))}
        </div>
        <div className='min-w-72 h-screen max-h-[650px] bg-white fixed  top-24 hidden right-nav-size:block ml-[750px] rounded-lg p-5'>
          <h2 className='text-xl font-semibold mb-7 text-center'>Suggested for you</h2>
          <div>
            {users.map(user => (
              <div key={user._id} className='flex items-center mb-4'>
                <img className='w-10 h-10 rounded-full' src={user.profilePic} alt={`${user.username} profile`} />
                <div className='ml-3'>
                  <span className='block text-sm font-semibold'>{user.username}</span>
                  <span className='block text-gray-600 text-xs'>{user.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home