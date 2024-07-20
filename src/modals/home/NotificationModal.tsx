import { useEffect, useState } from 'react'
import { getUserById } from '../../api/profile'
import { StoreType } from '../../redux/store'
import { useSelector } from 'react-redux'
import { User } from '../../types/loginUser'
import useConversation from '../../zustand/useConversation'
import { readNofifications } from '../../api/notfication'



const NotificationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) {
        return null;
    }

    const user = useSelector((state: StoreType) => state.auth.user);

    const [loggedInUser, setLoggedInUser] = useState<User>();
    // const [reload,setReload]=useState<boolean>(false)
    const { notifications } = useConversation()

    useEffect(() => {
        fetchUserData();
        ReadNotifications()
    }, []);

    const fetchUserData = async () => {
        const userData = await getUserById(user?._id as string);
        setLoggedInUser(userData.user);
    };

    const ReadNotifications=async()=>{
        try {
            const response=await readNofifications()
        } catch (error) {
            console.log('error in reading notificaions ',error)
        }
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
        >
            <div className="relative w-full max-w-lg max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Notifications
                    </h3>
                    <button
                        type="button"
                        onClick={handleClose}
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
                <div className="p-4 md:p-5 md:px-10 space-y-4 max-h-96 overflow-y-auto">
                    {notifications?.length ? notifications?.map(item => (
                        <div className="flex justify-between items-center p-1 mb-4">
                            <div className="flex items-center">
                                <img className="w-14 h-14 rounded-full" src={"https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt={` profile`} />
                                <div className="ml-3 text-white">
                                    <span className="block text-md font-semibold">{'some one like something....'}</span>
                                    {/* <span className="block text-gray-300 text-xs">{user.name}</span> */}
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    )) : <h3 className="text-xl w-full text-center font-medium text-gray-900 dark:text-white">
                        No new Notifications.
                    </h3>}
                </div>
            </div>
        </div>
    );
};



export default NotificationModal