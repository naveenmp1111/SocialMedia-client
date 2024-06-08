import { useState } from "react";
import { PostDataInterface } from "../types/post";
import EditPost from "./EditPost";
import PostDeleteConfirmation from "./PostDeleteConfirmation";

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
    const [deleteConfirmationModal,setDeleteConfirmationModal]=useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isopen);
    };

    const EditButtonControl = () => {
        setIsOpen(false)
        setOpenPostEditModal(true)
    }

    return (

        <>

            <PostDeleteConfirmation isOpenDeleteModal={deleteConfirmationModal} postDeleteModalOnClose={()=>setDeleteConfirmationModal(false)} postId={post?._id} closeViewModal={postViewModalOnClose}/>
            <EditPost isOpen={openPostEditModal} postEditModalOnClose={() => setOpenPostEditModal(false)} post={post} closeViewModal={postViewModalOnClose} />
            <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${isOpen ? 'fixed' : 'hidden'} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-80`}>

                <div className="relative p-4 w-full max-w-screen-xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">


                        <div className="flex ">

                            <img className="w-8/12 max-h-[740px]" src={post?.image[0]} alt="" />

                            <div className="p-4 md:p-3 space-y-4 w-full overflow-hidden">

                                <div className=" flex justify-between ">
                                   
                                    <div>

                                    </div>

                                    <div className="relative inline-block text-left">
                                        <button
                                            id="dropdownMenuIconHorizontalButton"
                                            onClick={toggleDropdown}
                                            className="mx-2  inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                        </button>

                                        {isopen && (
                                            <div
                                                id="dropdownDotsHorizontal"
                                                className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-500 dark:divide-gray-600 absolute mt-2 right-0"
                                            >
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a onClick={EditButtonControl} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a onClick={()=>setDeleteConfirmationModal(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                        <button type="button" onClick={postViewModalOnClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white " data-modal-hide="default-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            {/* <span className="sr-only">Close modal</span> */}
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="flex  px-4 py-3  mb-1">
                                        <img className="h-10 w-10 rounded-full" src={post?.user?.profilePic ? post.user.profilePic : "https://picsum.photos/id/1027/150/150"} alt="profile" />
                                        <h2 className="text-xl font-medium ml-4 text-white">{post?.user?.username}</h2>
                                    </div>
                                    <div className="break-words text-white ml-5">
                                        {post?.description}
                                    </div>
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