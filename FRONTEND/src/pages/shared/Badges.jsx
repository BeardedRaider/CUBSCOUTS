import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import UserInformation from '../../UserInfo';
import { toast } from 'react-hot-toast';
import "../../styles/parent.css";

const Badges = () => {// This component is responsible for rendering the badge collection page. It displays a list of badges that users can earn by completing certain tasks. The badges are fetched from the server and displayed in a grid layout. Each badge has a title, an image, a link to more information, and a button to mark the badge as completed. The user's completed badges are stored in the database and updated when the user marks a badge as completed. The badges are paginated to improve performance and user experience. The user can search for badges by title using a search input field. The search results are displayed in real-time as the user types in the search input field. The user can clear the search input field to view all badges. The user can navigate between pages of badges using pagination buttons at the bottom of the page.
    const user = UserInformation();// The 'UserInformation' component is used to get the user's information from the context. It returns an object containing the user's information, such as their name, email, and ID.
    const [badges, setBadges] = useState([]);// State to store all badges
    const [completedBadges, setCompletedBadges] = useState({});// State to store completed badges
    const [setError] = useState(null);// State to store error messages
    const [searchTerm, setSearchTerm] = useState('');// State to store search term
    const [filteredBadges, setFilteredBadges] = useState([]);// State to store filtered badges
    const [currentPage, setCurrentPage] = useState(1);// State to store current page number
    const badgesPerPage = 6;// Number of badges to display per page

    useEffect(() => {
        // Fetch all badges
        fetch('/badges/badges.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch badges: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setBadges(data);
                setFilteredBadges(data); // Initialize filtered badges with all badges
            })
            .catch(error => {
                console.error('Error fetching badges', error);
                setError(error.message);
            });
    
        // Fetch completed badges
        if (user && user._id) {
            fetchBadges(user._id); // Pass user._id as parameter
        }
    }, [user]);
    
    const fetchBadges = (userId) => { // Accept userId as parameter
        axiosInstance.get(`/api/badges/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => {
            const userBadges = response.data || [];
            const completed = userBadges.reduce((acc, badge) => {
                acc[badge.title] = badge.completed;
                return acc;
            }, {});
            setCompletedBadges(completed);
        })
        .catch((error) => {
            console.error('Error fetching user badges', error);
            setError(error.message);
        });
    };

    const handleCompletionToggle = (badgeTitle) => {
        const isCompleted = !completedBadges[badgeTitle];

        setCompletedBadges({
            ...completedBadges,
            [badgeTitle]: isCompleted,
        });

        // Log the token to ensure it's correctly retrieved
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        // Log data before sending the request
        console.log('Data to send:', {
            userId: user._id,
            title: badgeTitle,
            completed: isCompleted,
        });

        axiosInstance.post('/api/badges', {
            userId: user._id, // ensure this is user._id, not user.id
            title: badgeTitle,
            completed: isCompleted,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((response) => {
            toast.success('Badge completion updated successfully!');
            fetchBadges(user._id); // Refresh badges after update
        })
        .catch((error) => {
            console.error('Error updating badge completion', error);
            setError(error.message);
            toast.error('Failed to update badge completion');
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentPage(1); // Reset to first page on clear search
    };

    useEffect(() => {
        const results = badges.filter(badge =>
            badge.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBadges(results);
    }, [searchTerm, badges]);

    // Calculate paginated badges
    const indexOfLastBadge = currentPage * badgesPerPage;
    const indexOfFirstBadge = indexOfLastBadge - badgesPerPage;
    const currentBadges = filteredBadges.slice(indexOfFirstBadge, indexOfLastBadge);

    const totalPages = Math.ceil(filteredBadges.length / badgesPerPage);

    return (
        <div>
            <section className='bg-gray-300 py-24 px-4 lg:px-16'>
                <div className='container mx-auto'>
                    <h1 className='text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose'>Badge Collection</h1>
                    
                    {/* Search Input */}
                    <div className='relative mb-4'>
                        <input
                            type="text"
                            placeholder="Search badges..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className='w-full p-2 border border-gray-300 text-gray-500 rounded-md'
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className='absolute right-2 top-2 text-gray-500 text-2xl p-2 focus:outline-none'
                            >
                                &times;
                            </button>
                        )}
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {currentBadges.length > 0 ? (
                            currentBadges.map(badge => (
                                <div key={badge.title} className='bg-white rounded-xl shadow-lg p-8 flex flex-col items-center'>
                                    <p className='text-xl text-gray-500'>{badge.title}</p>
                                    <img src={badge.image} alt={badge.title} className='w-24 h-24 my-4' />
                                    <a href={badge.infoLink} target='_blank' rel='noopener noreferrer' className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'>
                                        How To Complete
                                    </a>
                                    <button
                                        onClick={() => handleCompletionToggle(badge.title)}
                                        className={`px-4 py-2 rounded-md ${completedBadges[badge.title] ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                    >
                                        {completedBadges[badge.title] ? 'Completed' : 'Mark as Complete'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center py-10">
                                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                                    <p className="text-xl text-gray-500">Badge Collection</p>
                                    <h2 className="text-6xl font-bold">No badges found</h2>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination */}
                    {filteredBadges.length > badgesPerPage && (
                        <div className="flex justify-center mt-4">
                            <button 
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 mx-1 ${currentPage === 1 ? 'text-gray-400' : 'text-purple-500'}`}
                            >
                                &laquo; Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button 
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-purple-600 text-yellow-400' : 'text-purple-500'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 mx-1 ${currentPage === totalPages ? 'text-gray-400' : 'text-purple-500'}`}
                            >
                                Next &raquo;
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <section className='bg-gray-500 py-24 px-4 lg:px-16'>
                <div className="flex items-center justify-center py-10">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <p className="text-xl text-gray-500">Badge Collection</p>
                        <h2 className="text-6xl font-bold">Coming Soon!</h2>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Badges;

