import { useState, useEffect } from 'react'
import { PostDataInterface } from '../../../types/post'
import ViewPostModal from '../../../modals/post/ViewPostModal'
import useConversation from '../../../zustand/useConversation';

const PostSection = ({ item, refreshPost }: { item: PostDataInterface; refreshPost: () => void }) => {

    const [openPostViewModal, setOpenPostViewModal] = useState(false)
    const [postData, setPostData] = useState<PostDataInterface | null>(null)
    const {reload}=useConversation()

    const PostViewControl = (item: PostDataInterface) => {
        setPostData(item)
        setOpenPostViewModal(true)
    }

    useEffect(() => {
        refreshPost()
    }, [openPostViewModal,reload])

    return (
        <>
            <ViewPostModal isOpen={openPostViewModal} postViewModalOnClose={() => setOpenPostViewModal(false)} post={postData} />

            <div onClick={() => PostViewControl(item)} className="w-full relative pb-[100%] cursor-pointer">
                <img className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" src={item?.image[0]} alt="" />
            </div>
        </>
    )
}

export default PostSection