import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/events.css';

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);

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
    <>
      <div className='text-gray-900 bg-gray-200'>
      {/* WELCOME MESSAGE */}
        <section className='sectionBg py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
                <h1 className='text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose'>Welcome to our events page</h1>
                <p className='text-3xl md:text-2xl text-white leading-relaxed md:leading-snug mb-2'>
                  Come and join a fun and exciting adventure with Obanshire Cub Scouts. <br /> 
                  We have a range of activities and events for all ages.
                </p>
              </div>          
        </section>

        <section className='bg-gray-500 py-24 px-4 lg:px-16'>
          <div className='container mx-auto'>
            <h2 className='text-3xl mb-4'>Current Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {events.map(event => (
                <div
                  key={event._id}
                  className={`relative bg-white rounded-lg shadow-md p-6 ${flippedCard === event._id ? 'flipped' : ''}`}
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className="card-inner"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                      transform: flippedCard === event._id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    <div
                      className="card-front"
                      style={{
                        backfaceVisibility: 'hidden',
                        position: flippedCard === event._id ? 'absolute' : 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <h3 className='text-xl font-bold mb-2'>{event.title}</h3>
                      <p className='text-gray-700 mb-2'>{event.description}</p>
                      <p className='text-gray-700 font-bold mb-2'>Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p className='text-gray-700 font-bold mb-2'>Time: {event.time}</p>
                      <p className='text-gray-700 font-bold mb-2'>Location: {event.location}</p>
                      {event.image && (
                        <img
                          src={`http://localhost:5000/${event.image.replace('\\', '/')}`}
                          alt={event.title}
                          className='w-full h-48 object-cover mb-2 rounded'
                        />
                      )}
                      <button
                        onClick={() => setFlippedCard(flippedCard === event._id ? null : event._id)}
                        className='bg-purple-600 hover:bg-purple-700 text-yellow-300 text-white font-bold py-2 px-4 rounded mt-2'
                      >
                        More Info
                      </button>
                    </div>
                    <div
                      className="card-back bg-white rounded-lg p-6"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: flippedCard === event._id ? 'relative' : 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                      }}
                    >
                      {event.image && (
                        <img
                          src={`http://localhost:5000/${event.image.replace('\\', '/')}`}
                          alt={event.title}
                          className='w-full h-48 object-cover mb-2 rounded'
                        />
                      )}
                      <p className="text-gray-700">{event.moreInfo}</p>
                      <button
                        onClick={() => setFlippedCard(null)}
                        className='bg-purple-600 hover:bg-purple-700 text-yellow-300 font-bold py-2 px-4 rounded mt-2'
                      >
                        Less Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-24 px-4 lg:px-16'>
          <div className="flex items-center justify-center py-10">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <p className="text-xl text-gray-500">More Events</p>
              <h2 className="text-6xl font-bold">Coming Soon!</h2>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Events;
