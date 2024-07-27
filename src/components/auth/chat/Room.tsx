import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSocket } from '../../../contexts/SocketContext';
import { setIncomingVideoCall, setRoomId, setShowVideoCall, setVideoCall } from '../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import useConversation from '../../../zustand/useConversation';


const Room = () => {
    const navigate = useNavigate();
    const meetingRef = useRef(null);
    const { socket } = useSocket()
    const dispatch = useDispatch()
    const { selectedFriend } = useConversation()
    const { incomingVideoCall, roomId } = useSelector((state: StoreType) => state.auth)

    useEffect(() => {
        const incomingcalluserid = incomingVideoCall?._id
        const appId= Number(import.meta.env.VITE_ZEGO_APP_ID)
        const serverSecret=import.meta.env.VITE_ZEGO_SERVERSECRET

        //@ts-ignore
        const roomIdStr = roomId.toString()
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomIdStr, Date.now().toString(), "naveen");
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: meetingRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // 1-on-1 call scenario
            },
            turnOnMicrophoneWhenJoining: true, // Automatically turn on the microphone when joining
            turnOnCameraWhenJoining: true, // Automatically turn on the camera when joining
            showPreJoinView: false, // Skip the pre-join view
            onLeaveRoom: () => {
                socket?.emit('leave-room', ({ to: incomingcalluserid ? incomingcalluserid : selectedFriend?._id }));
                // This callback is called when the user leaves the room 
                dispatch(setShowVideoCall(false))
                dispatch(setRoomId(null))
                dispatch(setVideoCall(null))
                dispatch(setIncomingVideoCall(null))
            },
        });

        socket?.on('user-left', () => {
            // Leave the Zego room and navigate to the previous route
            zp.destroy();
            // navigate(-1);
            dispatch(setShowVideoCall(false))
            dispatch(setRoomId(null))
            dispatch(setVideoCall(null))
            dispatch(setIncomingVideoCall(null))
            localStorage.removeItem('roomId')
            localStorage.removeItem('showVideoCall')
        });

        // Cleanup when the component unmounts
        return () => {
            zp.destroy(); // Use destroy method to clean up the instance
        };
    }, [roomId, navigate]);

    return (
        <div className='z-50 overflow-y-hidden' ref={meetingRef} style={{ width: '100%', height: '100vh' }}></div>
    );
};

export default Room;
