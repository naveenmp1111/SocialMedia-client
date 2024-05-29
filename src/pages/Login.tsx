import  { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import LoginWithGoogle from '../utils/LoginWithGoogle';
import { setCredentials } from '../redux/authSlice';
import {useDispatch} from 'react-redux'
const Login = () => {
  const dispatch=useDispatch()
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
      // console.log(values)
      setLoading(true)
      const result = await loginUser({ ...values })

      // console.log(result)
      if (result.status == 'success') {
        localStorage.setItem('userData',JSON.stringify(result.user))
        toast.success(result.message)
        setTimeout(() => {
          setLoading(false)
          dispatch(setCredentials(result.user))
          navigate("/home");
        }, 1500);
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


  const GoogleSignin=async()=>{
    try {
      const result=  await LoginWithGoogle()
      if(result){
        setLoading(true)
        console.log('result is',result)
        localStorage.setItem('userData',JSON.stringify(result))
        // console.log('result is',result)
        dispatch(setCredentials(result))
        toast.success('Login successfull')
        setTimeout(()=>{
            setLoading(false)
            navigate('/home')
        },1500)
      }
    } catch (error) {
        console.log('error occured',error)
        if(isAxiosError(error)){
            toast.error(error.response?.data.message)
        }
    }
}

if (loading) {
    return <Loader />;
}

  return (
    <section className="dark:bg-gray-900 w h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          CONNECTIFY
        </a>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
              Log into existing Account.
            </h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">Your email</label>
                  <Field type="email" name="email" id="email" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium dark:text-white">Password</label>
                  <Field type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                </div>
                <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                <button onClick={GoogleSignin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">Continue with Google</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account? <a href="/signup  " className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
