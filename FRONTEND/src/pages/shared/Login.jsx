import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();//prevent the default form submission
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
      });

      console.log("Login successful");
      console.log('Token:', response.data.token);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("role", response.data.role);

      if (response.data.role === 'admin') {
          navigate("/dashboard");
      } else if (response.data.role === 'parent') {
          navigate("/parent");
      } else if (response.data.role === 'child') {
          navigate("/child");
      }
  } catch (error) {
      console.error(error);
      alert("Login failed", error.response.data.error);
  }
};

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole === 'admin') {
            setAdmin(true);
        }
    }, []);

return (
    <div>
      <div class="bg-gray-100 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div class="w-1/2 h-screen hidden lg:block">
            <img
                src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
                alt=""
                class="object-cover w-full h-full"
            />
        </div>
    {/* <!-------- Right: Login Form --------> */}
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            {/* <!-- -------Username Input------ --> */}
            <div class="mb-4">
              <label for="email" class="block text-gray-600">
                {/* Email */}
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            {/* <!-------- Password Input --------> */}
            <div class="mb-4">
              <label for="password" class="block text-gray-600">
                {/* Password */}
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}//set the password state
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>
            {/* <!-------- Admin Checkbox --------> */}
            <div class="mb-4 flex items-center">
              <input
                type="checkbox"
                id="checkbox_id"
                checked={admin}//check the admin state
                onChange={() => setAdmin(!admin)}//toggle the admin state
                class="text-blue-500"
              />
              <label for="checkbox_id" class="text-gray-600 ml-2">
                If Admin Please Select
              </label>
            </div>
            
            {/* <!-- Login Button --> */}
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" onClick={handleLogin}
            >
              Login
            </button>
        
          {/* <!-- Sign up  Link --> */}
            <div class="mt-6 text-blue-500 text-center">
              <button class="hover:underline">Sign up Here</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;