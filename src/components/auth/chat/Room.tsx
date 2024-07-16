import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSocket } from '../../../contexts/SocketContext';
import { setIncomingVideoCall } from '../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import IncomingVideoCall from './IncomingVideoCall';
import { StoreType } from '../../../redux/store';
import useConversation from '../../../zustand/useConversation';


const Room = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const meetingRef = useRef(null);
    const {socket}=useSocket()
    const dispatch=useDispatch()
    const {selectedFriend}=useConversation()
    const {incomingVideoCall}=useSelector((state:StoreType)=>state.auth)

    useEffect(() => {
        const incomingcalluserid=incomingVideoCall?._id
        dispatch(setIncomingVideoCall(null))
        const appId = 1810170859;
        const serverSecret = "d3a64c62f0f0dad197d518cb5d7dc347";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId as string, Date.now().toString(), "naveen");
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
                socket?.emit('leave-room', ({to: incomingcalluserid ? incomingcalluserid : selectedFriend?._id}));
                // This callback is called when the user leaves the room
                navigate(-1); // Redirect to the previous route
            },
        });

        socket?.on('user-left', () => {
            // Leave the Zego room and navigate to the previous route
            zp.destroy();
            navigate(-1);
        });
        

        // Cleanup when the component unmounts
        return () => {
            console.log('return works')
            zp.destroy(); // Use destroy method to clean up the instance
       
        };
    }, [roomId, navigate]);

    return (
        <div className='z-50' ref={meetingRef} style={{ width: '100%', height: '100vh' }}></div>
    );
};

export default Room;
