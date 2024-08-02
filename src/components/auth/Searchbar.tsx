import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchBar } from '../../contexts/SearchBarContext';
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import useGetUnreadMessages from '../../hooks/useGetUnreadMessages';
import useConversation from '../../zustand/useConversation';
import NotificationModal from '../../modals/home/NotificationModal';
import { CgAdd } from "react-icons/cg";
import CreatePost from '../../modals/post/CreatePost';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/explore');
    };

    const { searchValue, setSearchValue } = useSearchBar()
    const { unreadMessages } = useGetUnreadMessages()
    const { notifications } = useConversation()
    const [openNofificationModal, setOpenNotificationModal] = useState(false)
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false)
    const { user } = useSelector((state: StoreType) => state.auth)

    return (
        <>
            <CreatePost isOpen={openCreatePostModal} onClose={() => setOpenCreatePostModal(false)} />
            <NotificationModal isOpen={openNofificationModal} onClose={() => setOpenNotificationModal(false)} />
            <div className='w-full h-16 rounded-lg fixed  max-w-[1290px] top-1 z-30 md:bg-white bg-gray-200 md:m-1'>
                <div className='flex justify-between items-center h-full'>
                    <div className='w-1/4 flex justify-center'>
                        <span className='font-bold text-2xl ml-14 mx-5 md:hidden'>Sickomode.</span>
                    </div>
                    <div className='hidden md:block md:w-2/4 w-full flex justify-center mr-3 md:mr-0 relative'>
                        <input
                            type='text'
                            className='w-full h-10 p-2 pl-4 pr-10 border-2  rounded-full outline-none'
                            placeholder='Search...'
                            onClick={handleRedirect}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <svg className='w-6 h-6 absolute right-3 top-2.5 text-gray-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.5 3.5a7.5 7.5 0 015.65 13.15z" />
                        </svg>
                    </div>
                    <div className='md:w-1/4 justify-center flex cursor-pointer'>
                        {user?.isPrivate && (
                            <div className='relative mx-2 md:hidden block'>
                                <CgAdd className='w-8 h-8 ' onClick={() => setOpenCreatePostModal(true)} />
                            </div>
                        )}

                        <div className='relative mx-2 md:hidden block cursor-pointer'>
                            <IoNotificationsOutline className='w-8 h-8 ' onClick={() => setOpenNotificationModal(true)} />
                            {notifications.filter(item => item.isSeen == false).length > 0 && (
                                <span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                                    {notifications.filter(item => item.isSeen == false).length}
                                </span>
                            )}
                        </div>
                        <div className='relative mx-2 mr-3 md:hidden block '>
                            <a href={`/messages`}>
                                <LuSend className='w-7 h-7 md:hidden block' />
                                {unreadMessages.length > 0 &&
                                    <span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                                        {unreadMessages.length}
                                    </span>
                                }
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
