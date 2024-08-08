import { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';

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
            .min(3, 'Name must be at least 3 characters long')
            .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters'),
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
        <div className="flex align-middle self-center flex-col lg:flex-row h-screen  bg-custom-image bg-cover bg-no-repeat">
          <Otp isOpen={openModal} onClose={() => setOpenModal(false)} />
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <a className="md:text-8xl md:ml-20 font-bold text-3xl mt-8 md:-mt-5 text-center text-white">sickomode.</a>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <section className="w-full h-max">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
                <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-gray-950 border-gray-900">
                  <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
                    <button
                      onClick={GoogleSignin}
                      className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      type="button"
                    >
                      Continue with Google
                    </button>
                    <div className="flex items-center justify-center">
                      <div className="w-1/2 border-t border-gray-600"></div>
                      <span className="mx-4 text-sm text-gray-500">or</span>
                      <div className="w-1/2 border-t border-gray-600"></div>
                    </div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                      Create an account
                    </h1>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      enableReinitialize
                    >
                      <Form className="space-y-0 md:space-y-2">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-white">Name</label>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white"
                            placeholder="Your name"
                          />
                          <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-white">Username</label>
                          <Field
                            validate={validateUsername}
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white"
                            placeholder="Your username"
                          />
                          <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="relative">
                          <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                          <Field
                            validate={validateEmail}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white"
                            placeholder="name@company.com"
                          />
                          <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="relative">
                          <label className="block mb-2 text-sm font-medium text-white">Password</label>
                          <Field
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-9 text-gray-400"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <AiFillEye className="h-6 w-6" />
                            ) : (
                              <AiFillEyeInvisible className="h-6 w-6" />
                            )}
                          </button>
                          <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="relative">
                          <label className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                          <Field
                            type={passwordVisible ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white mb-2"
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-9 text-gray-400"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <AiFillEye className="h-6 w-6" />
                            ) : (
                              <AiFillEyeInvisible className="h-6 w-6" />
                            )}
                          </button>
                          <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500 " />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Create an account
                        </button>
                        <p className="text-sm font-light text-gray-400">
                          Already have an account?{" "}
                          <Link to="/login" className="font-medium text-blue-500 hover:underline">
                            Login here
                          </Link>
                        </p>
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
