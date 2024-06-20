import {useState,useEffect} from 'react'
import TopSection from './TopSection'
import PostSection from './PostSection'
import { getPostsByUser } from '../../../api/post'
import { PostDataInterface } from '../../../types/post'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../api/profile'
import { User } from '../../../types/loginUser'

type PostType = 'saved' | 'myposts' | 'tagged';

const Profile = () => {


    const [posts, setPosts] = useState([])
    const [postType,setPostType]=useState<PostType>('myposts')
    // const [user,setUser]=useState<User>()

    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        fetchPosts()
    },[])

    const fetchPosts = async () => { 
            // if(postType=='myposts'){
                const postData = await getPostsByUser(username as string)
                setPosts(postData.posts)
            // }else if (postType=='saved'){
            //     const postData=
            // }
           
            // const userData =await getUserById(userId)
            // setUser(userData?.user)
    }

  
//   if(!user){
//     return <div>...loading</div>
//   }



    return (
        <div className="pt-8 md:pl-8 pb-5  md:pl-11  md:mt-5">
            <TopSection posts={posts}/>
            <div className='w-full  flex justify-center'>
            <button className='mx-7 p-1 border-b-4 border-b-black font-bold'>Posts</button>
<button className='mx-7 p-1 border-b-4 border-b-black font-bold'>Saved</button>

            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts && posts.map((item: PostDataInterface, index: number) => (
                    <PostSection item={item} refreshPost={fetchPosts}/>
                ))}
            </div>
        </div>
    )
}

export default Profile