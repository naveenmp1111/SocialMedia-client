import { useState,useEffect } from 'react'
import { PostDataInterface } from '../../../types/post'
import ReportPost from '../../../modals/post/ReportPost'
import { FaHeart } from 'react-icons/fa'
import { likePost, unlikePost } from '../../../api/post'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { MdBookmark } from 'react-icons/md'
import { savePost, unsavePost } from '../../../api/user'
import { User } from '../../../types/loginUser'

const PostListing = ({ post,loggedinUser }: { post: PostDataInterface,loggedinUser:User | undefined }) => {

  const [isOpen, setIsopen] = useState(false)
  const [OpenReportModal, setOpenReportModal] = useState(false)
  const [postId, setPostId] = useState<string>()
  const [noOfLikes, setNoOfLikes] = useState(post.likes?.length || 0)
  const userInRedux = useSelector((state: StoreType) => state.auth.user)
  
  const toggleDropdown = () => {
    setIsopen(prev => !prev)
  }

  const handleReportModal = (postId: string) => {
    setPostId(postId)
    setOpenReportModal(true)
    setIsopen(false)
  }

  const [isLiked, setIsLiked] = useState(post.likes?.includes(userInRedux?._id as string));
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (loggedinUser?.savedPosts && post?._id) {
      const isPostSaved = loggedinUser.savedPosts.includes(post._id);
      setIsSaved(isPostSaved);
    }
  }, [loggedinUser, post]);

  const handleLikeToggle = async (postId: string) => {
    setIsLiked(prev => {
      const newState = !prev;
      if (newState) {
        likePost(postId);
        setNoOfLikes(prev => prev + 1)
      } else {
        unlikePost(postId);
        setNoOfLikes(prev => prev - 1)
      }
      return newState;
    });
  };

  const handleSaveToggle = async (postId: string) => {
    setIsSaved(prev => {
      const newState = !prev;
      if (newState) {
        savePost(postId);
      } else {
        unsavePost(postId);
      }
      return newState;
    });
  };



  


  return (
    <>
      <ReportPost isOpen={OpenReportModal} onClose={() => setOpenReportModal(false)} postId={postId as string} />
      <div key={post._id} className="bg-white border rounded-md md:max-w-[672px] w-full mb-5">
        <div className="flex  px-4 py-3">
          <a href={`/profile/${post.user.username}`} className="flex items-center space-x-3">
            <img className="h-8 w-8 rounded-full" src={post?.user?.profilePic ? post.user.profilePic : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile" />
            <div className="ml-3">
              <span className="text-sm font-semibold antialiased block leading-tight">{post?.user?.username}</span>
              <span className="text-gray-600 text-xs block">{post?.user?.name}</span>
            </div>
          </a>
          <div className='ml-auto flex'>
            {isOpen && (
              <div
                id="dropdownDotsHorizontal"
                className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600 "
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a onClick={() => handleReportModal(post._id)} className="block px-4  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Report</a>
                  </li>
                </ul>
              </div>
            )}
            <div onClick={toggleDropdown}>
              {/* Three-dot vertical menu */}
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M24 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
              </svg>
            </div>
          </div>


        </div>
        <div className="relative w-full">
          <img className="w-full object-cover min-w-[200px] min-h-[200px] max-h-[750px]" src={post.image[0]} alt="post" />
        </div>
        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
          <div className="flex gap-5">

            <>
              <label htmlFor="heartRadio" onClick={() => handleLikeToggle(post._id)} className="cursor-pointer">
                <FaHeart
                  className={`w-6 h-6 transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-800'}`}
                />
              </label>
            </>

            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
          </div>
          <div className="flex" onClick={()=>handleSaveToggle(post._id)}>
            <MdBookmark
              className={`w-6 h-6 transition-colors duration-300 ${isSaved ? 'text-green-500' : 'text-gray-500'}`}
            />
          </div>
        </div>
        {noOfLikes > 0 && (<div className="font-semibold text-sm mx-4 mt-2 mb-4">{noOfLikes} {noOfLikes > 1 ? "Likes" : "Like"}</div>)}
        <span className='m-1 p-2'>{post.description}</span>
      </div>
    </>
  )
}

export default PostListing