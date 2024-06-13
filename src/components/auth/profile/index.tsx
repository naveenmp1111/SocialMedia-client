import {useState,useEffect} from 'react'
import TopSection from './TopSection'
import PostSection from './PostSection'
import { getPostsByUser } from '../../../api/post'
import { PostDataInterface } from '../../../types/post'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../api/profile'
import { User } from '../../../types/loginUser'

const Profile = () => {

    const [posts, setPosts] = useState([])
    const [user,setUser]=useState<User>()

    const { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        fetchPosts()
    },[])

    const fetchPosts = async () => { 
        if(typeof userId=='string'){
            const postData = await getPostsByUser(userId)
            setPosts(postData.posts)
            const userData =await getUserById(userId)
            setUser(userData?.user)
        }
    }

  
  if(!user){
    return <div>...loading</div>
  }



    return (
        <div className="pt-8 md:pl-8 pb-5  md:pl-11  md:mt-5">
            <TopSection posts={posts} userData={user}/>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts && posts.map((item: PostDataInterface, index: number) => (
                    <PostSection item={item} refreshPost={fetchPosts}/>
                ))}
            </div>
        </div>
    )
}

export default Profile