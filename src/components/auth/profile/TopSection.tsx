import { User } from 'firebase/auth'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import { StoreType } from '../../../redux/store'
import EditProfile from '../../../modals/profile/EditProfile'

const TopSection = ({posts}:{posts:string[]}) => {
    console.log('posts ',posts)
    const [openModal, setOpenModal] = useState(false)
    const user = useSelector((state: StoreType) => state.auth.user)
  return (
   <>
   <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} />
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
                                       <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{posts?.length || 0}</span>
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
                                   <p className="font-light font-medium leading-relaxed text-slate-600 mb-2">{user?.bio}</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
   </>
  )
}

export default TopSection