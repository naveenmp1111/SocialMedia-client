import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { PostDataInterface } from '../../types/post';
import { editPost } from '../../api/post';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    postEditModalOnClose: () => void;
    post: PostDataInterface | null;
    closeViewModal:()=>void;
}

const EditPost: React.FC<ModalProps> = ({ isOpen, postEditModalOnClose, post,closeViewModal }) => {
    if (!isOpen) return null;
    const navigate=useNavigate()
    const validationSchema = Yup.object({
        description: Yup.string().required('Required').min(3, 'Must be at least 3 characters'),
    });

    const formik = useFormik({
        initialValues: {
            description: post?.description || '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('form values', values);
               const response=await  editPost({postId:post?._id,description:values?.description})
               if(response){
                toast.success(response.message)
               }
               postEditModalOnClose()
               closeViewModal()
            } catch (error) {
                console.log('error is ', error);
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                }
            }
        },
    });

    return (
        <div
            className={`${isOpen ? 'fixed' : 'hidden'} flex overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-80`}
        >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Post
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={postEditModalOnClose}
                        >
                            X
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className='flex'>
                        <div className='w-1/2'>
                            {post && <img src={post.image[0]} className='w-full h-full' alt="Uploaded" />}
                        </div>
                        <form className='w-1/2' onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2 p-3">
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
                            </div>

                            <div className="flex items-center space-x-4 px-3">
                                <button
                                    type="submit"
                                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
