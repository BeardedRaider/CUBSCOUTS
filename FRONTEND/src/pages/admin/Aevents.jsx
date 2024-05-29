import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo';
import { toast } from 'react-hot-toast';

const Aevents = () => {
  // User Information
  const user = UserInformation();

  // State for creating new events
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [moreInfo, setMoreInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for fetching and managing existing events
  const [events, setEvents] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle form submission for creating a new event
  const handleUpload = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!title || !description || !date || !time || !location || !image || !moreInfo) {
      toast.error('All fields are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', location);
      formData.append('image', image);
      formData.append('moreInfo', moreInfo);

      await axios.post('http://localhost:5000/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
      setImage(null);
      setMoreInfo('');

      toast.success('Event created successfully');

      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Event creation failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes for existing events
  const handleInputChange = (e, eventId) => {
    const { name, value } = e.target;
    setEvents(events.map(event => event._id === eventId ? { ...event, [name]: value } : event));
  };

  // Handle file changes for existing events
  const handleFileChange = (e, eventId) => {
    const file = e.target.files[0];
    if (file) {
      setEvents(events.map(event => event._id === eventId ? { ...event, imageFile: file } : event));
    }
  };

  // Handle updating an existing event
const handleUpdate = async (eventId) => {
  const eventToUpdate = events.find(event => event._id === eventId);

  const formData = new FormData();
  formData.append('title', eventToUpdate.title);
  formData.append('description', eventToUpdate.description);
  formData.append('date', eventToUpdate.date);
  formData.append('time', eventToUpdate.time);
  formData.append('location', eventToUpdate.location);
  formData.append('moreInfo', eventToUpdate.moreInfo);

  // check if a new image is uploaded
  if (eventToUpdate.imageFile) {
    formData.append('image', eventToUpdate.imageFile);
  }

  console.log('Updating Event:', {
    eventId,
    title: eventToUpdate.title,
    description: eventToUpdate.description,
    date: eventToUpdate.date,
    time: eventToUpdate.time,
    location: eventToUpdate.location,
    image: eventToUpdate.imageFile ? eventToUpdate.imageFile.name : 'No new image',
    moreInfo: eventToUpdate.moreInfo,
  });

  setIsSubmitting(true);
  try {
    const updateResponse = await axios.put(`http://localhost:5000/api/events/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Event updated successfully');

    // Update state with the updated event
    const updatedEventIndex = events.findIndex(event => event._id === eventId);
    const updatedEvents = [...events];
    updatedEvents[updatedEventIndex] = updateResponse.data; // Replace existing event with updated event
    setEvents(updatedEvents);

  } catch (error) {
    console.error('Failed to update event', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
    toast.error('Failed to update the event');
  } finally {
    setIsSubmitting(false);
  }
};


  // Handle deleting an existing event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      toast.success('Event deleted successfully');
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
      toast.error('Failed to delete the event');
    }
  };

  return (
    <div>
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome</h1>
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

      {/* Create Event Form */}
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className="flex items-center justify-center px-3">
          <h1 className="text-3xl">Create Events</h1>
        </div>
        <div className="flex items-center justify-center px-3 py-4">
          <form onSubmit={handleUpload} className='w-1/2 text-md bg-white shadow-md rounded p-5'>
            <label htmlFor="title" className='block text-gray-700 ml-3 flex items-center justify-center w-1/2'>
              Title
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <label htmlFor="description" className='block text-gray-700 ml-10 flex items-center justify-center w-1/2'>
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

            <label htmlFor="date" className='block text-gray-700 ml-4 flex items-center justify-center w-1/2'>
              Date
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='date'
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <label htmlFor="time" className='block text-gray-700 ml-4 flex items-center justify-center w-1/2'>
              Time
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='time'
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <label htmlFor="location" className='block text-gray-700 ml-8 flex items-center justify-center w-1/2'>
              Location
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='location'
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
            
            <label htmlFor="moreInfo" className='block text-gray-700 ml-3 flex items-center justify-center w-1/2'>
                More Info
            </label>
            <div className='mb-4 flex items-center justify-center'>
                <textarea
                    className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='moreInfo'
                    value={moreInfo}
                    onChange={(e) => setMoreInfo(e.target.value)}
                    placeholder="More Info"
                />
            </div>
            
            <label htmlFor="image" className='block text-gray-700 ml-12 flex items-center justify-center w-1/2'>
              Upload Image
            </label>
            <div className='mb-4 flex items-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="file"
                id='image'
                onChange={(e) => setImage(e.target.files[0])} // Set the image to the first file selected
                accept='image/*' // Accept only image files
              />
            </div>

            <div className='flex items-center justify-center'>
              <button
                className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Display Events */}
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto'>
          <h2 className='text-3xl mb-4'>Current Events</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {events.map(event => (
              <div key={event._id} className='bg-white rounded-lg shadow-md p-6'>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Description</label>
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={event.date.split('T')[0]} // Ensure proper date format
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={event.time}
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={event.location}
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>More Info</label>
                  <textarea
                    name="moreInfo"
                    value={event.moreInfo}
                    onChange={(e) => handleInputChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, event._id)}
                    className='w-full border rounded px-3 py-2'
                  />
                </div>
                {event.image && (
                  <img
                    src={`http://localhost:5000/${event.image.replace('\\', '/')}`}
                    alt={event.title}
                    className='w-full h-48 object-cover mb-2 rounded'
                  />
                )}
                <div className='flex justify-between mt-4'>
                  <button
                    onClick={() => handleUpdate(event._id)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Save'}
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aevents;
