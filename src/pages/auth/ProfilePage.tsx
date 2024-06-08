import React, { useEffect, useState } from 'react'

{/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}

import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import EditProfile from '../../modals/profile/EditProfile'
import { getMyPosts } from '../../api/post'
import EditPost from '../../modals/post/EditPost'
import { PostDataInterface } from '../../types/post'
import ViewPostModal from '../../modals/post/ViewPostModal'
import Profile from '../../components/auth/profile'



const UserProfile = () => {

    // const [openModal, setOpenModal] = useState(false)
    // const [openPostViewModal,setOpenPostViewModal]=useState(false)
    // const [postData,setPostData]=useState<PostDataInterface | null>(null)
    // const [openPostEditModal, setOpenEditPostModal] = useState(false)
    // // const [user, setUser] = useState<any>(null)
    // const user = useSelector((state: StoreType) => state.auth.user)
    // const [posts, setPosts] = useState([])
    // console.log('userData is ', userData)

    // useEffect(() => {
    //     fetchPosts()
    // }, [openPostViewModal])

    // const fetchPosts = async () => {
    //     // console.log('hasididid')
    //     const data = await getMyPosts()
    //     // console.log('data is ', data)
    //     setPosts(data.posts)

    // }

    // const OpenEditPost=async(postData:PostDataInterface)=>{
    //     console.log('post data frm the function ',postData)
    //     setOpenEditPostModal(true)
    //     // const response=await editPost(postId)
    //     // console.log(response.data)
    // }

    // const PostViewControl=(item:PostDataInterface)=>{
    //     setPostData(item) 
    //     setOpenPostViewModal(true)
    // }

    return (
        <>
        <Profile/>
            {/* <ViewPostModal isOpen={openPostViewModal}  postViewModalOnClose={()=>setOpenPostViewModal(false)} post={postData}/>
            <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} />
           

            <div className="p-8 px-14  mt-10">
                <div className="relative m mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                   
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img
                                        src={user?.profilePic ? user?.profilePic : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                                        className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] w-[150px] h-[150px] object-cover"
                                    />
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                                        <span className="text-sm text-slate-400">Photos</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                                        <span className="text-sm text-slate-400">Followers</span>
                                    </div>

                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                                        <span className="text-sm text-slate-400">Following</span>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div className="text-center mt-2">

                            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user?.username}</h3>
                            <div className="text-xs mt-0 mb-3 text-slate-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{user?.name}
                            </div>
                            <button className='m-1 bg-gray-600 text-white p-1 px-2 rounded-md' onClick={() => setOpenModal(true)}>Edit profile</button>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full">
                                    <p className="font-light font-medium leading-relaxed text-slate-600 mb-2">{user?.bio}</p> */}
                                    {/* <a href="javascript:;" className="font-normal text-slate-700 hover:text-slate-400">Follow Account</a> */}
                                {/* </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {posts && posts.map((item: PostDataInterface, index: number) => (
                        <div onClick={()=>PostViewControl(item)} key={index} className="w-full relative pb-[100%] cursor-pointer">
                            <img className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" src={item?.image[0]} alt="" />
                        </div>
                    ))}
                </div>

            </div> */}

        </>
    )
}

export default UserProfile