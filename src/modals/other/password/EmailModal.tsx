import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { resetPassword, sendOtp, verifyOtp } from '../../../api/auth';
import { TOAST_ACTION } from '../../../constants/common';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const EmailModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState<number>();
    const [timer, setTimer] = useState(60);
    const [otpExpired, setOtpExpired] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('email')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const navigate = useNavigate()

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

    const handleResend = async () => {
        const email = recoveryEmail
        await sendOtp({ email, message: 'passwordRecovery' });

        toast.success('Otp sent to your mail', TOAST_ACTION);
        setTimer(60);
        setOtpExpired(false);
    };

    const formikEmail = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('Email is', values.email);
                // localStorage.setItem('passwordRecoveryEmail', values.email);
                setRecoveryEmail(values.email)
                // console.log('recovery email is ',recoveryEmail)
                await sendOtp({ email: values.email, message: 'passwordRecovery' });
                toast.success('Otp sent to your mail', TOAST_ACTION);
                setStep(2);
            } catch (error) {
                console.log(error)
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message)
                }
            }
        },
    });

    const formikPassword = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            try {
                console.log('Password is', values.password);
                const response = await resetPassword({ email: recoveryEmail, password: values.password })
                toast.success('Password reset successfully', TOAST_ACTION);
                setStep(1)
                onClose()

            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message)
                }
            }
        },
    });

    const VerifyOtp = async () => {
        try {
            if (!otp?.toString().length) return;
            // const email = JSON.parse(localStorage.getItem('passwordRecoveryEmail') as string);
            const email = recoveryEmail
            const response = await verifyOtp({ email, otp });
            if (response.status === 'success') {
                toast.success('Otp verification successful', TOAST_ACTION);
                setStep(3);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
                console.log('Axios error message', error.message);
            } else {
                toast.error('An unknown error occurred');
                console.log(error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-30">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold">
                        {step === 1 ? 'Password Recovery' : step === 2 ? 'Verify OTP' : 'Reset Password'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
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

                {step === 1 && (
                    <form onSubmit={formikEmail.handleSubmit} className="mt-6 space-y-4">
                        <div className="flex flex-col space-y-4">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={formikEmail.handleChange}
                                onBlur={formikEmail.handleBlur}
                                value={formikEmail.values.email}
                                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formikEmail.touched.email && formikEmail.errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                            />
                            {formikEmail.touched.email && formikEmail.errors.email && (
                                <div className="text-red-500 text-sm">{formikEmail.errors.email}</div>
                            )}
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                            >
                                Get OTP
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="mt-6 space-y-4">
                        <div className="flex flex-col space-y-4">
                            <input
                                value={otp}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                placeholder="Enter the OTP"
                                name="otp"
                                onChange={(e) => setOtp(parseInt(e.target.value))}
                                disabled={otpExpired}
                            />
                            {otpExpired && <div className="text-red-500 text-sm">OTP expired</div>}
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                                onClick={VerifyOtp}
                            >
                                Verify OTP
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-500">
                                {otpExpired ? 'OTP expired' : `Otp expires in ${timer}s`}
                            </span>
                            {otpExpired && (
                                <button
                                    onClick={handleResend}
                                    className="text-blue-500 hover:underline focus:outline-none"
                                    disabled={!otpExpired}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <form onSubmit={formikPassword.handleSubmit} className="mt-6 space-y-4">
                        <div className="flex flex-col space-y-4">
                            <div className='relative'>
                            <input
                                id="password"
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter new password"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.password}
                                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formikPassword.touched.password && formikPassword.errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <AiFillEyeInvisible className="h-6 w-6" />
                                ) : (
                                    <AiFillEye className="h-6 w-6" />
                                )}
                            </button>
                            </div>
                            {formikPassword.touched.password && formikPassword.errors.password && (
                                <div className="text-red-500 text-sm">{formikPassword.errors.password}</div>
                            )}
                            <div className='relative'>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirm new password"
                                onChange={formikPassword.handleChange}
                                onBlur={formikPassword.handleBlur}
                                value={formikPassword.values.confirmPassword}
                                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                            />
                             <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <AiFillEyeInvisible className="h-6 w-6" />
                                ) : (
                                    <AiFillEye className="h-6 w-6" />
                                )}
                            </button>
                            </div>
                            {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword && (
                                <div className="text-red-500 text-sm">{formikPassword.errors.confirmPassword}</div>
                            )}

                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg hover:bg-black transition duration-300"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EmailModal;

