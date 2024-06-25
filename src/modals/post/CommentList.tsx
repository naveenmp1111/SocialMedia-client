import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
import { CommentInterface } from '../../types/post'
import { useCommentInputContext } from '../../contexts/CommentInputContext'
import { formatDistanceToNow } from 'date-fns';

const CommentList = ({comment,allComments,handleTargetCommentId,setIsReply}:{comment:CommentInterface,allComments:CommentInterface[],handleTargetCommentId:(id:string)=>void,setIsReply: Dispatch<SetStateAction<boolean>>}) => {
    const [replies,setReplies]=useState<CommentInterface[]>([])
    const [showReplies,setShowReplies]=useState(false)
    const { commentInputRef } = useCommentInputContext();

    const handleReplies=()=>{
        // console.log('commment is id is ',comment._id)
        let Replies=allComments.filter(item=>item.parentId===comment._id)
        allComments.map(item=>{
            console.log('itemid did ',item._id,comment._id)
        })
        setReplies(Replies)
    }

    const handleReplyComment=()=>{
      if(commentInputRef.current)
        commentInputRef.current.value=`@${comment.user?.username}`
      handleTargetCommentId(comment._id)
      setIsReply(true)
    }

    const formatDateToTimeAgo = (date: Date | number): string => {
      return formatDistanceToNow(date, { addSuffix: true });
    };

    useEffect(()=>{
        handleReplies()
    },[])

    console.log('reply comments ',replies)
  return (
    <div style={{ marginLeft: comment.parentId ? '20px' : '0px', marginTop: '10px' }}>
      <div className="bg-gray-800 p-3 rounded-lg text-white">
        <div className="flex items-center">
          <img src={comment?.user?.profilePic} alt={comment?.user?.username} className="w-8 h-8 rounded-full mr-3" />
          <div>
            {/* <p className="font-semibold">{comment?.user?.name}</p> */}
            <p className="text-md font-bold text-gray-300">{comment.user?.username}</p>
          </div>
        </div>
        <p className="mt-2">{comment?.comment}</p>
        <div className='w-full flex justify-between'>
        <span className='mt-2 font-semibold text-gray-400 text-sm'>{formatDateToTimeAgo(comment.createdAt)}</span>
        <button className='m-1 font-semibold text-gray-400' onClick={handleReplyComment}>Reply</button>
        </div>
        
      </div>
      {replies.length>0 && <button className='text-gray-300' onClick={()=>{setShowReplies(!showReplies)}}>-{showReplies ? 'hide replies' : 'show replies'}-</button>}
      
      {showReplies && replies.map(reply => (
        <CommentList key={reply._id} comment={reply} allComments={allComments} handleTargetCommentId={handleTargetCommentId} setIsReply={setIsReply}/>
      ))}
      
    </div>
  )
}

export default CommentList