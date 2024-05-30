import React from 'react'
import UserInformation from '../../UserInfo'
import "../../styles/parent.css"

const ChildDash = () => {
  const user = UserInformation();
  const videoUrl = 'https://videos.pexels.com/video-files/9304251/9304251-hd_1366_720_25fps.mp4';
  
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
      <section>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
      <section className='bg-gray-300'>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChildDash