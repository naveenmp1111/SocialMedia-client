import { useEffect, useState } from 'react'
import { getFollowing } from '../../api/user'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import { FollowerData } from '../../types/userProfile'
import { FaRegCommentDots } from 'react-icons/fa';
import { createOrAccessChat } from '../../api/chat'
import useConversation from '../../zustand/useConversation'

const NewChatList = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null

    const userinRedux = useSelector((state: StoreType) => state.auth.user)
    const [following, setFollowing] = useState<FollowerData[]>([])
    const { setSelectedFriend, setSelectedConversation } = useConversation()

    const fetchFollowing = async () => {
        const response = await getFollowing(userinRedux?.username as string)
        setFollowing(response.users)
    }

    const handleStartChat = async (user: FollowerData) => {
        const response = await createOrAccessChat({ otherUserId: user?._id as string })
        const selectedUserObj = {
            _id: user._id as string,
            name: user.name as string,
            profilePic: user.profilePic as string,
            username: user.username as string
        }
        setSelectedConversation(response.chat)
        setSelectedFriend(selectedUserObj)
        onClose()
    }

    useEffect(() => {
        fetchFollowing()
    }, [])

    //search
    const [searchInput, setSearchInput] = useState<string>('')
    const filteredFollowing = following.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
        >
            <div className="relative w-full max-w-lg max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Start Chat
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="small-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* Modal body */}
                <div className='w-full px-3'>
                    <input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='Search...' className='w-full p-2 my-2 rounded-2xl outline-none bg-gray-500 text-white' />
                </div>
                <div className="p-4 md:p-5 md:px-10 space-y-4 max-h-96 overflow-y-auto">

                    {filteredFollowing?.length ? filteredFollowing?.map(user => (
                        <div onClick={() => handleStartChat(user)} key={user._id} className="flex justify-between items-center p-1 mb-4">
                            <div className="flex items-center">
                                <img className="w-14 h-14 rounded-full" src={user.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt={`${user.username} profile`} />
                                <div className="ml-3 text-white">
                                    <span className="block text-md font-semibold">{user.username}</span>
                                    <span className="block text-gray-300 text-xs">{user.name}</span>
                                </div>
                            </div>
                            <div>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <FaRegCommentDots size={25} className='cursor-pointer text-gray-300' />
                                </div>

                            </div>
                        </div>
                    )) : <h3 className="text-xl w-full text-center font-medium text-gray-900 dark:text-white">
                        Follow friends to start chat.
                    </h3>}
                </div>
            </div>
        </div>
    );
}

export default NewChatList