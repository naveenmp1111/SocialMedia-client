import { useState } from 'react';
import { toast } from 'react-toastify'
import { reportPost } from '../../api/post';

const ReportPost = ({ isOpen, onClose, postId, openUserBlockModal }: { isOpen: boolean; onClose: () => void; postId: string; openUserBlockModal: () => void }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [error, setError] = useState('');

    const reportReasons = [
        'Spam',
        'Harassment',
        'Hate Speech',
        'Misinformation',
        'Violence',
        'Other',
    ];

    const handleChange = (event: any) => {
        setSelectedReason(event.target.value);
        setError('');
    };

    const handleReport = async () => {
        if (selectedReason) {
            await reportPost({ postId, reason: selectedReason })
            toast.success('Report submitted successfully')
            openUserBlockModal()
            onClose();
        } else {
            setError('Please select a reason for reporting.');
        }
    };

    return isOpen ? (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80">
                <div className="relative w-full max-w-md max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Report Post
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="small-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 md:px-10 space-y-4 max-h-96 overflow-y-auto">
                        <form>
                            {reportReasons.map((reason, index) => (
                                <div key={index} className="flex items-center space-x-3 py-3">
                                    <input
                                        type="radio"
                                        id={`reason-${index}`}
                                        name="report-reason"
                                        value={reason}
                                        checked={selectedReason === reason}
                                        onChange={handleChange}
                                        className={`w-4 h-4 border-gray-300 dark:bg-gray-600 dark:border-gray-500 ${selectedReason === reason ? 'text-blue-600' : 'text-transparent'
                                            }`}
                                    />
                                    <label
                                        htmlFor={`reason-${index}`}
                                        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {reason}
                                    </label>
                                </div>
                            ))}
                        </form>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="button"
                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={handleReport}
                        >
                            Report
                        </button>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default ReportPost;
