import { useState, useEffect } from 'react'
import PostListing from './PostListing'
import { getAllPosts } from '../../../api/post'
import { getSuggestedUsers, getUserByUsername } from '../../../api/user'
import { User } from '../../../types/loginUser'
import { PostDataInterface } from '../../../types/post'
import { useNavigate } from 'react-router-dom'
import { StoreType } from '../../../redux/store'
import { useSelector } from 'react-redux'
import HomePageLoader from '../../others/HomePageLoader'
import SuggestedUsersLoader from '../../others/SuggestedUsersLoader'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState<User[]>([])
  const [loggedInUser, setLoggedInUser] = useState<User>()
  const userInRedux = useSelector((state: StoreType) => state.auth.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async () => {
    try {
      setLoading(true)
      const response = await getAllPosts()
      setPosts(response.posts)
      const data = await getSuggestedUsers()
      setUsers(data.users)
      const loggedUser = await getUserByUsername(userInRedux?.username as string)
      setLoggedInUser(loggedUser.user)
      setLoading(false)
    } catch (error) {
      console.log('error in fetching posts  ', error)
    }
  }

  if (loading) {
    return (
      <>
        <HomePageLoader />
        <div className='flex relative'>
          <div className="bg-gray-00 md:px-10 pt-4 w-fit md:pb-0 pb-16">
          </div>
          <div className='min-w-72 h-screen max-h-[650px] bg-white fixed  top-24 hidden right-nav-size:block ml-[750px] rounded-lg p-5'>
            <h2 className='text-xl font-semibold mb-7 text-center'>Suggested for you</h2>
            <div className='max-h-[570px] overflow-y-auto'>
              <SuggestedUsersLoader />
              <SuggestedUsersLoader />
              <SuggestedUsersLoader />
              <SuggestedUsersLoader />
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <div className='flex relative'>
        <div className="bg-gray-00 md:px-10 pt-4 w-fit md:pb-0 pb-16">
          {posts.map((post: PostDataInterface) => (
            <PostListing key={post._id} post={post} loggedinUser={loggedInUser} />
          ))}
        </div>
        <div className='min-w-72 h-screen max-h-[650px] bg-white fixed top-24 hidden right-nav-size:block ml-[750px] rounded-lg p-5'>
          <h2 className='text-xl font-semibold mb-7 text-center'>Suggested for you</h2>
          <div className='max-h-[570px] overflow-y-auto'>
            {users.map(user => {
              if (loading) {
                return (
                  <SuggestedUsersLoader />
                );
              }
              return (
                <div onClick={() => navigate(`/profile/${user.username}`)} key={user._id} className='flex items-center mb-4 cursor-pointer'>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      src={user.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                      alt={`${user.username} profile`}
                    />
                  </div>


                  <div className='ml-3'>
                    <span className='block text-sm font-semibold truncate'>{user.username}</span>
                    <span className='block text-gray-600 text-xs truncate'>{user.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>






      </div>
    </>
  )
}

export default Home