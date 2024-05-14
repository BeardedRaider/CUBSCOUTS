import React from 'react'
import "../../styles/home.css"

const Home = () => {
  return (
    <div>
      <section className='sectionBg'>
        <div className='text-white py-8 mt-20'>
          <div className='container mx-auto flex flex-col md:flex-row items-center my-12 md:my-20'>
            <div className='flex flex-col w-full lg:w-1/2 justify-center items-start p-4'>
              <h1 className='text-3xl md:text-5xl p-1 text-white tracking-loose'>Welcome!
              </h1>
              <h2 className='text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2'>To Obanshire Cub Scouts</h2>
              <p className='text-2xl text-gray-50 mb-4'>
                Come and join a fun and exciting adventure with Obanshire Cub Scouts. We have a range of activities and events for all ages.
              </p>
              <a href="/login"
              className='bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent'>Login Now</a>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Home