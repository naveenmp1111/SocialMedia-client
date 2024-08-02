import { useEffect, useState } from 'react';
import { blockPost, getPostReports, unblockPost } from '../../api/admin';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { Report, SingleReport } from '../../types/admin';
import Reports from '../../modals/admin/Reports';
import ViewPostModal from '../../modals/admin/ViewPostModal';
import { PostDataInterface } from '../../types/post';

const ReportManagement = () => {
    const [openPostViewModal,setOpenPostViewModal]=useState(false)
    const [postData,setPostData]=useState<PostDataInterface>()
    const [reports, setReports] = useState<Report[]>([]);
    const [singlePostReports, setSinglePostReports] = useState<SingleReport[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchPosts();
    }, [reload]);

    const fetchPosts = async () => {
        const response = await getPostReports();
        console.log('response data from getpostsreports ',response)
        setReports(response?.reports);
    };

    const blockUnblock = (postId: string, isBlock: boolean) => {
        Swal.fire({
            title: isBlock ? 'Unblock' : 'Block',
            text: `Are you sure you want to ${isBlock ? 'Unblock' : 'Block'} Post?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isBlock ? 'Unblock Post' : 'Block Post',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                if (isBlock) {
                    handleUnBlockPost(postId);
                } else {
                    handleBlockPost(postId);
                }
            }
        });
    };

    const handleBlockPost = async (postId: string) => {
        try {
            const response = await blockPost(postId);
            toast.success(response.message);
            setReload((prev) => !prev);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const handleUnBlockPost = async (postId: string) => {
        try {
            const response = await unblockPost(postId);
            toast.success(response.message);
            setReload((prev) => !prev);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const handleModal = (reports: SingleReport[]) => {
        setSinglePostReports(reports);
        setIsOpen(true);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reports.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <Reports isOpen={isOpen} onClose={() => setIsOpen(false)} reports={singlePostReports} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-5">
                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Post
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reasons
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Report Count
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReports && currentReports.map((report, index) => (
                            <>
                            <ViewPostModal isOpen={openPostViewModal} postViewModalOnClose={() => setOpenPostViewModal(false)} post={postData} />
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white" onClick={()=>setPostData(report.post)}>
                                    <img className="w-20 h-20 rounded-lg" src={report?.post?.image[0]} alt="Post image" onClick={()=>setOpenPostViewModal(true)} />
                                </th>
                                <td className="px-6 py-4">
                                    <button className='bg-blue-600 px-2 rounded-md py-1 text-white hover:bg-blue-400 w-16' onClick={() => handleModal(report.reporters)}>Reasons</button>
                                </td>
                                <td className="px-6 py-4">
                                    <p className='ml-10 text-red-500 font-bold'>{report.count}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {report.post.isBlock ? (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Blocked
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {report.post.isBlock ? (
                                        <button className='bg-green-600 px-2 rounded-md py-1 text-white hover:bg-green-400 w-16' onClick={() => blockUnblock(report.post._id, report.post.isBlock)}>Unblock</button>
                                    ) : (
                                        <button className='bg-red-600 px-2 w-16 rounded-md py-1 text-white hover:bg-red-400' onClick={() => blockUnblock(report.post._id, report.post.isBlock)}>Block</button>
                                    )}
                                </td>
                            </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6 dark:bg-gray-800 dark:border-gray-600">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ReportManagement;
