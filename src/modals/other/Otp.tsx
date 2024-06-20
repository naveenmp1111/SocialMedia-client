import React, { useEffect, useState } from 'react';
import { sendOtp, signupUser, verifyOtp } from '../../api/auth'
import { SignupUserInterface } from '../../types/signupUser';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { TOAST_ACTION } from '../../constants/common';


const Otp = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    if (!isOpen) return null;

    const navigate = useNavigate()
    const [otp, setOtp] = useState<number>()
    const [timer, setTimer] = useState(60);
    const [otpExpired, setOtpExpired] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const timeout = setTimeout(() => {
                setTimer(prev => prev - 1);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setOtpExpired(true);
        }
    }, [timer]);


    const handleResend = async() => {

        toast.success('Otp send to your mail')
        const userData:any=localStorage.getItem('registrationData')
        await sendOtp({...JSON.parse(userData)})
        
        setTimer(60);
        setOtpExpired(false);
        // Logic to resend OTP
    };

    const verifyotp = async () => {
        try {
            if (!otp?.toString().length) return
            const userData = localStorage.getItem('registrationData')
            const user: SignupUserInterface = userData ? JSON.parse(userData) : null
            // console.log('userData', user)
            const response = await verifyOtp({ email: user.email, otp })
            console.log('response', response)
            if (response.status == 'success') {
                toast.success('Otp verification successfull',TOAST_ACTION)
                await signupUser({ ...user })
                localStorage.removeItem('registrationData');
                setTimeout(() => {
                    toast.success('Account created successfully')
                    navigate('/login')
                }, 1500)
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error?.response?.data?.message)
                console.log('Axios error message', error.message);
            } else {
                toast.error('An unknown error occured')
                console.log(error)
            }
        }

    }

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold">OTP Verification</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="mt-6 space-y-4">
                    <div className="flex flex-col space-y-4">
                        <input
                            value={otp}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            placeholder="Enter the OTP"
                            name='otp'
                            onChange={(e) => setOtp(parseInt(e.target.value))}
                            disabled={otpExpired}
                        />
                        <button
                            type='submit'
                            className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                            // disabled={otpExpired}
                            onClick={verifyotp}
                        >
                            Verify OTP
                        </button> 
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-500">
                            {otpExpired ? (<p className="text-red-500">OTP expired</p>) : `Otp expires in ${timer}s`}
                        </span>

                        {timer < 1 ? (
                            <button
                                onClick={handleResend}
                                className="text-blue-500 hover:underline focus:outline-none"
                                disabled={!otpExpired}
                            >
                                Resend OTP
                            </button>
                        ) : ''}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;
