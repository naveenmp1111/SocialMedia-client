import React,{useState,useEffect} from 'react'
import ViewPostModal from '../../../modals/post/ViewPostModal'
import { PostDataInterface } from '../../../types/post'

const Postlist = ({post}:{post:PostDataInterface}) => {
    const [openPostViewModal,setOpenPostViewModal]=useState(false)
    const [postData,setPostData]=useState<PostDataInterface | null>(null)

    const PostViewControl=(item:PostDataInterface)=>{
        setPostData(item) 
        setOpenPostViewModal(true)
    }

    return (
        <>
          <ViewPostModal isOpen={openPostViewModal}  postViewModalOnClose={()=>setOpenPostViewModal(false)} post={postData}/>

          <div onClick={() => PostViewControl(post)}  className="w-full relative pb-[100%] cursor-pointer">
            <img className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" src={post?.image[0]} alt="" />
        </div>
        </>
        

    )
}

export default Postlist