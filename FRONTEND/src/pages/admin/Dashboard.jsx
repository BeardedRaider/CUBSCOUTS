import React from 'react'
import UserInformation from '../../UserInfo'
import "../../styles/parent.css"
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const user = UserInformation();
  
  return (
    <div>
      <section className='patientSection bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome
          </h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white"> 
          {user ? user.name : 'Loading...'}!
          </h2>
        </div>
      </section>
    </div>
  )
}

export default Dashboard