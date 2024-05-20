import React, { useState } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo'
import { toast } from 'react-hot-toast';



const Aevents = () => {
  //weclcome message
  const user = UserInformation();

  //For the form to add events
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('null');
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

  const handleUpload = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!title || !description || !date || !time || !location || !image) {
      toast.error('All fields are required');
      return;
    }

    setIsSubmitting(true); // Disable the button to prevent multiple submissions

    try {
      const formData = new FormData();  // Create a new FormData object
      formData.append('title', title);  // Append the title to the form data
      formData.append('description', description);  // Append the description to the form data
      formData.append('date', date);  // Append the date to the form data
      formData.append('time', time);  // Append the time to the form data
      formData.append('location', location);  // Append the location to the form data
      formData.append('image', image);  // Append the image to the form data

      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    // clear the input fields
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setImage('null');

    toast.success('Event created successfully');
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);// Refresh the page after 2 seconds
  
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Event creation failed');
    } 
  } finally {
      setIsSubmitting(false); // Re-enable the button after submission
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
  } else {
    setImage(null);
  }
};


  // ---------------Create events
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

      <div className='text-gray-900 bg-gray-200'>
        
      {/* --------------- Create events------------- */}
        <section className='bg-gray-300 py-24 px-4 lg:px-16'>
          
          <div className="flex items-center justify-center px-3">
          <h1 className="text-3xl">Create Events</h1>
          </div>

        <div className="flex items-center justify-center px-3 py-4">

          <form onSubmit={handleUpload} className='w-1/2 text-md bg-white shadow-md rounded p-5'>
            <label htmlfor="title" className='block text-gray 700 ml-3 flex items-center justify-center w-1/2'>
              Title
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              type="text"
              id='title'
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Title" 
              />
            </div>

              <label htmlfor="description" className='block text-gray 700 ml-10 flex items-center justify-center w-1/2'>
                Description
              </label>
            <div className='mb-4 flex items-center justify-center'>
              <textarea 
              className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description' 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description" 
              
              />
            </div>

            <label htmlfor="date" className='block text-gray 700 ml-4 flex items-center justify-center w-1/2'>
              Date
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='date' 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              />
            </div>

            <label htmlfor="time" className='block text-gray 700 ml-4 flex items-center justify-center w-1/2'>
              Time
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='time' 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              />
            </div>

            <label htmlfor="location" className='block text-gray 700 ml-8 flex items-center justify-center w-1/2'>
              Location
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='location' 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Location" 
              />
            </div>

            <label htmlfor="image" className='block text-gray 700 ml-12 flex items-center justify-center w-1/2'>
              Upload Image
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="file" 
              id='image'
              onChange={handleFileChange}// Set the image to the first file selected
              accept='image/*'  // Accept only image files
              />
            </div>
            <div className='flex items-center justify-center'>
              <button className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' 
              type="submit"
              disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Event'}
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

export default Aevents;