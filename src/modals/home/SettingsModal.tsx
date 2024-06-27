import React ,{useState} from 'react'
import BlockedUsersList from './BlockedUsersList'

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null

    const [isOpenBlocklist,setIsOpenBlockList]=useState(false)

    return (
        <>
        <BlockedUsersList isOpen={isOpenBlocklist} onClose={()=>{setIsOpenBlockList(false)}}/>
        <div
            className="fixed inset-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-80"
        >
            <div className="relative w-fit max-w-lg max-h-full mx-4 overflow-hidden bg-white rounded-lg shadow dark:bg-gray-700">
                
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700  dark:border-gray-600 dark:text-white">
                    <li onClick={()=>setIsOpenBlockList(true)} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 hover:dark:bg-gray-600">Block list</li>
                    {/* <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600">Settings</li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600">Messages</li> */}
                    <li onClick={()=>onClose()} className="w-full px-4 py-2 rounded-b-lg hover:dark:bg-gray-600">Cancel</li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default SettingsModal