import React, { useEffect, useState } from 'react'
import { blockUser, getAllUsers, unblockUser } from '../../api/admin'
import { User } from '../../types/loginUser';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';



const Userslist = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const usersData = await getAllUsers()
        setUsers(usersData.users)
    }

    const blockUnblock = (userId: any, isBlock: any) => {
        Swal.fire({
            title: isBlock ? 'Unblock' : 'Block',
            text: `Are you sure you want to ${isBlock ? 'Unblock' : 'Block'} User ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isBlock ? 'Unblock User' : 'Block User',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                if (isBlock) {
                    handleUnBlockUser(userId)
                } else {
                    handleBlockUser(userId)
                }
            }
        })
    }

    const handleBlockUser = async (userId: string) => {
        try {
            const response = await blockUser(userId)
            toast.success(response.message)

                setUsers(prev =>
                    prev.map(user =>
                        user._id == userId ? { ...user, isBlock: true } : user)
                )
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }

        }
    }

    const handleUnBlockUser = async (userId: string) => {
        try {
            const response = await unblockUser(userId)
            toast.success(response.message)
            setUsers(prev =>
                prev.map(user =>
                    user._id == userId ? { ...user, isBlock: false } : user)
            )
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
    }

    console.log('usres lsf ', users)
    return (
        <>
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 sm:bottom-bar-hidden" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
         <ul className="space-y-5 font-medium">
            <li className='m-7'>
               <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ms-3 font-bold text-2xl">Connectify</span>
               </a>
            </li>
            <li>
               <a href="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                     <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
               </a>
            </li>
            <li>
               <a href="admin/users-list" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                     <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users List</span>
               </a>
            </li>
         </ul>
      </div>
   </aside>
    
    <div className='sm:ml-64'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-5">
                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {users && users.map(user => (
                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={user.profilePic} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                        <div className="font-normal text-gray-500">{user.username}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlock ? (<div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Blocked
                                    </div>) : (<div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                    </div>)}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlock ? (<button className='bg-green-600 px-2 rounded-md py-1 text-white hover:bg-green-400 w-16' onClick={() => blockUnblock(user._id, user.isBlock)}>Unblock</button>) : (<button className='bg-red-600 px-2 w-16 rounded-md py-1 text-white hover:bg-red-400' onClick={() => blockUnblock(user._id, user.isBlock)}>Block</button>)}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




            </div>
    </>

    )
}

export default Userslist