import { useEffect } from 'react'
import useConversation from '../../zustand/useConversation'
import { readNotifications } from '../../api/notfication'
import moment from 'moment'

const NotificationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void, }) => {
    if (!isOpen) {
        return null;
    }

    const { notifications, setReload } = useConversation()

    useEffect(() => {
        ReadNotifications()
    }, [notifications]);


    const ReadNotifications = async () => {
        try {
            await readNotifications()
        } catch (error) {
            console.log('error in reading notificaions ', error)
        }
    }

    const handleClose = () => {
        ReadNotifications()
        setReload()
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
                <div className="p-4 md:p-5 md:px-10 space-y-4 max-h-[600px] no-scrollbar overflow-y-auto">
                    {notifications?.length ? (
                        <>
                            {/* New Notifications */}
                            {notifications.filter(item => !item.isSeen).length > 0 && (
                                <div className='mb-10'>
                                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white m-2 mb-5">New Notifications</h3>
                                    {notifications.filter(item => !item.isSeen).map(item => (
                                        <div key={item._id} className="flex justify-between items-center p-1 mb-4">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={item.senderId.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                                                    alt={`${item.senderId.username} profile`}
                                                />
                                                <div className="ml-3 text-white">
                                                    <span className="block text-md font-semibold">
                                                        {`${item.senderId.username} ${item.event === 'follow'
                                                            ? 'started following you'
                                                            : item.event === 'like'
                                                                ? 'liked your post.'
                                                                : 'commented on your post.'}`}
                                                    </span>
                                                    <span className="text-sm font-thin text-gray-300">{moment(item.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                {item.postId?.image && (
                                                    <img
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                        src={item.postId?.image[0]}
                                                        alt={`post`}
                                                    />
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Seen Notifications */}
                            {notifications.filter(item => item.isSeen).length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white m-2 mb-4">Earlier Notifications</h3>
                                    {notifications.filter(item => item.isSeen).map(item => (
                                        <div key={item._id} className="flex justify-between items-center p-1 mb-4">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-10 h-10 rounded-full"
                                                    src={item.senderId.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                                                    alt={`${item.senderId.username} profile`}
                                                />
                                                <div className="ml-3 text-white">
                                                    <span className="block text-md font-semibold">
                                                        {`${item.senderId.username} ${item.event === 'follow'
                                                            ? 'started following you'
                                                            : item.event === 'like'
                                                                ? 'liked your post.'
                                                                : 'commented on your post.'}`}
                                                    </span>
                                                    <span className="text-sm font-thin text-gray-300">{moment(item.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                {item.postId?.image && (
                                                    <img
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                        src={item.postId?.image[0]}
                                                        alt={`post`}
                                                    />
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <h3 className="text-xl w-full text-center font-medium text-gray-900 dark:text-white">No new Notifications.</h3>
                    )}
                </div>

            </div>
        </div>
    );
};



export default NotificationModal