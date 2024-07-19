import { toast } from 'react-toastify'
import { blockUserByUsername } from '../../api/user'

const UserBlockProvision = ({ isOpen, onClose, username }: { isOpen: boolean, onClose: () => void, username: string }) => {

    const BlockUser = async () => {
        try {
            await blockUserByUsername(username)
            toast.success(`Blocked ${username} `)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return isOpen ? (
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
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            className="w-16 h-16 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <p className="text-lg font-medium text-center text-gray-900 dark:text-white">
                            Thanks for letting us know
                        </p>
                        <div className="w-full flex justify-center">
                            <button onClick={BlockUser} className='w-full p-2 bg-gray-800 text-red-500 rounded-lg font-semibold'>Block {username}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

}

export default UserBlockProvision