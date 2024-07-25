import { useState, useEffect } from 'react'
import CreatePost from '../../../modals/post/CreatePost'
import store, { StoreType } from '../../../redux/store'
import { logout } from '../../../redux/authSlice'
import { useSelector } from 'react-redux'
// import RequestsPart from './RequestsPart'
import { User } from '../../../types/loginUser'
import { acceptRequest, declineRequest, getRequests } from '../../../api/user'
import RequestModal from '../../../modals/home/RequestModal'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import SettingsModal from '../../../modals/home/SettingsModal'
import useConversation from '../../../zustand/useConversation'
import useGetConversations from '../../../hooks/useGetConversation'
import useGetMessages from '../../../hooks/useGetMessages'
import useGetUnreadMessages from '../../../hooks/useGetUnreadMessages'
import useListenMessages from '../../../hooks/useListenMessages'
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { MdOutlineTravelExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import NotificationModal from '../../../modals/home/NotificationModal'
import useGetNotifications from '../../../hooks/useGetNotifications'

const LeftSideBar = () => {
   const [openModal, setOpenModal] = useState(false)
   const user = useSelector((state: StoreType) => state.auth.user)


   //request part-----------------------------------------------------------

   const [openRequestModal, setOpenRequestModal] = useState<boolean>(false)
   const [requests, setRequests] = useState<User[] | null>([])
   const {setReload}=useConversation()
   const [openNotificationModal,setOpenNotificationModal]=useState(false)
   // const [unreadNotifications,setUnreadNotifications]=useState(0)


   useEffect(() => {
      fetchRequests()
   }, [])

   // useEffect(() => {
   //    fetchNotifications()
   // }, [requests])

   // const fetchNotifications=async()=>{
   //    try {
   //       const response=await getNotifications()
   //       console.log('response from get notificaoins is ',response)
   //       setNotifications(response.notifications)
   //       // let UnreadNotifications=notifications.filter(item=>item.isSeen==false)
   //       // setUnreadNotifications(UnreadNotifications.length)
   //    } catch (error) {
   //       console.log('error is ',error)
   //    }
   // }
   const {notifications}=useGetNotifications()

   const fetchRequests = async () => {
      try {
         const users = await getRequests(user?.username as string)
         setRequests(users.users)
      } catch (error) {
         console.log(error)
      }
   }
   const handleAccept = async (username: string) => {
      // Handle accept logic
      try {
         await acceptRequest({ friendUsername: username })
         setReload()
         setRequests((prevRequests) => (prevRequests || []).filter((request) => request.username !== username));
      } catch (error) {
         if (isAxiosError(error)) {
            toast.error(error.message)
            console.log(error)
         }
      }
   };

   const handelDecline=async(username:string)=>{
      try {
         await declineRequest(username)
         setRequests((prevRequests) => (prevRequests || []).filter((request) => request.username !== username));
      } catch (error) {
         if(isAxiosError(error)){
            toast.error(error.message)
            console.log(error)
         }
      }
   }

   //----------------------------------------settindgs--------------------------------------//

   const [isOpenSettingsModal,setIsOpenSettingsModal]=useState(false)
   const { chats } = useGetConversations()

   //messages------->
   useListenMessages()
   const {unreadMessages}=useGetUnreadMessages()

   //---------------------------------------notitification-----------------------------------//

   


   return (
      <>
         <NotificationModal isOpen={openNotificationModal} onClose={()=>setOpenNotificationModal(false)} />
         <RequestModal isOpen={openRequestModal} onClose={() => setOpenRequestModal(false)} requests={requests} onAccept={handleAccept} onDecline={handelDecline}/>
         <CreatePost isOpen={openModal} onClose={() => setOpenModal(false)} />
         <aside id="default-sidebar" className="fixed top-24  z-40    w-64 h-screen max-h-[650px] transition-transform -translate-x-full md:translate-x-0 md:bottom-bar-hidden" aria-label="Sidebar">
            <div className="h-full px-5 py-3 overflow-y-auto bg-white  rounded-lg">
               <ul className="space-y-4 font-medium itme">
                  <li className='m-7'>
                     <a href='/home' className="flex items-center px-2 text-gray-900 rounded-lg  group">
                        <span className="ms-3 font-bold text-2xl">Connectify</span>
                     </a>
                  </li>
                  <li>
                     <a href="/home" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                     <GoHome className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Home</span>

                     </a>
                  </li>
                  <li>
                     <a href="/explore" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <MdOutlineTravelExplore className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>

                     </a>
                  </li>
                  <li>
                     <a href={`/messages`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                     <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                        <RiMessengerLine className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
                        </div>
                        {unreadMessages.length>0 && (
                           <span className="flex items-center justify-center w-6 h-6 text-white bg-red-600 rounded-full">
                           {unreadMessages.length}
                        </span>
                        )}
                             
                        </div>
                     </a>
                  </li>
                  <li>
                     <a onClick={()=>setOpenNotificationModal(true)} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                     <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                        <IoNotificationsOutline className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Notificatons</span>
                        </div>
                        {notifications.filter(item=>item.isSeen==false).length>0 && (
                           <span className="flex items-center justify-center w-6 h-6 text-white bg-red-600 rounded-full">
                           {notifications.filter(item=>item.isSeen==false).length}
                        </span>
                        )}
                             
                        </div>
                     </a>
                  </li>
                  
                  {user?.isPrivate && <li>
                     <a onClick={() => setOpenRequestModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group cursor-pointer">
                        <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                              <LiaUserFriendsSolid className='w-7 h-7'/>
                              <span className="flex-1 ms-3 whitespace-nowrap">Requests</span>
                           </div>
                           {requests?.length ? <span className="flex items-center justify-center w-6 h-6 text-white bg-red-600 rounded-full">
                              {requests.length || ''}
                           </span> : ''}
                        </div>
                     </a>
                  </li>}
                  <li>
                     <a onClick={() => setOpenModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group cursor-pointer">
                     <CgAdd className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Create post</span>
                     </a>
                  </li>

                  <li>
                     <a href={`/profile/${user?.username}`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <img src={user?.profilePic} className='w-7 h-7 rounded-full' alt="" />
                        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                     </a>
                  </li>
                  <li>
                     <a onClick={()=>setIsOpenSettingsModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group cursor-pointer">
                     <IoSettingsOutline className='w-7 h-7'/>
                        <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                     </a>
                  </li>
                  
                  <li onClick={() => store.dispatch(logout())}>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group ">
                        <CiLogout className='w-7 h-7 text-red-600'/>

                        <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                     </a>
                  </li>

                 
               </ul>
            </div>
         </aside>

         <div id="bottom-bar" className="fixed bottom-0 left-0 z-40 w-full h-16 bg-gray-50  md:hidden flex justify-around items-center">
            <a href="/home" className="text-gray-900  hover:text-gray-700 cursor-pointer">
               <GoHome className='w-8 h-8'/>
            </a>
            <a href={`/explore`} className="text-gray-900  hover:text-gray-700 cursor-pointer ">
               <IoSearch className='w-7 h-7'/>
            </a>
            {user?.isPrivate ? (
                <div className="relative inline-block">
                <a onClick={() => setOpenRequestModal(true)} className="text-gray-900 hover:text-gray-700 relative  cursor-pointer">
                  <LiaUserFriendsSolid className='w-8 h-8'/>
                  {requests?.length ? (
                    <span className="absolute top-0 -right-4 flex items-center justify-center w-6 h-6 text-xs text-white bg-red-600 rounded-full">
                      {requests.length}
                    </span>
                  ) : ''}
                </a>
              </div>
             
            ) : (
               <a onClick={() => setOpenModal(true)} className="text-gray-900  hover:text-gray-700 cursor-pointer">
               <CgAdd className='w-8 h-8'/>
            </a>
            )}
           
            <a onClick={()=>setIsOpenSettingsModal(true)} className="text-gray-900  hover:text-gray-700 cursor-pointer">
               <IoSettingsOutline className='w-7 h-7'/>
            </a>
            <a href={`/profile/${user?.username}`} className="text-gray-900  hover:text-gray-700 cursor-pointer">
               <CgProfile className='w-7 h-7'/>
            </a>
         </div>
          <SettingsModal isOpen={isOpenSettingsModal} onClose={()=>setIsOpenSettingsModal(false)} />
      </>
   )
}

export default LeftSideBar