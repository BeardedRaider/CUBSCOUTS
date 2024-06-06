import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';



import '../../styles/gallery.css'; // Assuming you have common styles

const ChildDash = () => {
  const user = UserInformation();
  const videoUrl = 'https://videos.pexels.com/video-files/9304251/9304251-hd_1366_720_25fps.mp4';

  const [badgeCount, setBadgeCount] = useState(0); // Get badge count for the current user
  const [badges, setBadges] = useState([]); // State to store badges
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal
  const [selectedBadge, setSelectedBadge] = useState(null); // State for the selected badge for printing

  useEffect(() => {
    const fetchBadgeCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/badges/count', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBadgeCount(response.data.count);
      } catch (error) {
        console.error('Error fetching badge count:', error);
      }
    };

    fetchBadgeCount();
  }, []);

  const fetchCompletedBadges = async () => {
    if (!user) {
      console.error('User not loaded yet');
      return;
    }

    try {
      console.log(`Fetching badges for user with ID: ${user._id}`);
      const response = await axios.get(`http://localhost:5000/api/badges/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Fetch badge details from JSON file
      const badgeDataResponse = await fetch('/badges/badges.json');
      const badgeData = await badgeDataResponse.json();

      const userBadges = response.data.filter(badge => badge.completed);
      const completedBadges = userBadges.map(userBadge => {
        const badgeDetail = badgeData.find(b => b.title === userBadge.title);
        return {
          ...userBadge,
          ...badgeDetail
        };
      });

      setBadges(completedBadges);
    } catch (error) {
      console.error('Error fetching completed badges:', error);
    }
  };

  const openModal = () => {
    fetchCompletedBadges();
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  const handlePrint = (badge) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Badge Certificate</title>
        <style>
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          .certificate {
            border: 10px solid #ccc;
            padding: 40px;
            text-align: center;
            width: 90%; /* Adjusted to fill more of the A4 width */
            box-sizing: border-box;
          }
          .certificate h1 {
            font-size: 3em; /* Increased font size */
          }
          .certificate p {
            font-size: 1.5em; /* Increased font size */
            margin: 20px 20px; /* Increased margin */
          }
          .certificate h2 {
            font-size: 2.5em; /* Increased font size */
          }
          .certificate h3 {
            font-size: 2em; /* Increased font size */
          }
          .certificate img {
            max-width: 300px; /* Increased max width for image */
            margin-top: 30px; /* Increased margin-top */
            margin-bottom: 30px; /* Increased margin-bottom */
          }
        }
          body, html { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; }
          .certificate { border: 10px solid #ccc; padding: 20px; text-align: center; width: 80%; }
          .certificate h1 { font-size: 2.5em; }
          .certificate p { font-size: 1.2em; margin: 10px 0; }
          .certificate img { max-width: 200px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div className="certificate">
          <h1>Certificate of Achievement</h1>
          <p>This is to certify that</p>
          <h2>${user.name}</h2>
          <p>has successfully completed the</p>
          <h3>${badge.title}</h3>
          <img src="${badge.image}" alt="${badge.title} Badge" />
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
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
    <div>
      <section className='bg-gray-300 py-24 px-4 lg:px-16 relative'>
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2 relative z-10'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome</h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
            {user ? user.name : 'Loading...'}!
          </h2>
        </div>
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      </section>
      <section className='bg-gray-300 text-gray-500'>
        <div className="flex items-center justify-center py-10">
          {/* Badge count card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 hover:text-yellow-400" onClick={openModal}>
            <p className="text-xl hover:text-yellow-400">Badges Completed</p>
            <h2 className="text-6xl font-bold">{badgeCount}</h2>
          </div>
        </div>
      </section>

      <section className='bg-purple-800 '>
          {/*-------- Entertainment -------- */}
      <div className="marginLeft: '-100px' py-12 relative overflow-hidden " style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-yellow-300 font-bold text-2xl max-w-xs text-right mb-12 mt-10">After a hard day of scouting <br/> what can you do?
            </h2>
            {/* -------------Left image---------------- */}
            <div className="h-full mt-auto overflow-hidden relative">
            <img src="/images/ballPit.jpg" className="h-full w-full object-contain rounded-r-full" alt="Ball Pit"style={{marginLeft: '-100px'}} />            
            </div>
        </div>
          <div className="py-20 rightBox relative rounded-l-full shadow-2xl">
            <div className="relative z-20 pl-16 ml-10">
              <h2 className="text-yellow-400 font-black text-4xl leading-snug mb-10">Play Some Awesome Games!</h2>
              <p className="text-white text-sm mr-10">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie.
              </p>
              <Link to="/Games">
                <button className='bg-transparent hover:bg-yellow-400 text-yellow-400 hover:text-black rounded shadow hover:shadow-lg mt-2 py-2 px-4 border border-yellow-400 hover:border-transparent transition-all duration-300 ease-in-out'>
                  Start Gaming
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </section>

      <section className='bg-gray-300'>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-2xl text-gray-500">More</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Badges Modal'
        className='modal-content'
        overlayClassName='modal-overlay'
      >
        <div>
          <h2 className="text-2xl mb-4">Completed Badges</h2>
          <div className='gallery'>
            {badges.map((badge, index) => (
              <div key={index} className='gallery-item'>
                <img
                  className='h-auto max-w-full rounded-lg cursor-pointer'
                  src={badge.image}
                  alt={badge.title}
                  onClick={() => setSelectedBadge(badge)}
                />
                <p>{badge.title}</p>
                <button onClick={() => handlePrint(badge)} className='printBtn text-yellow-400'>Print</button>
              </div>
            ))}
          </div>
          <button onClick={closeModal} className='closeBtn text-yellow-400'>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default ChildDash;