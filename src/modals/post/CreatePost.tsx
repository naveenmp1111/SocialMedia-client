import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { createPost } from '../../api/post';
import { getFollowing } from '../../api/user';
import { FollowerData } from '../../types/userProfile';
import useConversation from '../../zustand/useConversation';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePost: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET_KEY;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
   
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState<FollowerData[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<FollowerData[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<FollowerData[]>([]);
    const { setReload } = useConversation()
    const username = useSelector((state: StoreType) => state.auth.user?.username);

    useEffect(() => {
        fetchFollowing();
    }, []);

    const fetchFollowing = async () => {
        try {
            const response = await getFollowing(username as string);
            setSuggestedUsers(response.users);
            setFilteredSuggestions(response.users);
        } catch (error) {
            console.log('error in fetching following ', error);
        }
    };

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setShowSuggestions(true);
        // setInputValue(e.target.value);
        setFilteredSuggestions(suggestedUsers.filter(item => item.username.includes(e.target.value)));
    }, [suggestedUsers]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset_key);
            axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
                .then((response) => {
                    setImageUrl(response.data.secure_url);
                    formik.setFieldValue('image', response.data.secure_url);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error.response?.data);
                    setLoading(false);
                });
        }
    };

    const validationSchema = Yup.object({
        description: Yup.string(),
        image: Yup.string().required('Image is required'),
    });

    const formik = useFormik({
        initialValues: {
            description: '',
            image: '',
            taggedUsers: []
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createPost({
                    ...values,
                    image: imageUrl as string,
                    taggedUsers: selectedUsers.map(user => user._id)
                });
                // console.log('response from create post is ', response)
                if (response) {
                    onClose();
                    toast.success('Post created successfully');
                    setTimeout(() => {
                        setReload();
                    }, 500);
                }
            } catch (error) {
                console.log('error is ', error);
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                }
            }
        },
    });

    const handleUserSelect = (user: FollowerData) => {
        if (!selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers, user]);
            setSuggestedUsers(suggestedUsers.filter(item => item.username !== user.username));
            setFilteredSuggestions(suggestedUsers.filter(item => item.username !== user.username));
        }
    };

    const handleUserRemove = (username: string) => {
        const userToRemove = selectedUsers.find(user => user.username === username);
        setSelectedUsers(selectedUsers.filter(user => user.username !== username));
        if (userToRemove) {
            setSuggestedUsers(prev => [...prev, userToRemove]);
            setFilteredSuggestions([...filteredSuggestions, userToRemove]);
        }
    };

    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} flex overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-80`}>
            <div className="relative p-4 mt-60 md:mt-0 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Post
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

                    <form onSubmit={formik.handleSubmit}>
                        {imageUrl && <img src={imageUrl} className='w-56' alt="Uploaded" />}
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div className='sm:col-span-2'>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Post</label>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <div className="text-red-600">{formik.errors.image}</div>
                                ) : null}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...formik.getFieldProps('description')}
                                ></textarea>
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-red-600">{formik.errors.description}</div>
                                ) : null}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="taggedUsers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag Users</label>

                                <div className="mt-2 flex flex-wrap">
                                    {selectedUsers.map((user) => (
                                        <div key={user.username} className="flex items-center p-1 bg-gray-200 rounded-lg m-1">
                                            <span className="mr-2">{user.username}</span>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleUserRemove(user.username)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="taggedUsers"
                                        placeholder="Search and select users"
                                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border  focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onClick={() => setShowSuggestions(prev => !prev)}
                                        onChange={handleInputChange}
                                    />
                                    {showSuggestions && (
                                        <div className="absolute mt-1 w-full bg-gray-700 rounded-lg max-h-40 overflow-y-auto z-10">
                                            {filteredSuggestions && filteredSuggestions.map((user) => (
                                                <div className='flex items-center px-3 p-0.5  hover:bg-gray-600 rounded-md'>
                                                    <img className='rounded-full w-6 h-6' src={user.profilePic} alt="" />
                                                    <div
                                                        key={user.username}
                                                        className="p-2 cursor-pointer text-white"
                                                        onClick={() => {
                                                            handleUserSelect(user);
                                                            setShowSuggestions(false);
                                                        }}
                                                    >
                                                        {user.username}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
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
                                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    Create
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
