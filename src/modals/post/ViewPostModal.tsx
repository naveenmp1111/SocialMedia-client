import { useState, useEffect, useRef } from "react";
import { CommentInterface, PostDataInterface } from "../../types/post";
import EditPost from "./EditPost";
import PostDeleteConfirmation from "./PostDeleteConfirmation";
import { StoreType } from "../../redux/store";
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa6";
import { addComment, addReply, getComments, likePost, unlikePost } from "../../api/post";
import { MdBookmark } from "react-icons/md";
import { getUserByUsername, savePost, unsavePost } from "../../api/user";
import { User } from "../../types/loginUser";
import CommentList from "./CommentList";
import CommentInputProvider, { useCommentInputContext } from "../../contexts/CommentInputContext";

interface ModalProps {
    isOpen: boolean;
    post: PostDataInterface | null;
    postViewModalOnClose: () => void;
}

const ViewPostModal: React.FC<ModalProps> = ({ isOpen, postViewModalOnClose, post }) => {
    if (!isOpen) {
        return null
    }
    const [openPostEditModal, setOpenPostEditModal] = useState(false)
    const [isopen, setIsOpen] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const [isLiked, setIsLiked] = useState(post?.likes?.includes(userInRedux?._id as string))
    const [noOfLikes, setNoOfLikes] = useState(post?.likes?.length || 0)
    const [isSaved, setIsSaved] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>()

    const toggleDropdown = () => {
        setIsOpen(!isopen);
    };

    const EditButtonControl = () => {
        setIsOpen(false)
        setOpenPostEditModal(true)
    }

    const handleLikeToggle = (postId: string) => {
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
    }

    const fetchloggedInUserdata = async () => {
        const userData = await getUserByUsername(userInRedux?.username as string)
        setLoggedInUser(userData.user)
    }

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

    useEffect(() => {
        fetchloggedInUserdata()
    }, []);

    useEffect(() => {
        if (loggedInUser && loggedInUser.savedPosts)
            setIsSaved(loggedInUser?.savedPosts?.includes(post?._id as string))
    }, [loggedInUser])



    //--------------------------------------commentsection----------------------------------->
    // const commentInputRef=useRef<HTMLInputElement>(null)
    const { commentInputRef } = useCommentInputContext();
    const [mainComments,setMainComments]=useState<CommentInterface[]>([])
    const [replyComments,setReplyComments]=useState<CommentInterface[]>([])
    const [replyingCommentId,setReplyingCommentId]=useState<string | null>(null)
    const [isReply,setIsReply]=useState(false)

    const handleAddComment=async()=>{
        let comment=commentInputRef?.current?.value

         if(commentInputRef?.current?.value){
            if(comment?.trim()){
               try {
                // console.log('comment is ',comment,post?._id)
                if(isReply){
                    const response=await addReply({postId:post?._id as string,parentId:replyingCommentId as string,comment:comment})
                    console.log('response is ',response)
                }else{
                    const response=  await addComment({postId:post?._id as string,comment:comment})
                    console.log('response is ',response)
                }
               
                
               } catch (error) {
                 console.log('error is ',error)
               }
            }
            commentInputRef.current.value = "";
        }  
    }

    useEffect(()=>{
        fetchComments()
    },[])

    const fetchComments=async()=>{
       const response= await getComments(post?._id as string)
       console.log('comments fetched are ',response)
       let MainComments=response.comments.filter((item:CommentInterface)=>item.parentId===null)
       let ReplyComments=response.comments.filter((item:CommentInterface)=>item.parentId!==null)
       console.log('maincomments',MainComments)
       setMainComments(MainComments)
       setReplyComments(ReplyComments)
    }

    const handleSetReplyingCommentId=(commentId:string)=>{
        setReplyingCommentId(commentId)
        console.log('new replying commnet id is ',commentId)
    }

    const handleCancelReply=()=>{
        setIsReply(false)
        if(commentInputRef?.current?.value)
        commentInputRef.current.value=''
    }
6
    //--------------------------------------commentsection----end------------------------------->

    return (
        <>

            <PostDeleteConfirmation isOpenDeleteModal={deleteConfirmationModal} postDeleteModalOnClose={() => setDeleteConfirmationModal(false)} postId={post?._id} closeViewModal={postViewModalOnClose} />
            <EditPost isOpen={openPostEditModal} postEditModalOnClose={() => setOpenPostEditModal(false)} post={post} closeViewModal={postViewModalOnClose} />
            <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${isOpen ? 'fixed' : 'hidden'} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-80 pb-1`}>

                <div className="relative p-4 w-full max-w-screen-xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 pb-0.5">


                        <div className="flex ">

                            <img className="w-8/12 max-h-[740px]" src={post?.image[0]} alt="" />

                            <div className="p-4 md:p-3 space-y-4 w-full overflow-hidden relative"> {/* Added relative positioning here */}

                                <div className="flex justify-between">
                                    <div></div>
                                    <div className="relative inline-block text-left">
                                        {post?.userId === userInRedux?._id && (
                                            <button
                                                id="dropdownMenuIconHorizontalButton"
                                                onClick={toggleDropdown}
                                                className="mx-2 inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                                                type="button"
                                            >
                                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                </svg>
                                            </button>
                                        )}
                                        {isopen && (
                                            <div
                                                id="dropdownDotsHorizontal"
                                                className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600 absolute mt-2 right-0"
                                            >
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a onClick={EditButtonControl} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a onClick={() => setDeleteConfirmationModal(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                        <button type="button" onClick={postViewModalOnClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="flex px-4 py-3 mb-1">
                                        <img className="h-10 w-10 rounded-full" src={post?.user?.profilePic ? post.user.profilePic : 'https://picsum.photos/id/1027/150/150'} alt="profile" />
                                        <div className="text-lg font-bold  ml-4 text-white">{post?.user?.username}</div>
                                        <div className="break-words text-gray-100 ml-4 text-lg font-normal">{post?.description}</div>
                                    </div>

                                </div>
                                <div className="h-full  overflow-y-auto max-h-96  pb-14" > 
                                    {mainComments && mainComments?.map(comment=>(
                                       <>
                                        <CommentList comment={comment} allComments={replyComments} handleTargetCommentId={handleSetReplyingCommentId} setIsReply={setIsReply}/>
                                        {/* <span>reply</span> */}
                                       </>
                                    ))};
                                </div>
                                <div className="bg-gray-700 h-32 absolute bottom-0 left-0 right-0">
                                    <hr />
                                    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                                        <div className="flex gap-5">

                                            <>
                                                <label htmlFor="heartRadio" onClick={() => handleLikeToggle(post?._id as string)} className="cursor-pointer">
                                                    <FaHeart
                                                        className={`w-6 h-6 transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                                                    />
                                                </label>
                                            </>

                                            <svg onClick={()=>{commentInputRef.current?.focus()}} fill="#FFFFFF" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                                            <svg fill="#FFFFFF" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                                        </div>
                                        <div className="flex" onClick={() => handleSaveToggle(post?._id as string)}>
                                            <MdBookmark
                                                className={`w-6 h-6 transition-colors duration-300 ${isSaved ? 'text-green-500' : 'text-gray-500'}`}
                                            />
                                        </div>
                                    </div>
                                    {noOfLikes > 0 && (<div className="font-semibold text-white text-sm mx-4 mt-2 mb-4">{noOfLikes} {noOfLikes > 1 ? "Likes" : "Like"}</div>)}
                                    
                                    <input ref={commentInputRef}  className={`bg-gray-900 m-1 p-2 ${isReply ? 'w-8/12' : 'w-10/12'} rounded-xl text-gray-100`} type="text" placeholder="Add comment..." /><button onClick={handleAddComment} className="btn bg-gray-900 p-2 px-3 rounded-xl ml-1 text-gray-300 hover:bg-gray-800">Post</button>
                                    {isReply && <button onClick={handleCancelReply} className="btn bg-red-600 p-2  rounded-xl ml-1 text-white  hover:bg-red-500">cancel</button>}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ViewPostModal