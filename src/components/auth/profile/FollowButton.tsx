import { User } from '../../../types/loginUser'
import React from 'react'

interface FollowButtonInterface{
    user:User,
    loggedInUser:User,
    handleFollow:()=>void,
    handleUnfollow:()=>void,
    handleCancelRequest:()=>void
}

const FollowButton = ({ user, loggedInUser, handleFollow, handleUnfollow ,handleCancelRequest}:FollowButtonInterface) => {
//   return (
    if (!user || !loggedInUser) return null;
    const isRequested = user.requests?.includes(loggedInUser?._id as string);
    const isFollowing = loggedInUser.following?.includes(user._id as string);
  
    if (isRequested) {
      return <button onClick={handleCancelRequest} className='m-1  text-blue-400 bg-gray-100 font-semibold border-2 p-1 px-2 rounded-md'>Requested</button>;
    }
  
    if (isFollowing) {
      return <button onClick={handleUnfollow} className='m-1 bg-gray-600 text-white p-1 px-2 rounded-md'>Unfollow</button>;
    }
  
    return <button onClick={handleFollow} className='m-1 bg-gray-600 text-white p-1 px-2 rounded-md'>Follow</button>;
//   )
}

export default FollowButton