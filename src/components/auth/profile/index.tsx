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
        // console.log('hasididid')
        const data = await getMyPosts()
        // console.log('data is ', data)
        setPosts(data.posts)

    }


    return (
        <div className="p-8 px-14  mt-10">
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