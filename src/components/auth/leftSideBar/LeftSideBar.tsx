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
import { BiMessageSquareDetail } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { getNotifications } from '../../../api/notfication'
import NotificationModal from '../../../modals/home/NotificationModal'

const LeftSideBar = () => {
   const [openModal, setOpenModal] = useState(false)
   const user = useSelector((state: StoreType) => state.auth.user)


   //request part-----------------------------------------------------------

   const [openRequestModal, setOpenRequestModal] = useState<boolean>(false)
   const [requests, setRequests] = useState<User[] | null>([])
   const {notifications,setNotifications}=useConversation()
   const [openNofificationModal,setOpenNotificationModal]=useState(false)
   // const [unreadNotifications,setUnreadNotifications]=useState(0)


   useEffect(() => {
      fetchRequests()
   }, [])

   useEffect(() => {
      fetchNotifications()
   }, [requests])

   const fetchNotifications=async()=>{
      try {
         const response=await getNotifications()
         console.log('response from get notificaoins is ',response)
         setNotifications(response.notifications)
         // let UnreadNotifications=notifications.filter(item=>item.isSeen==false)
         // setUnreadNotifications(UnreadNotifications.length)
      } catch (error) {
         console.log('error is ',error)
      }
   }

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
         <NotificationModal isOpen={openNofificationModal} onClose={()=>setOpenNotificationModal(false)} fetchNotification={fetchNotifications}/>
         <RequestModal isOpen={openRequestModal} onClose={() => setOpenRequestModal(false)} requests={requests} onAccept={handleAccept} onDecline={handelDecline}/>
         <CreatePost isOpen={openModal} onClose={() => setOpenModal(false)} />
         <aside id="default-sidebar" className="fixed top-24  z-40    w-64 h-screen max-h-[650px] transition-transform -translate-x-full md:translate-x-0 md:bottom-bar-hidden" aria-label="Sidebar">
            <div className="h-full px-5 py-3 overflow-y-auto bg-white  rounded-lg">
               <ul className="space-y-4 font-medium itme">
                  <li className='m-7'>
                     <a className="flex items-center p-2 text-gray-900 rounded-lg  group">
                        <span className="ms-3 font-bold text-2xl">Connectify</span>
                     </a>
                  </li>
                  <li>
                     <a href="/home" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                           <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Home</span>

                     </a>
                  </li>
                  <li>
                     <a onClick={() => setOpenModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group cursor-pointer">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Create post</span>
                     </a>
                  </li>
                  {user?.isPrivate && <li>
                     <a onClick={() => setOpenRequestModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group cursor-pointer">
                        <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                 <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                              </svg>
                              <span className="flex-1 ms-3 whitespace-nowrap">Requests</span>
                           </div>
                           {requests?.length ? <span className="flex items-center justify-center w-6 h-6 text-white bg-red-600 rounded-full">
                              {requests.length || ''}
                           </span> : ''}
                        </div>
                     </a>
                  </li>}

                  <li>
                     <a href={`/profile/${user?.username}`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                     </a>
                  </li>
                  <li>
                     <a onClick={()=>setIsOpenSettingsModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                     </a>
                  </li>
                  <li>
                     <a onClick={()=>setOpenNotificationModal(true)} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                     <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z" />
                        </svg>
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
                  <li onClick={() => store.dispatch(logout())}>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-12H8c-1.1 0-2 .9-2 2v4h2V5h11v14H8v-2H6v4c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2z" />
                        </svg>

                        <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                     </a>
                  </li>

                  <li>
                     <a href={`/messages`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-200  group">
                     <div className='flex justify-between w-full'>
                           <div className='flex items-center'>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z" />
                        </svg>
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
               </ul>
            </div>
         </aside>

         <div id="bottom-bar" className="fixed bottom-0 left-0 z-40 w-full h-16 bg-gray-50  md:hidden flex justify-around items-center">
            <a href="/home" className="text-gray-900  hover:text-gray-700 ">
               <GoHome className='w-8 h-8'/>
            </a>
            <a href={`/messages`} className="text-gray-900  hover:text-gray-700 ">
               <BiMessageSquareDetail className='w-7 h-7'/>
            </a>
            <a href="#" className="text-gray-900  hover:text-gray-700 ">
               <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
               </svg>
            </a>
            <a href="#" className="text-gray-900  hover:text-gray-700 ">
               <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2Z" />
               </svg>
            </a>
            <a href={`/profile/${user?.username}`} className="text-gray-900  hover:text-gray-700 ">
               <CgProfile className='w-7 h-7'/>
            </a>
         </div>
          <SettingsModal isOpen={isOpenSettingsModal} onClose={()=>setIsOpenSettingsModal(false)} />
      </>
   )
}

export default LeftSideBar