import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import UserInformation from '../../UserInfo';

import { toast } from 'react-hot-toast';
import '../../styles/gallery.css';

const Gallery = () => {// Gallery component
  const user = UserInformation();// Get user information
  const [modalIsOpen, setModalIsOpen] = useState(false);// State to manage modal open state
  const [title, setTitle] = useState('');// State to store image title
  const [image, setImage] = useState('');// State to store image file
  const [userName, setUserName] = useState('');// State to store user name
  const [userUploaded, setUserUploaded] = useState('');// State to store user who uploaded the image
  const [isSubmitting, setIsSubmitting] = useState(false);// State to manage form submission state
  const [gallery, setGallery] = useState([]);// State to store gallery images
  const [imageMap, setImageMap] = useState({});// State to store image map
  const [selectedImage, setSelectedImage] = useState(null);// State to store selected image

  useEffect(() => {
    // Set userName state with user name when user data is available
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  const openModal = (image) => {
    setSelectedImage(imageMap[image.title]);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gallery');
      const galleryData = response.data;
      setGallery(galleryData);
      const imageMapData = {};
      galleryData.forEach((gallery) => {
        imageMapData[gallery.title] = `http://localhost:5000/${gallery.image}`;
      });
      setImageMap(imageMapData);
    } catch (error) {
      console.error('Failed to fetch gallery', error);
      toast.error('Failed to fetch gallery');
    }
  };
  

  useEffect(() => {
    fetchGallery();
  }, []);



  const handleUpload = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title); // Append the title to the form data
    formData.append('image', image); // Append the image to the form data
    formData.append('userUploaded', userName);

    if (!title || !image) {
      toast.error('Please provide a title and image');
      return;
    }
  
    const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage
  
    if (!token) {
      toast.error('User not authenticated');
      return;
    }
  
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}` // Include the token in the request headers
    };
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: headers, // Pass the headers with the token
      });
      setGallery((prevGallery) => [...prevGallery, response.data]);
      setImageMap((prevImageMap) => ({
        ...prevImageMap,
        [response.data.title]: `http://localhost:5000/${response.data.image}`,
      }));
  
      setTitle('');
      setImage(null);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image', error);
      toast.error('Image is too large or incorrect format.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {// Function to print the selected image
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Image</title>
        <style>
          body, html { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
          img { max-width: 100%; max-height: 100%; }
        </style>
      </head>
      <body>
        <img src="${selectedImage}" alt="Image for Printing" />
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
    {/* // The following code snippet is responsible for rendering the gallery section of the page. It displays a welcome message to the user and a form to upload an image. The form contains input fields for the image title and file upload. When the form is submitted, the handleUpload function is called to upload the image to the server. The gallery section also displays the uploaded images in a grid layout. Each image is displayed as a gallery item with a rounded border. When an image is clicked, a modal opens displaying the full-size image. The modal contains buttons to close the modal and print the image. */}
      <div className="text-gray-900 bg-gray-200">
        <section className='heroGallery overlayGallery py-24 px-4 lg:px-16'>
          <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
            <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome to the Cub Scouts Gallery</h1>
            <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
              {user ? user.name : 'Loading...'}!
            </h2>
          </div>
        </section>

        <section className='bg-gray-300 py-24 px-4 lg:px-16'>
          <div className="flex items-center justify-center px-3">
            <h1 className="text-3xl">Upload An Image</h1>
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

              {/* Image Upload Input */}
              <label htmlFor="image" className='block text-gray-700 ml-12 flex items-center justify-center w-1/2'>
                Upload Image
              </label>
              <div className='mb-4 flex items-center justify-center'>
                <input
                  className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="file"
                  id='image'
                  onChange={(e) => setImage(e.target.files[0])}
                  accept='image/*'
                />
              </div>

              <div className='flex items-center justify-center'>
                <button
                  className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className='sectionBg3 pt-10'>
          <div className='container mx-auto p-4'>
            <div className='gallery'>
              {gallery.map((image, index) => (
                <div key={index} className='gallery-item'>
                  <img
                    className='h-auto max-w-full rounded-lg cursor-pointer'
                    src={imageMap[image.title]}
                    alt={image.title}
                    onClick={() => openModal(image)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Image Modal'
            className='modal-content'
            overlayClassName='modal-overlay'
          >
            <img src={selectedImage} alt='' className='modal-image' />
            <div>
              <button onClick={closeModal} className='closeBtn text-yellow-400'>X</button>
              <button onClick={handlePrint} className='printBtn text-yellow-400'>Print</button>
            </div>
          </Modal>
        </section>
      </div>
    </>
  );
};

export default Gallery;
