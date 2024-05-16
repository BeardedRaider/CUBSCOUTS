import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import UserInformation from '../../UserInfo'
import "../../styles/parent.css"

const Dashboard = () => {
  const user = UserInformation();//get user information

  const [userCount, setUserCount] = useState(0);//get user count from the DB

  useEffect(() => {//fetch user count
    const fetchUserCount = async () => {
      const response = await axios.get('http://localhost:5000/api/users/count');
      setUserCount(response.data.count);//set user count
    };

    fetchUserCount();
  }, []);
  
  return (
    <div>
      <section className='patientSection bg-gray-300 py-24 px-4 lg:px-16'>
        <div className='container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2'>
          <h1 className="text-3xl md:text-5xl p-1 text-yellow-300 tracking-loose">Welcome
          </h1>
          <h2 className="text-3xl md:text-4xl leading-relaxed md:leading-snug mb-2 text-white">
          {/* //display user name */}
          {user ? user.name : 'Loading...'}!
          </h2>
        </div>
      </section>

      <section>
          {/* User count card */}
          <div className="flex items-center justify-center mt-10 mb-10">
            <Link to="/users" className="text-purple-600 hover:text-purple-800">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
              <p className="text-xl text-gray-500">Total Users</p>
              <h2 className="text-6xl font-bold">{userCount}</h2>
            </div>
            </Link>
          </div>
      </section>
    </div>
  )
}

export default Dashboard