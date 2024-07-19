import { User } from '../../../types/loginUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import EditProfile from '../../../modals/profile/EditProfile'
import { blockUserByUsername, cancelRequest, followUser, getFollowers, getFollowing, getUserByUsername, removeFollower, unfollowUser } from '../../../api/user'
import { FollowerData } from '../../../types/userProfile'
import { useParams, useNavigate } from 'react-router-dom'
import FollowButton from './FollowButton'
import ConnectionsModal from '../../../modals/profile/ConnectionsModal'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

const TopSection = ({ postsLength }: { postsLength: number }) => {

    const [reload, setReload] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        fetchMyData()
    }, [])

    useEffect(() => {
        fetchAdditionalData()
    }, [reload, openModal])


    const { username } = useParams<{ username: string }>();


    const [openConnectionsModal, setOpenConnectionsModal] = useState(false)
    const [userData, setUserData] = useState<User>()
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const user = userData?._id == userInRedux?._id ? userInRedux : userData
    const [followers, setFollowers] = useState<FollowerData[]>([])
    const [following, setFollowing] = useState<FollowerData[]>([])
    const [loggedInUser, setLoggedInUser] = useState<User>()
    const [isFollowersList, setIsFollowersList] = useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    const fetchMyData = async () => {
        const userInfo = await getUserByUsername(username as string)
        setUserData(userInfo?.user)
        const loggedUser = await getUserByUsername(userInRedux?.username as string)
        setLoggedInUser(loggedUser.user)
    }

    const fetchAdditionalData = async () => {
        const followersData = await getFollowers(username as string)
        setFollowers(followersData.users)
        const followingData = await getFollowing(username as string)
        setFollowing(followingData.users)
        const userData = await getUserByUsername(username as string)
        setUserData(userData?.user)
        const loggedUser = await getUserByUsername(userInRedux?.username as string)
        setLoggedInUser(loggedUser.user)
    }

    const handleFollow = async () => {
        if (typeof username == 'string') {
            await followUser({ friendUsername: username })
            setReload(prev => !prev);
        }
    }

    const handleUnfollow = async () => {
        if (typeof username == 'string')
            await unfollowUser({ friendUsername: username })
        setReload(prev => !prev);
    }

    const handleCancelRequest = async () => {
        await cancelRequest(username as string)
        setReload(prev => !prev)
    }

    const handleFollowersModal = async () => {
        if (userData?.isPrivate && userData._id != userInRedux?._id && !userData.followers?.includes(userInRedux?._id as string)) return
        setIsFollowersList(true)
        setOpenConnectionsModal(true)
    }

    const handleFollowingModal = async () => {
        if (userData?.isPrivate && userData._id != userInRedux?._id && !userData.followers?.includes(userInRedux?._id as string)) return
        setIsFollowersList(false)
        setOpenConnectionsModal(true)
    }

    const closeConnectionModal = () => {
        setOpenConnectionsModal(false)
        setReload(prev => !prev)
    }

    const handleRemoveFollower = async (username: string) => {
        try {
            await removeFollower(username)
            setFollowers((prev) => (prev || []).filter((user) => user.username !== username));
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.message)
                console.log(error)
            }
        }
    };

    const BlockUser = async () => {
        try {
            await blockUserByUsername(user?.username as string)
            toast.success(`Blocked ${user?.username} `)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ConnectionsModal isOpen={openConnectionsModal} onClose={closeConnectionModal} followers={followers} following={following} isFollowersList={isFollowersList} handleRemoveFollower={handleRemoveFollower} />
            <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} />

            <div className="relative md:mt-6 mt-12 min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded-xl">
                <div className='absolute top-4 right-4'>
                    <div className='cursor-pointer' onClick={toggleDropdown}>
                        <svg fill="#262626" height="30" viewBox="0 0 48 48" width="30">
                            <path d="M24 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                        </svg>
                    </div>

                    {showDropdown && (
                        <div id="dropdownDotsHorizontal" className="absolute right-6 top-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 cursor-pointer" aria-labelledby="dropdownMenuIconHorizontalButton">
                                {(user?._id == userInRedux?._id) ? (
                                    <li onClick={() => { setOpenModal(true); setShowDropdown(prev => !prev) }}>
                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white w-full">Edit Profile</a>
                                    </li>
                                ) : (
                                    <li onClick={BlockUser}>
                                        <a className="block px-4 py-2 text-red-500 font-semibold  dark:hover:text-white w-full">Block {user?.name}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                </div>
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
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{postsLength || 0}</span>
                                    <span className="text-sm text-slate-400">Photos</span>
                                </div>
                                <div className="p-3 text-center cursor-pointer" onClick={handleFollowersModal}>
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{followers?.length || 0}</span>
                                    <span className="text-sm text-slate-400">Followers</span>
                                </div>

                                <div className="p-3 text-center cursor-pointer" onClick={handleFollowingModal}>
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{following?.length || 0}</span>
                                    <span className="text-sm text-slate-400">Following</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-center mt-2 pb-2">
                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user?.username}</h3>
                        <div className="text-xs mt-0 mb-3 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{user?.name}
                        </div>

                        {
                            user?._id !== userInRedux?._id && user && loggedInUser && (
                                <FollowButton
                                    user={user}
                                    loggedInUser={loggedInUser}
                                    handleFollow={handleFollow}
                                    handleUnfollow={handleUnfollow}
                                    handleCancelRequest={handleCancelRequest}
                                />
                            )
                        }

                    </div>
                    {user?.bio && (<div className="mt-1 py-3 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full">
                                <p className="font-medium leading-relaxed text-slate-600 mb-2">{user?.bio}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

        </>
    )
}

export default TopSection