import {useState,useEffect} from 'react'
import TopSection from './TopSection'
import PostSection from './PostSection'
import { getMyPosts } from '../../../api/post'
import { PostDataInterface } from '../../../types/post'

const Profile = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    },[])

    const fetchPosts = async () => {
        const data = await getMyPosts()
        setPosts(data.posts)

    }


    return (
        <div className="pt-8 pl-8 pb-5  md:pl-11  md:mt-5">
            <TopSection posts={posts}/>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts && posts.map((item: PostDataInterface, index: number) => (
                    <PostSection item={item} refreshPost={fetchPosts}/>
                ))}
            </div>
        </div>
    )
}

export default Profile