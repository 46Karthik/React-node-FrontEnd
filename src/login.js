import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image from './img/dear.jpg'
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", true);
    axios.post("http://localhost:5000/login", { email, password })
      .then((result) => {console.log(result)
        toast.success(result.data)
        if (result.data == "Log in successfully"){ 
          setTimeout(() => {
            navigate('/');
          }, 3000);
          // window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="total-page bg-cover bg-center py-32" style={{ backgroundImage: `url(${Image})` }}>
    <div className="total-back mt-20">
      <div className="total-input w-96 px-5 py-8 mx-auto my-auto border border-gray-300 rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input1">
            <h4 className="title1 text-center"> Welcome </h4>
            <input
              className="input-mail w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Enter E-mail Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input2">
            <input
              className="input-pass w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Login</button>
          </div>
        </form>
        <hr className="my-6 border-gray-300" />
        <div className="bottom-fp text-center">
          <a href="/Forgotpassword" className="bottom-fp1 text-blue-500 hover:text-black">Forget password?</a>
          <br />
          <a href="/register" className="bottom-fp1 text-blue-500 hover:text-black">Create an account</a>
        </div>
      </div>
    </div>
  </div>
  


  



  );
};

export default Login;