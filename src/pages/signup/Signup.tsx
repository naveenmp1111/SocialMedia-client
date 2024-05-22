import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser, usernameAvailability, emailAvailability } from '../../api/auth';

const Signup = () => {
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
            .required('Password is required'),
        confirmPassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmit = (values: { name: string, username: string, email: string, password: string, confirmPassword: string }) => {
        // Handle form submission
        console.log('checking form submission', values);
        signupUser({ ...values });
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen dark:bg-gray-900">
            {/* First half */}
            <div className="w-full lg:w-1/2 flex items-center justify-center dark:bg-gray-900">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                <h1 className="text-4xl font-bold text-center text-white">Your Site Name</h1>
            </div>
            {/* Second half */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <section className="dark:bg-gray-900 w-full h-max">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
                        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
                            <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
                                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">Sign up with Google</button>
                                <div className="flex items-center justify-center">
                                    <div className="w-1/2 border-t border-gray-300 dark:border-gray-600"></div>
                                    <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
                                    <div className="w-1/2 border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">Create an account</h1>
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                                        <div>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Your email</label>
                                            <Field validate={validateEmail} type="email" name="email" id="email" autoComplete="email" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                            <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Password</label>
                                            <Field type="password" name="password" id="password" placeholder="••••••••" autoComplete="new-password" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium dark:text-white">Confirm password</label>
                                            <Field type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" autoComplete="new-password" className="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500" />
                                        </div>
                                        <button type="submit" className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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
