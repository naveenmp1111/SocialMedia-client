import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usernameAvailability, emailAvailability, sendOtp } from '../api/auth';
import Otp from '../modals/other/Otp';
import { toast } from 'react-toastify';
import Loader from '../components/others/Loader';
import { TOAST_ACTION } from '../constants/common';
import LoginWithGoogle from '../utils/LoginWithGoogle';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { setCredentials } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [initialValues, setInitialValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const savedValues = localStorage.getItem('registrationData');
        if (savedValues) {
            setInitialValues(JSON.parse(savedValues));
        }
    }, []);

    // Custom validation function for username
    const validateUsername = async (value: string) => {
        let error;
        if (!value) {
            error = 'Username is required';
        } else if (value.length > 15) {
            error = 'Username cannot be more than 15 characters';
        } else if (!/^[a-z._]{3,}$/.test(value)) {
            error = 'Username must be a minimum of 3 characters and can only include lowercase letters, underscore, and dot';
        } else {
            const isAvailable = await usernameAvailability(value);
            if (!isAvailable.available) {
                error = 'Username is already taken';
            }
        }
        return error;
    };

    // Custom validation function for email
    const validateEmail = async (value: string) => {
        let error;
        if (!value) {
            error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Invalid email';
        } else {
            const isAvailable = await emailAvailability(value);
            if (!isAvailable.available) {
                error = 'Email is already taken';
            }
        }
        return error;
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters long'),
        password: Yup.string()
            .trim()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .trim()
            .required('Confirm password')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const onSubmit = async (values: { name: string, username: string, email: string, password: string, confirmPassword: string }) => {
        try {
            setLoading(true);
            toast.success('Processing Data', TOAST_ACTION)
            const data = await sendOtp({ email: values.email });
            localStorage.setItem('registrationData', JSON.stringify(values));
            setLoading(false);
            toast.success(data.message);
            setOpenModal(true);
        } catch (error) {
            console.error('Error in form submission', error);
            setLoading(false);
        }
    };

    const GoogleSignin = async () => {
        try {
            const result = await LoginWithGoogle()
            if (result) {
                setLoading(true)
                localStorage.setItem('userData', JSON.stringify(result.user))
                // console.log('result is',result)
                dispatch(setCredentials(result))
                toast.success('Login successfull')
                setTimeout(() => {
                    setLoading(false)
                    navigate('/home')
                }, 1500)
            }
        } catch (error) {
            console.log('error occured', error)
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex align-middle self-center flex-col lg:flex-row h-screen dark:bg-gray-900">
            <Otp isOpen={openModal} onClose={() => setOpenModal(false)} />
            <div className="w-full lg:w-1/2 flex items-center justify-center  dark:bg-gray-900">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                <h1 className="text-4xl font-bold mt-3 md:mt-0 text-center text-white">CONNECTIFY</h1>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
                <section className="dark:bg-gray-900 w-full h-max">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
                        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                            <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
                                <button onClick={GoogleSignin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">Continue with Google</button>
                                <div className="flex items-center justify-center">
                                    <div className="w-1/2 border-t border-gray-300 dark:border-gray-600"></div>
                                    <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                                    <div className="w-1/2 border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">Create an account</h1>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize
                                >
                                    <Form className="space-y-0 md:space-y-2">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Name</label>
                                            <Field type="text" name="name" id="name" autoComplete="name" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" />
                                            <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Username</label>
                                            <Field validate={validateUsername} type="text" name="username" id="username" autoComplete="username" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your username" />
                                            <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div className='relative'>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Your email</label>
                                            <Field validate={validateEmail} type="email" name="email" id="email" autoComplete="email" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                            <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div className='relative'>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Password</label>
                                            <Field type={passwordVisible ? "text" : "password"} name="password" id="password" placeholder="••••••••" autoComplete="new-password" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <button type="button" className="absolute right-2 top-9 text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                {passwordVisible ? (
                                                    <AiFillEye className="h-6 w-6 text-gray-400" />
                                                ) : (
                                                    <AiFillEyeInvisible className="h-6 w-6 text-gray-400" />
                                                )}
                                            </button>
                                            <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div className='relative'>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Confirm password</label>
                                            <Field type={passwordVisible ? "text" : "password"} name="confirmPassword" id="confirmPassword" placeholder="••••••••" autoComplete="new-password" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" />
                                            <button type="button" className="absolute right-2 top-9 text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                {passwordVisible ? (
                                                    <AiFillEye className="h-6 w-6 text-gray-400" />
                                                ) : (
                                                    <AiFillEyeInvisible className="h-6 w-6 text-gray-400" />
                                                )}
                                            </button>
                                            <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500 " />
                                        </div>
                                        <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></p>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Signup;
