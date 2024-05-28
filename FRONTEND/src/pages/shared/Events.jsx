import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo'


const Events = () => {
  const user = UserInformation();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch Events', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <section className='sectionBg'>
        <div className='text-white py-4'>
          <div className='container mx-auto flex flex-col md:flex-row items-center my-12 md:my-20'>
            <div className='flex flex-col w-full lg:w-1/2 justify-center items-start p-4'>
              <h1 className='text-3xl md:text-5xl p-1 text-white tracking-loose'>Welcome
              </h1>
              <h2 className='text-2xl md:text-2xl leading-relaxed md:leading-snug mb-2'>To Obanshire Cub Scouts {user ? user.name : 'Loading...'}! </h2>
              <p className='text-1xl text-gray-50 mb-4'>
                Come and join a fun and exciting adventure with Obanshire Cub Scouts. We have a range of activities and events for all ages.
              </p>
            </div>
          </div>
        </div>
      </section>
            {/* --------------- Display events------------- */}
            <section className='bg-gray-500 py-24 px-4 lg:px-16'>
        <div className='container mx-auto'>
          <h2 className='text-3xl mb-4'>Current Events</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {events.map(event => (
              <div key={event._id} className='bg-white rounded-lg shadow-md p-6'>
                {/* // Display the title, description, date, time, location, and image of the event by appending the path to the base URL  */}
                <h3 className='text-xl font-bold mb-2'>{event.title}</h3>
                <p className='text-gray-700 mb-2'>{event.description}</p>
                <p className='text-gray-700 font-bold mb-2'>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className='text-gray-700 font-bold mb-2'>Time: {event.time}</p>
                <p className='text-gray-700 font-bold mb-2'>Location: {event.location}</p>
                {event.image && (
                  <img src={`http://localhost:5000/${event.image.replace('\\', '/')}`} alt={event.title} className='w-full h-48 object-cover mb-2 rounded' />// Display the image by appending the image path to the base URL
              )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section> */}
      <section className='py-24 px-4 lg:px-16'>
        <div className="flex items-center justify-center py-10 ">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events