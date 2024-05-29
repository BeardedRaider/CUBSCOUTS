import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import UserInformation from '../../UserInfo';
import { toast } from 'react-hot-toast';
import '../../styles/gallery.css';



const Gallery = () => {
  const user = UserInformation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [imageMap, setImageMap] = useState({}); // Define imageMap state
  const [selectedImage, setSelectedImage] = useState(null); // Define selectedImage state

  const openModal = (image) => {
    setSelectedImage(imageMap[image]);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        const galleryData = response.data;
        setGallery(galleryData);
        // Create a map of image names to image URLs
        const imageMapData = {};
        galleryData.forEach((gallery) => {
          imageMapData[gallery.title] = `http://localhost:5000/${gallery.image}`; // Adjust this based on your API response structure
        });
        setImageMap(imageMapData);
      } catch (error) {
        console.error('Failed to fetch Gallery', error);
      }
    };
    fetchGallery();
  }, []);

  // handleUpload function to upload an image
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
    // Check if the title and image are provided
    if (!title || !image) {
      toast.error('Please provide a title and image');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setGallery((prevGallery) => [...prevGallery, response.data]);
      setImageMap((prevImageMap) => ({
        ...prevImageMap,
        [response.data.title]: `http://localhost:5000/${response.data.image}`,
      }));

      setTitle('');
      setImage(null);
    } catch (error) {
      console.error('Failed to upload image', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
    <html>
    <head>
      <title>Print Image</title>
      <style>
        body, html { margin: 0; padding: 0; display: flex; justify-content: center; align-gallerys: center; height: 100vh; }
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
      <div className="text-gray-900 bg-gray-200">
      {/* WELCOME MESSAGE */}
      <section className=' heroGallery overlayGallery py-24 px-4 lg:px-16'>
          <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
            <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose" > Welcome to the Cub Scouts Gallery
            </h1>
            <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
              {user ? user.name : 'Loading...'}!
            </h2>
          </div>
        </section>
      {/* UPLOAD IMAGE */}
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className="flex gallerys-center justify-center px-3">
        <h1 className="text-3xl">Upload An Image</h1>
        </div>
        <div className="flex gallerys-center justify-center px-3 py-4">
          <form onSubmit={handleUpload} className='w-1/2 text-md bg-white shadow-md rounded p-5'>
          
          <label htmlFor="title" className='block text-gray-700 ml-3 flex gallerys-center justify-center w-1/2'>
              Title
            </label>
            <div className='mb-4 flex gallerys-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <label htmlFor="image" className='block text-gray-700 ml-12 flex gallerys-center justify-center w-1/2'>
              Upload Image
            </label>
            <div className='mb-4 flex gallerys-center justify-center'>
              <input
                className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="file"
                id='image'
                onChange={(e) => setImage(e.target.files[0])} // Set the image to the first file selected
                accept='image/*' // Accept only image files
              />
            </div>
            <div className='flex gallerys-center justify-center'>
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
      {/* GALLERY */}
      <section className='sectionBg3 pt-10'>
        <div className='container mx-auto p-4'>
          <div className='gallery'>
            {gallery.map((image, index) => (
              <div key={index} className='gallery-gallery'>
                <img
                  className='h-auto max-w-full rounded-lg cursor-pointer'
                  src={imageMap[image.title]}
                  alt=''
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
          className='modal-content' // Apply the class to the modal
          overlayClassName='modal-overlay' // Apply the class to the overlay
        >
          <img src={selectedImage} alt='' className='modal-image'/>{/* Apply the class to the image */}
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