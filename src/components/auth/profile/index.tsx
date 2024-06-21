import { useState, useEffect } from 'react'
import TopSection from './TopSection'
import PostSection from './PostSection'
import { getPostsByUser } from '../../../api/post'
import { PostDataInterface } from '../../../types/post'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../api/profile'
import { User } from '../../../types/loginUser'
import { getSavedPost, getUserByUsername } from '../../../api/user'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import { FaLock } from 'react-icons/fa';

type PostType = 'saved' | 'myposts' | 'tagged';

const Profile = () => {


    const [posts, setPosts] = useState<PostDataInterface[]>([])
    const [postType, setPostType] = useState<PostType>('myposts')
    const [postLength, setPostLength] = useState(0)
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const [visitedUser,setVisitedUser]=useState<User>()
    // const [user,setUser]=useState<User>()

    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        fetchPosts()
    }, [postType])

    const fetchPosts = async () => {
        if (postType == 'myposts') {
            const postData = await getPostsByUser(username as string)
            setPosts(postData.posts)
            setPostLength(postData.posts.length)
        } else if (postType == 'saved') {
            const postData = await getSavedPost()
            setPosts(postData.posts)
        }
    }

    useEffect(()=>{
        handleVisitedUser()
    },[])

    const handleVisitedUser=async()=>{
        const user=await getUserByUsername(username as string)
        setVisitedUser(user.user)
    }


    return (
        <div className="pt-8 md:pl-8 pb-5  md:pl-11  md:mt-5">
            <TopSection postsLength={postLength} />
            { (visitedUser?.username != userInRedux?.username) && (visitedUser?.isPrivate) ? (
    visitedUser?.followers?.includes(userInRedux?._id as string) ? (
        <>
            <div className='w-full flex justify-center m-1'>
                {posts.length > 0 ? (
                    <>
                        <button
                            className={`mx-7 p-1 border-b-4 ${postType === 'myposts' ? 'border-b-black' : ''} font-bold`}
                            onClick={() => setPostType('myposts')}
                        >
                            Posts
                        </button>

                        {userInRedux?.username === username && (
                            <button
                                className={`mx-7 p-1 border-b-4 ${postType === 'saved' ? 'border-b-black' : ''} font-bold`}
                                onClick={() => setPostType('saved')}
                            >
                                Saved
                            </button>
                        )}
                    </>
                ) : (
                    <p className='font-bold text-gray-400 text-4xl m-20'>No posts yet.</p>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts && posts.map((item: PostDataInterface, index: number) => (
                    <PostSection key={index} item={item} refreshPost={fetchPosts} />
                ))}
            </div>
        </>
    ) : (
        <>
        <FaLock className='text-3xl text-gray-600 w-full mt-20' />
        <p className='font-bold text-gray-600 text-xl mt-1 text-center'>Private Account</p>
        <p className='font-bold text-gray-400 text-4xl mt-5 text-center'>Follow to see their posts.</p>
        </>
    )
) : (
    <>
        <div className='w-full flex justify-center m-1'>
            {posts.length > 0 ? (
                <>
                    <button
                        className={`mx-7 p-1 border-b-4 ${postType === 'myposts' ? 'border-b-black' : ''} font-bold`}
                        onClick={() => setPostType('myposts')}
                    >
                        Posts
                    </button>

                    {userInRedux?.username === username && (
                        <button
                            className={`mx-7 p-1 border-b-4 ${postType === 'saved' ? 'border-b-black' : ''} font-bold`}
                            onClick={() => setPostType('saved')}
                        >
                            Saved
                        </button>
                    )}
                </>
            ) : (
                <p className='font-bold text-gray-400 text-4xl m-20'>No posts yet.</p>
            )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts && posts.map((item: PostDataInterface, index: number) => (
                <PostSection key={index} item={item} refreshPost={fetchPosts} />
            ))}
        </div>
    </>
)}

        </div>
    )
}

export default Profile