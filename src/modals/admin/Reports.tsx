import { SingleReport } from '../../types/admin'

const Reports = ({ isOpen, onClose, reports }: { isOpen: boolean, onClose: () => void, reports: SingleReport[] }) => {
    if (!isOpen) {
        return null
    }

    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
            >
                <div className="relative w-full max-w-lg max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-500">
                            Reports
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

                    <div className="max-h-96 overflow-y-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-center text-lg">
                                        Reported By
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center text-lg">
                                        Reason
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports && reports.map((report, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            <p className="ml-10 text-gray-500 font-bold text-start">{report.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="ml-10 text-white font-normal text-start">{report.reason}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports