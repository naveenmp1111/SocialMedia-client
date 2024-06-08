import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { setCredentials } from '../../redux/authSlice';
import { createPost } from '../../api/post';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePost: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const preset_key = 'xdxoqisy';
    const cloud_name = 'dwxhfdats';
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset_key);
            axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
                .then((response) => setImageUrl(response.data.secure_url))
                .catch((error) => console.log(error.response.data));
        }
    };

    const validationSchema = Yup.object({
        description: Yup.string().required('Required').min(3, 'Must be at least 3 characters')
    });

    const formik = useFormik({
        initialValues: {
            description: '',
            image: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('form values', {...values,image:imageUrl});
                const response=await createPost({...values,image:imageUrl as string})
                console.log(response)
                if(response){
                    onClose()
                    toast.success('Post created successfully')
                }
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
                       <div className='flex'>

                       </div>
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
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
