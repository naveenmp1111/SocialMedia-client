const END_POINT = {
    LOGIN_USER: 'api/auth/login',
    SIGNUP_USER: 'api/auth/signup',
    USERNAME_AVAILABILITY: 'api/auth/usernameAvailability',
    EMAIL_AVAILBILITY: 'api/auth/emailAvailability',
    SEND_OTP: 'api/auth/sendOtp',
    VERIFY_OTP: 'api/auth/verifyOtp',
    LOGIN_GOOGLE: 'api/auth/google_auth',
    EDIT_PROFILE: 'api/profile/editProfile',
    GET_USERS_FOR_ADMIN: 'api/admin/getAllUsersForAdmin',
    BLOCK_USER: 'api/admin/blockUser',
    UNBLOCK_USER: 'api/admin/unblockUser',
    REFRESH_ACCESS_TOKEN: 'api/auth/refresh-access-token',
    CREATE_POST: 'api/post/createPost',
    GET_POSTS_BY_USER: 'api/post/getPostsByUser',
    EDIT_POST: 'api/post/editPost',
    DELETE_POST: 'api/post/deletePost',
    GET_ALL_POSTS: 'api/post/getAllPosts',
    GET_ALL_POSTS_TO_EXPLORE: 'api/post/getAllPostsToExplore',
    RESET_PASSWORD: 'api/auth/resetPassword',
    GET_REST_OF_ALL_USERS: 'api/user/getRestOfAllUsers',
    GET_SUGGESTED_USERS: 'api/user/getSuggestedUsers',
    GET_USER_BY_ID: 'api/profile/getUserById',
    GET_USER_BY_USERNAME: 'api/profile/getUserByUsername',
    FOLLOW_USER: 'api/user/followUser',
    UNFOLLOW_USER: 'api/user/unfollowUser',
    REMOVE_FOLLOWER: 'api/user/removeFollower',
    GET_FOLLOWERS: 'api/user/getFollowers',
    GET_FOLLOWING: 'api/user/getFollowing',
    GET_REQUESTS: 'api/user/getRequests',
    ACCEPT_REQUEST: 'api/user/acceptRequest',
    REPORT_POST: 'api/post/reportPost',
    GET_POST_REPORTS: 'api/admin/getPostReports',
    BLOCK_POST: 'api/admin/blockPost',
    UNBLOCK_POST: 'api/admin/unblockPost',
    LIKE_POST: 'api/post/likePost',
    UNLIKE_POST: 'api/post/unlikePost',
    SAVE_POST: 'api/user/savePost',
    UNSAVE_POST: 'api/user/unsavePost',
    GET_SAVED_POSTS: 'api/user/getSavedPosts',
    GET_TAGGED_POSTS: 'api/post/getTaggedPosts',
    CANCEL_REQUEST: 'api/user/cancelRequest',
    DECLINE_REQUEST: 'api/user/declineRequest',
    ADD_COMMENT: 'api/post/addComment',
    GET_COMMENTS: 'api/post/getComments',
    ADD_REPLY: 'api/post/addReply',
    BLOCK_USER_BY_USERNAME: 'api/user/blockUserByUsername',
    UNBLOCK_USER_BY_USERNAME: 'api/user/unblockUserByUsername',
    GET_BLOCKED_USERS: 'api/user/getBlockedUsers',
    CREATE_CHAT: 'api/chat/createOrAccessChat',
    FETCH_CHATS: 'api/chat/fetchChats',
    GET_FULL_MESSAGES_FROM_CHAT: 'api/message/getFullMessagesFromChat',
    GET_UNREAD_MESSAGES_FROM_CHAT: 'api/message/getUnreadMessagesFromChat',
    GET_ALL_UNREAD_MESSAGES: 'api/message/getAllUnreadMessages',
    SEND_MESSAGE: 'api/message/sendMessage',
    SET_UNREAD_MESSAGES_READ: 'api/message/setUnreadMessagesRead',
    DELETE_MESSAGE: 'api/message/deleteMessage',
    DELETE_MESSAGE_FOR_ME: 'api/message/deleteMessageForMe',
    GET_NOTIFICATIONS: 'api/notification/getNotifications',
    READ_NOTIFICATIONS: 'api/notification/readNotifications',
    GET_WEEKLY_DATA: 'api/admin/getWeeklyData',
    GET_MONTHLY_DATA: 'api/admin/getMonthlyData',
    GET_YEARLY_DATA: 'api/admin/getYearlyData',
    GET_ALL_POSTS_FOR_ADMIN: 'api/admin/getAllPostsForAdmin'
}

export default END_POINT