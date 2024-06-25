// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const SetPassword = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
//     if (!isOpen) return null;

//     const formik = useFormik({
//         initialValues: {
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: Yup.object({
//             password: Yup.string()
//                 .min(8, 'Password must be at least 8 characters')
//                 .required('Password is required'),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref('password')], 'Passwords must match')
//                 .required('Confirm password is required'),
//         }),
//         onSubmit: (values) => {
//             console.log('Password is', values.password);
//             // Handle password reset logic here
//         },
//     });

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
//             <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
//                     <h2 className="text-2xl font-semibold">Password Reset</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className="feather feather-x"
//                         >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Modal Content */}
//                 <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
//                     <div className="flex flex-col space-y-4">
//                         <input
//                             id="password"
//                             name="password"
//                             type="password"
//                             placeholder="Enter new password"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.password}
//                             className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                 formik.touched.password && formik.errors.password
//                                     ? 'border-red-500'
//                                     : 'border-gray-300'
//                             }`}
//                         />
//                         {formik.touched.password && formik.errors.password ? (
//                             <div className="text-red-500 text-sm">{formik.errors.password}</div>
//                         ) : null}

//                         <input
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type="password"
//                             placeholder="Confirm new password"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.confirmPassword}
//                             className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                                 formik.touched.confirmPassword && formik.errors.confirmPassword
//                                     ? 'border-red-500'
//                                     : 'border-gray-300'
//                             }`}
//                         />
//                         {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//                             <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
//                         ) : null}

//                         <button
//                             type="submit"
//                             className="flex items-center justify-center gap-2 bg-gray-900 text-gray-100 px-4 py-2 rounded-lg hover:bg-black transition duration-300"
//                         >
//                             Reset Password
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SetPassword;
