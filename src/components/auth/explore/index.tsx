import { useState, useEffect } from 'react';
import Postlist from './Postlist';
import { getAllPostsToExplore } from '../../../api/post';
import { PostDataInterface } from '../../../types/post';
import { useSearchBar } from '../../../contexts/SearchBarContext';
import { getRestofAllUsers } from '../../../api/user';
import { User } from '../../../types/loginUser';
import { Link } from 'react-router-dom'

const Explore = () => {
    const [posts, setPosts] = useState<PostDataInterface[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [target, setTarget] = useState<string>('posts');

    const fetchPosts = async () => {
        if (target === 'posts') {
            const response = await getAllPostsToExplore();
            setPosts(response.posts);
        } else {
            const response = await getRestofAllUsers();
            setUsers(response.users);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [target]);

    const { searchValue, setSearchValue } = useSearchBar();

    const [filteredPosts, setFilteredPosts] = useState<PostDataInterface[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        if (target === 'posts') {
            setFilteredPosts(posts.filter(item =>
                item.description?.toLowerCase().includes(searchValue.toLowerCase())
            ));
        } else {
            setFilteredUsers(users.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ));
        }
    }, [searchValue, target, posts, users]);

    return (
        <>
            <div className='fixed top-16 left-0 right-0 z-10 md:hidden'>
                <div className='md:w-2/4 w-full flex justify-center mr-3 md:mr-0 relative p-2 bg-gray-200'>
                    <input
                        type='text'
                        className='w-full h-10 p-2 pl-4 pr-10 border-2 rounded-full outline-none '
                        placeholder='Search...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <svg className='w-6 h-6 absolute right-4 top-4 text-gray-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.5 3.5a7.5 7.5 0 015.65 13.15z" />
                    </svg>
                </div>
            </div>
            <div className='pt-16 md:pt-8 p-5'>
                <button
                    className={`p-2 px-3 rounded-lg m-1 mb-2 font-semibold ${target === 'posts' ? 'bg-white' : 'bg-gray-100'}`}
                    onClick={() => setTarget('posts')}
                >
                    Posts
                </button>
                <button
                    className={`p-2 px-3 rounded-lg m-1 mb-2 font-semibold ${target === 'users' ? 'bg-white' : 'bg-gray-100'}`}
                    onClick={() => setTarget('users')}
                >
                    Users
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {target === 'posts' ?
                        filteredPosts.map((item: PostDataInterface) => (
                            <Postlist key={item._id} post={item} />
                        )) :
                        filteredUsers.map((item) => (
                            <div key={item.username} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                                <div className="flex justify-end px-4 pt-4"></div>
                                <div className="flex flex-col items-center pb-10">
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={item.profilePic} alt="User profile" />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900">{item.name}</h5>
                                    <span className="text-sm text-gray-500">{item.username}</span>
                                    <div className="flex mt-4 md:mt-6">
                                        <Link to={`/profile/${item.username}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300">View Profile</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Explore;
