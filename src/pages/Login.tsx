import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify'
import Loader from '../components/others/Loader';
import LoginWithGoogle from '../utils/LoginWithGoogle';
import { setCredentials } from '../redux/authSlice';
import { useDispatch } from 'react-redux'
import EmailModal from '../modals/other/password/EmailModal';
import { setAdminCredentials } from '../redux/adminSlice';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch()
  const [emailModal, setEmailModal] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .trim()
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values: { email: string, password: string }) => {

    try {

      setLoading(true)
      const result = await loginUser({ ...values })

      if (result.status == 'success') {

        if (result.user?.role == 'admin') {
          localStorage.setItem('adminData', JSON.stringify(result.user))
          dispatch(setAdminCredentials(result))
          toast.success(result.message)
          return navigate('/admin')
        } else if (result.user?.role == 'client') {
          localStorage.setItem('userData', JSON.stringify(result.user))
          toast.success(result.message)

          setTimeout(() => {
            setLoading(false)
            dispatch(setCredentials(result))
            return navigate("/home");
          }, 1500);
        }
      }
    } catch (error) {
      setLoading(false)
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error('Unknown error occured')
        console.log('Error in login page catch', error)
      }
    }
  };


  const GoogleSignin = async () => {
    try {
      const result = await LoginWithGoogle()
      if (result) {
        setLoading(true)
        // console.log('result is', result)
        localStorage.setItem('userData', JSON.stringify(result.user))
        // console.log('result is',result)
        dispatch(setCredentials(result))
        toast.success('Login successfull')
        if (result.user?.role == 'admin') {
          return navigate('/admin/dashboard')
        }
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
    <>
  <EmailModal isOpen={emailModal} onClose={() => setEmailModal(false)} />
  <div className="flex align-middle self-center flex-col lg:flex-row h-screen bg-custom-image bg-cover bg-no-repeat">
    {/* Left part */}
    <div className="w-full lg:w-1/2 flex items-center justify-center">
            <a className="md:text-8xl md:ml-20 font-bold text-4xl mt-16 md:-mt-5 text-center text-white">sickomode.</a>
          </div>
    {/* Right part */}
    <div className="w-full lg:w-1/2 flex mt-32 md:mt-0 items-center justify-center ">
      <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-black border-gray-800">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Log into an existing Account.
          </h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Your email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-600 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-800 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-white">Password</label>
                <Field
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
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
                <p onClick={() => setEmailModal(true)} className="text-end text-sm m-1 cursor-pointer font-medium text-gray-400">
                  Forgot Password?
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>
              <button
                onClick={GoogleSignin}
                className="w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
              >
                Continue with Google
              </button>
              <p className="text-sm text-center font-light text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  </div>
</>

  );
  
};

export default Login;
