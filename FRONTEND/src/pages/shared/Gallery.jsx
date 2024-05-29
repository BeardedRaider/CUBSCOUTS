import React, { useState } from 'react';
import Modal from 'react-modal';
import images from '../../components/images.json';
import UserInformation from '../../UserInfo';
import '../../styles/gallery.css';

// import image directly
import beach from '../../images/beach.jpg';
import beach1 from '../../images/beach1.jpg';
import camping from '../../images/camping.jpg';
import chess from '../../images/chess.jpg';
import ducks from '../../images/ducks.jpg';
import fire from '../../images/fire.jpg';
import group1 from '../../images/group1.jpg';
import landing from '../../images/landing.jpg';
import leader2 from '../../images/leader2.jpg';
import leaders from '../../images/leaders.jpg';
import loginImg from '../../images/loginImg.jpg';
import tentgame from '../../images/tentgame.jpg';
import walk from '../../images/walk.jpg';

const imageMap = {// imageMap is an object that contains all the images
  'beach.jpg': beach,
  'beach1.jpg': beach1,
  'camping.jpg': camping,
  'chess.jpg': chess,
  'ducks.jpg': ducks,
  'fire.jpg': fire,
  'group1.jpg': group1,
  'landing.jpg': landing,
  'leader2.jpg': leader2,
  'leaders.jpg': leaders,
  'loginImg.jpg': loginImg,
  'tentgame.jpg': tentgame,
  'walk.jpg': walk,
};


const Gallery = () => {
  const user = UserInformation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(imageMap[image]);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
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
      {/* GALLERY */}
      <section className='sectionBg3 pt-10'>
        <div className='container mx-auto p-4'>
          <div className='gallery'>
            {images.map((image, index) => (
              <div key={index} className='gallery-item'>
                <img
                  className='h-auto max-w-full rounded-lg cursor-pointer'
                  src={imageMap[image]}
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