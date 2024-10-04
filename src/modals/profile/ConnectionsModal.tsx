import { useEffect, useState } from 'react';
import { FollowerData } from '../../types/userProfile';
import { User } from '../../types/loginUser';
import { followUser, getUserByUsername, unfollowUser } from '../../api/user';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

const ConnectionsModal = ({ isOpen, onClose, followers, following, isFollowersList, handleRemoveFollower }: { isOpen: boolean; onClose: () => void; followers: FollowerData[], following: FollowerData[], isFollowersList: boolean, handleRemoveFollower: (username: string) => void }) => {

    if (!isOpen) {
        return null;
    }

    const [reload, setReload] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const userInRedux = useSelector((state: StoreType) => state.auth.user);
    const { username } = useParams();
    const navigate = useNavigate()

    const fetchMyData = async () => {
        const loggedUser = await getUserByUsername(userInRedux?.username as string);
        setLoggedInUser(loggedUser.user);
    };

    useEffect(() => {
        fetchMyData();
    }, [reload]);

    const handleFollow = async (username: string) => {
        await followUser({ friendUsername: username })
        setReload(prev => !prev)
    };

    const handleUnfollow = async (username: string) => {
        await unfollowUser({ friendUsername: username })
        setReload(prev => !prev)
    };

    const handleRemove = async (username: string) => {
        handleRemoveFollower(username)
        setReload(prev => !prev)
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
        >
            <div className="relative w-full max-w-lg max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        {isFollowersList ? "Followers List" : "Following List"}
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
                <div className="p-4 md:p-5 md:px-10 space-y-4 max-h-96 overflow-y-auto">
                    {(isFollowersList ? followers : following)?.map((user, index) => (
                        <div key={index} className="flex justify-between items-center p-1 mb-4 cursor-pointer" onClick={() => {
                            navigate(`/profile/${user.username}`)
                            onClose()
                        }}>
                            <div className="flex items-center">
                                <img
                                    className="w-14 h-14 rounded-full"
                                    src={user.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                                    alt={`${user.username} profile`}
                                />
                                <div className="ml-3 text-white">
                                    <span className="block text-md font-semibold">{user.username}</span>
                                    <span className="block text-gray-300 text-xs">{user.name}</span>
                                </div>
                            </div>
                            {loggedInUser?.username !== user.username && (isFollowersList ? (
                                loggedInUser?.username === username ? (
                                    <button
                                        className="px-2 text-md max-h-6 bg-white rounded-md mt-2"
                                        onClick={() => handleRemove(user.username)}
                                    >
                                        Remove
                                    </button>
                                ) : loggedInUser?.following && loggedInUser?.following?.find(friendId => friendId === user._id) ? (
                                    <button
                                        className="px-2 text-md max-h-6 bg-white rounded-md mt-2"
                                        onClick={() => handleUnfollow(user.username)}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        className="px-2 text-md max-h-6 bg-white rounded-md mt-2"
                                        onClick={() => handleFollow(user.username)}
                                    >
                                        Follow
                                    </button>
                                )
                            ) : (
                                loggedInUser?.following && loggedInUser.following.find(friendId => friendId === user._id) ? (
                                    <button
                                        className="px-2 text-md max-h-6 bg-white rounded-md mt-2"
                                        onClick={() => handleUnfollow(user.username)}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        className="px-2 text-md max-h-6 bg-white rounded-md mt-2"
                                        onClick={() => handleFollow(user.username)}
                                    >
                                        follow
                                    </button>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectionsModal;
