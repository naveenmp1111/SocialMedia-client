import React from 'react'

const Searchbar = () => {
    return (
        <div className='w-full h-16 rounded-lg fixed md:block hidden max-w-[1290px] top-1 z-30 bg-white m-1'>
            <div className='flex justify-between items-center h-full'>
                <div className='w-1/4 flex justify-center'>

                </div>
                <div className='w-2/4 flex justify-center relative'>
                    <input type='text' className='w-full h-10 p-2 pl-4 pr-10 border-2 rounded-full focus:border-gray-400' placeholder='Search...' />
                    <svg className='w-6 h-6 absolute right-3 top-2.5 text-gray-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.5 3.5a7.5 7.5 0 015.65 13.15z" />
                    </svg>
                </div>
                <div className='w-1/4 flex justify-center'>

                </div>
            </div>
        </div>
    )
}

export default Searchbar