import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo'
import { Toaster } from 'react-hot-toast';



const Aevents = () => {
  const user = UserInformation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = { title, description, date, time, location, image };
    await axios.post('http://localhost:5000/events', event);

    // clear the input fields
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setImage('');
  };

  return (
    <div>
      <section className='patientSection bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome
          </h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
          {user ? user.name : 'Loading...'} to the events page.
          </h2>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
      {/* // Toaster component for notification */}
      <Toaster /> 
      <div className='text-gray-900 bg-gray-200'>
        
      {/* --------------- Create events------------- */}
        <section className='bg-gray-300 py-24 px-4 lg:px-16'>
          
          <div className="p-4 flex mt-10">
          <h1 className="text-3xl">Create Events</h1>
          </div>

        <div className="flex items-center justify-center px-3 py-4 mb-10">

          <form onSubmit={handleSubmit} className='w-1/2 text-md bg-white shadow-md rounded p-5'>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Title" required 
              />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <textarea 
              className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description" 
              required 
              />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} required 
              />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} required 
              />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Location" required 
              />
            </div>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="Image URL" required 
              />
            </div>
            <div className='flex items-center justify-center'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
              type="submit">
                Create Event
              </button>
            </div>          
          </form>
        </div>
          {/* <div className="flex items-center justify-center bg-gray-300 py-10">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <p className="text-xl text-gray-500">Events</p>
              <h2 className="text-6xl font-bold">Coming Soon</h2>
            </div>
          </div> */}
        </section>
      </div>
    </div>
  )
}

export default Aevents