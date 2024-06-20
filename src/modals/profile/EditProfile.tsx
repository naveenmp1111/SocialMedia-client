import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';
import { StoreType } from '../../redux/store';
import { editProfile } from '../../api/profile';
import { toast } from 'react-toastify'
import { UseDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch()
    if (!isOpen) return null;
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: StoreType) => state.auth.user);
    const accessToken = useSelector((state: StoreType) => state.auth.accessToken)
    const preset_key = 'xdxoqisy';
    const cloud_name = 'dwxhfdats';
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined); 

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset_key);
            axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
                .then((response) => {
                    setImageUrl(response.data.secure_url)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000)
                })
                .catch((error) => console.log(error.response.data));
        }

    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
        username: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phoneNumber: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
            phoneNumber: user?.phoneNumber || '',
            email: user?.email || '',
            profile: user?.profilePic || '',
            isPrivate: user?.isPrivate || false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            // Call the function to update profile with form values and imageUrl
            try {
                console.log('form values', {
                    ...values,
                    profilePic: imageUrl,
                });
                const result = await editProfile({
                    ...values,
                    profilePic: imageUrl as string,
                    phoneNumber: Number(values.phoneNumber)
                });
                // console.log('result issssss', result);
                if (result) {
                    dispatch(setCredentials({ user: result.user, accessToken }))
                    localStorage.setItem('userData', JSON.stringify(result.user))
                    toast.success('Profile updated successfully')
                    onClose()
                }
            } catch (error) {
                console.log('error is ', error)
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message)
                }
            }
        },
    });

    const handleToggleChange = () => {
        formik.setFieldValue('isPrivate', !formik.values.isPrivate);
    }

    return (
        <div
            className={`${isOpen ? 'fixed' : 'hidden'} flex overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-80`}
        >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Profile
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            X
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {(imageUrl || user?.profilePic) && <img src={imageUrl ? imageUrl : user?.profilePic} className='w-32' alt="Uploaded" />}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div className='sm:col-span-2'>
                                <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Pic</label>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    name="profile"
                                    id="profile"
                                    accept="image/*"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-600 text-sm">{formik.errors.name}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('username')}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="text-red-600 text-sm">{formik.errors.username}</div>
                                ) : null}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                                <textarea
                                    id="bio"
                                    rows={5}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('bio')}
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('phoneNumber')}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <div className="text-red-600 text-sm">{formik.errors.phoneNumber}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-600 text-sm">{formik.errors.email}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 justify-between">

                            {loading ? (
                                <button disabled type="button" className="py-2.5 px-2 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="text-red-600  inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    Update
                                </button>
                            )}

                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-400">Private</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formik.values.isPrivate}
                                        onChange={handleToggleChange}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
