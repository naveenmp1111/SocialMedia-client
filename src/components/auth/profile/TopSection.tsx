import { User } from '../../../types/loginUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store'
import EditProfile from '../../../modals/profile/EditProfile'
import { cancelRequest, followUser, getFollowers, getFollowing, getUserByUsername, removeFollower, unfollowUser } from '../../../api/user'
import { FollowerData } from '../../../types/userProfile'
import { getUserById } from '../../../api/profile'
import { useParams } from 'react-router-dom'
import FollowButton from './FollowButton'
import FollowersModal from '../../../modals/profile/ConnectionsModal'
import ConnectionsModal from '../../../modals/profile/ConnectionsModal'
import { isAxiosError } from 'axios'
import {toast} from 'react-toastify'
import { PostDataInterface } from '../../../types/post'

const TopSection = ({ postsLength}: { postsLength: number}) => {

    const [reload, setReload] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchMyData()
    }, [])

    useEffect(() => {
        fetchAdditionalData()
    }, [reload,openModal])


    const { username } = useParams<{ username: string }>();

    
    const [openConnectionsModal,setOpenConnectionsModal]=useState(false)
    const [userData, setUserData] = useState<User>()
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const user = userData?._id == userInRedux?._id ? userInRedux : userData
    const [followers, setFollowers] = useState<FollowerData[]>([])
    const [following, setFollowing] = useState<FollowerData[]>([])
    const [loggedInUser, setLoggedInUser] = useState<User>()
    const [isFollowersList,setIsFollowersList]=useState<boolean>(false)


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

    const handleCancelRequest=async()=>{
        await cancelRequest(username as string)
        setReload(prev=>!prev)
    }

    const handleFollowersModal=async()=>{
        setIsFollowersList(true)
        setOpenConnectionsModal(true)
    }

    const handleFollowingModal=async()=>{
        setIsFollowersList(false)
        setOpenConnectionsModal(true)
    }

    const closeConnectionModal=()=>{
        setOpenConnectionsModal(false)
        setReload(prev=>!prev)
    }

    const handleRemoveFollower = async(username: string) => {
        // Handle accept logic
       try {
        await removeFollower(username)
        setFollowers((prev) => (prev || []).filter((user) => user.username !== username));
       } catch (error) {
         if(isAxiosError(error)){
           toast.error(error.message)
           console.log(error)
         }
       }
     };

    return (
        <>
            <ConnectionsModal isOpen={openConnectionsModal} onClose={closeConnectionModal} followers={followers} following={following} isFollowersList={isFollowersList} handleRemoveFollower={handleRemoveFollower}/>
            <EditProfile isOpen={openModal} onClose={() => setOpenModal(false)} />
            <div className="relative mt-6 min-w-0 break-words bg-white w-full mb-4 shadow-lg rounded-xl">


                {(user?._id == userInRedux?._id) && (
                    <div className="absolute top-4 right-4">
                        <button className='m-1 bg-gray-600 text-white p-1 px-2 rounded-md' onClick={() => setOpenModal(true)}>Edit profile</button>
                    </div>
                )}


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
                                <p className="font-light font-medium leading-relaxed text-slate-600 mb-2">{user?.bio}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

        </>
    )
}

export default TopSection