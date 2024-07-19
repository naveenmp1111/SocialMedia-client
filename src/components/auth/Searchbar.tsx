import { useNavigate } from 'react-router-dom';
import { useSearchBar } from '../../contexts/SearchBarContext';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/explore');
    };

    const { searchValue, setSearchValue } = useSearchBar()

    return (
        <div className='w-full h-16 rounded-lg fixed  max-w-[1290px] top-1 z-30 md:bg-white bg-gray-200 m-1'>
            <div className='flex justify-between items-center h-full'>
                <div className='w-1/4 flex justify-center'>
                    <span className='font-bold text-lg mx-5 md:hidden'>connectify</span>
                </div>
                <div className='md:w-2/4 w-full flex justify-center mr-3 md:mr-0 relative'>
                    <input
                        type='text'
                        className='w-full h-10 p-2 pl-4 pr-10 border-2  rounded-full outline-none'
                        placeholder='Search...'
                        onClick={handleRedirect}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <svg className='w-6 h-6 absolute right-3 top-2.5 text-gray-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.5 3.5a7.5 7.5 0 015.65 13.15z" />
                    </svg>
                </div>
                <div className='hidden md:block w-1/4 justify-center'>

                </div>
            </div>
        </div>
    );
};

export default SearchBar;
