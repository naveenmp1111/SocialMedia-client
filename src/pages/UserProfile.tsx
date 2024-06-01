import React, { useEffect, useState } from 'react'

{/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button> */}

import { useSelector } from 'react-redux'
import { StoreType } from '../redux/store'
import EditProfile from '../modals/EditProfile'



const UserProfile = () => {

    const [openModal, setOpenModal] = useState(false)
    const [user, setUser] = useState<any>(null)
    const userData = useSelector((state: StoreType) => state.auth.user)
    console.log('userData is ', userData)

    useEffect(() => {
        setUser(userData)
    }, [userData])


    return (
        <>
            <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} />
            <div className="p-10 px-16  mt-14">
                <div className="relative m mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img src={user?.profilePic} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                    {/* <button className="absolute top-14 left-10 mb-2 mr-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
        edit image
    </button> */}
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
                                <button className='m-2 ' onClick={() => setOpenModal(true)}>Edit profile</button>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user?.username}</h3>
                            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{user?.name}
                            </div>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4">
                                    <p className="font-light leading-relaxed text-slate-600 mb-4">{user?.bio}</p>
                                    <a href="javascript:;" className="font-normal text-slate-700 hover:text-slate-400">Follow Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">Welcome</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">Content goes here</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">Item 1</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">Item 2</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">Item 3</p>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">More content here</p>
            </div>
        </div>
    </div> */}
            </div>

        </>
    )
}

export default UserProfile