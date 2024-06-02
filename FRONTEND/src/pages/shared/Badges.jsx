import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import "../../styles/parent.css";

const Badges = () => {
    const user = UserInformation();
    const [badges, setBadges] = useState([]);
    const [completedBadges, setCompletedBadges] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            return;
        }

        // Fetch all badges
        fetch('/badges/badges.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch badges: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => setBadges(data))
            .catch(error => {
                console.error('Error fetching badges', error);
                setError(error.message);
            });

        // Fetch completed badges
        if (user.id) {
            axios.get(`/badges/${user.id}`)
                .then((response) => {
                    const userBadges = response.data?.badges || [];
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
        }
    }, [user]);

    const handleCompletionToggle = (badgeTitle) => {
        const isCompleted = !completedBadges[badgeTitle];

        setCompletedBadges({
            ...completedBadges,
            [badgeTitle]: isCompleted,
        });

        axios.post(`/badges/${user.id}`, {
            badge: {
                title: badgeTitle,
                completed: isCompleted,
            }
        }).catch((error) => {
            console.error('Error updating badge completion', error);
            setError(error.message);
            toast.error('Failed to update badge completion');
        });
    };

    if (error) {
        return <div className='text-red-500'>{error}</div>;
    }

    return (
        <div>
            <section className='bg-gray-300 py-24 px-4 lg:px-16'>
                <div className='container mx-auto'>
                    <h1 className='text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose'>Badge Collection</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {badges.map(badge => (
                            <div key={badge.title} className='bg-white rounded-xl shadow-lg p-8 flex flex-col items-center'>
                                <p className='text-xl text-gray-500'>{badge.title}</p>
                                <img src={badge.image} alt={badge.title} className='w-24 h-24 my-4' />
                                <Link to={badge.infoLink} className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2'>
                                    Learn More
                                </Link>
                                <button
                                    onClick={() => handleCompletionToggle(badge.title)}
                                    className={`px-4 py-2 rounded-md ${completedBadges[badge.title] ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                >
                                    {completedBadges[badge.title] ? 'Completed' : 'Mark as Complete'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='bg-gray-500 py-24 px-4 lg:px-16'>
                <div className="flex items-center justify-center py-10">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <p className="text-xl text-gray-500">More Badges</p>
                        <h2 className="text-6xl font-bold">Coming Soon!</h2>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Badges;


