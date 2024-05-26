import React from 'react'

const Events = () => {
  return (
    <div>
      <section className='sectionBg'>
        <div className='text-white py-4'>
          <div className='container mx-auto flex flex-col md:flex-row items-center my-12 md:my-20'>
            <div className='flex flex-col w-full lg:w-1/2 justify-center items-start p-4'>
              <h1 className='text-3xl md:text-5xl p-1 text-white tracking-loose'>Welcome!
              </h1>
              <h2 className='text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2'>To Obanshire Cub Scouts</h2>
              <p className='text-2xl text-gray-50 mb-4'>
                Come and join a fun and exciting adventure with Obanshire Cub Scouts. We have a range of activities and events for all ages.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-gray-300 py-24 px-4 lg:px-16'>
        <div className="flex items-center justify-center py-10">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
      <section className='py-24 px-4 lg:px-16'>
        <div className="flex items-center justify-center py-10 ">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <p className="text-xl text-gray-500">Events</p>
            <h2 className="text-6xl font-bold">Coming Soon</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events