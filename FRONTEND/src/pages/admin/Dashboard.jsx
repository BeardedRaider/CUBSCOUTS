import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserInformation from '../../UserInfo';
import "../../styles/parent.css";
import "../../styles/admin.css";

const Dashboard = () => {
  const user = UserInformation(); // Get user information

  const [userCount, setUserCount] = useState(0); // Get user count from the DB
  const [eventCount, setEventCount] = useState(0); // Get event count from the DB
  const [galleryCount, setGalleryCount] = useState(0); // Get gallery count from the DB

  useEffect(() => { // Fetch user count
    const fetchUserCount = async () => {
      const response = await axios.get('http://localhost:5000/api/users/count');
      setUserCount(response.data.count); // Set user count
    };

    fetchUserCount();
  }, []);

  useEffect(() => { // Fetch event count
    const fetchEventCount = async () => {
      const response = await axios.get('http://localhost:5000/api/events/count');
      setEventCount(response.data.count);
    };

    fetchEventCount();
  }, []);

  useEffect(() => { // Fetch gallery count
    const fetchGalleryCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery/count');
        console.log('Gallery count response:', response); // Log the response to check
        setGalleryCount(response.data.count);
      } catch (error) {
        console.error('Error fetching gallery count:', error);
      }
    };

    fetchGalleryCount();
  }, []);
  
  return (
    <>
      <div className="text-gray-900 bg-gray-200">
          <section className='heroAdd overlayAdd py-24 px-4 lg:px-16'>
            <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
              <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose"> Welcome</h1>
              <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
                {user ? user.name : 'Loading...'}
              </h2>
            </div>
          </section>

        <section>
          <div className="flex items-center justify-center mt-10 mb-10 space-x-10">
            {/* User count card */}
            <Link to="/users" className="text-purple-600 hover:text-purple-800">
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <p className="text-xl text-gray-500">Total Users</p>
                <h2 className="text-6xl font-bold">{userCount}</h2>
              </div>
            </Link>
            
            {/* Event count card */}
            <Link to="/Aevents" className='text-purple-600 hover:text-purple-800'>
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <p className='text-xl text-gray-500'>Total Events Listed</p>
                <h2 className="text-6xl font-bold">{eventCount}</h2>
              </div>
            </Link>

            {/* Gallery count card */}
            <Link to="/Agallery" className='text-purple-600 hover:text-purple-800'>
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <p className='text-xl text-gray-500'>Total Images In Gallery</p>
                <h2 className="text-6xl font-bold">{galleryCount}</h2>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
