import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInformation from '../../UserInfo'
import "../../styles/parent.css"
import img1 from '../../images/beach.jpg'

const ParentDash = () => {
  const user = UserInformation();
  const [childBadgeCount, setChildBadgeCount] = useState(0); // State to store child's badge count
  const [childBadges, setChildBadges] = useState([]); // State to store child's badges

  useEffect(() => {
    const fetchChildBadgeData = async () => {
      try {
        if (!user || !user.userId) {
          console.error('User information not available');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/users/${user.userId}/badges`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChildBadgeCount(response.data.count); // Set child's badge count
        setChildBadges(response.data.badges); // Set child's badges
      } catch (error) {
        console.error('Error fetching child badge data:', error);
      }
    };

    fetchChildBadgeData();
  }, [user]);
  
  return (
    <div>
      {/* welcome section gets the users name and displays it back on screen so they know they are logged in correctly */}
      <section className='heroDash overlayDash bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px]'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome
          </h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
          {user ? user.name : 'Loading...'}!
          </h2>
        </div>
      </section>
      {/* this section is the main content of the page */}
      <section className='bg-gray-400'>
      <div className="py-12 relative overflow-hidden ">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#480c88] font-bold text-2xl max-w-xs text-right mb-12 mt-10">What's On The <br/> Grounds?
            </h2>
            <div className="h-full mt-auto overflow-hidden relative">
            <img src={img1} className="h-full w-full object-contain" alt="" />           
            </div>
        </div>
          <div className="py-20 rightBox relative">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#480c88] font-black text-4xl leading-snug mb-10">Explore Our Facilities</h2>
              <p className="text-white text-sm mr-10">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
              </p>
              <button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white ">Take A Look Around</button>
            </div>
          </div>
        </div>
      </div>
      </section>

      <section className='bg-gray-400'>
        {/* Child's badge progress section */}
        <div className="py-4 relative overflow-hidden bg-gray-100">
          <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
            <div className="py-20 leftBox relative ">
              <div className="relative z-20 pl-12">
                <h2 className="text-[#480c88] font-black text-4xl leading-snug mb-10">Your Child's Progress</h2>
                <p className="text-gray-500 text-sm mr-10">
                  Here, you can find everything you need to know about your child's badge progress and print off badges.
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col pl-16">
              <h2 className="text-[#480c88] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Let's See How Fantastic They Are!</h2>
              <div className="h-full mt-auto overflow-hidden relative">
                        {/* Display child's badge count */}
                <section className='bg-gray-400'>
                  <div className="flex items-center justify-center py-10">
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 hover:text-yellow-400">
                      <p className="text-xl hover:text-yellow-400">Child's Badges Completed</p>
                      <h2 className="text-6xl font-bold">{childBadgeCount}</h2>
                    </div>
                  </div>
                </section>

                {/* Display child's badges */}
                <section className='bg-gray-400'>
                  <div className='gallery'>
                    {childBadges.map((badge, index) => (
                      <div key={index} className='gallery-item'>
                        <img
                          className='h-auto max-w-full rounded-lg cursor-pointer'
                          src={badge.image}
                          alt={badge.title}
                        />
                        <p>{badge.title}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
      <div className="py-12 relative overflow-hidden ">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#480c88] font-bold text-2xl max-w-xs text-right mb-12 mt-10">What's On The <br/> Grounds?
            </h2>
            <div className="h-full mt-auto overflow-hidden relative">
            <img src={img1} className="h-full w-full object-contain" alt="" />           
            </div>
        </div>
          <div className="py-20 rightBox relative">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#480c88] font-black text-4xl leading-snug mb-10">Explore Our Facilities</h2>
              <p className="text-white text-sm mr-10">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra nibh cras pulvinar.
              </p>
              <button className="mt-8 text-white uppercase py-3 text-sm px-10 border border-white ">Take A Look Around</button>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section>
      <div className="py-4 relative overflow-hidden bg-gray-100">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
        

          <div className="py-20 leftBox relative ">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#480c88] font-black text-4xl leading-snug mb-10">Your Childs Appointments</h2>
              <p className=" text-gray-500 text-sm mr-10">
                Here, you can find everthing you need to know about your child's upcoming appointments. You can also find out how to prepare for the appointments and what to expect.
              </p>
              <button className="mt-8 text-gray-500 uppercase py-3 text-sm px-10 border border-gray-500 ">Take A Look Around</button>

            </div>
          </div>
          <div className="w-full flex flex-col pl-16">
            <h2 className="text-[#480c88] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Getting Help where <br/> you need it.</h2>
            <div className="h-full mt-auto overflow-hidden relative">
            <img src={img1} className="h-full w-full object-contain mb-10" alt="" />           
            </div>
          </div>

        </div>
      </div>
      </section>
    </div>
  )
};

export default ParentDash;