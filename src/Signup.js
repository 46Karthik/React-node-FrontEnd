
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Image from './img/dear.jpg'
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { name, email, password })
      .then((result) => {
      if(result.data.statuscode == 1){
        toast.error(result.data.msg)
      }
      else{
        toast.success(result.data.msg)
        setTimeout(()=>{
          navigate('/login');
        },1000)    
      }
      })
      .catch((err) => console.log(err, "post error"));
  };

  return (
    <div className="total-page bg-cover bg-center py-32" style={{ backgroundImage: `url(${Image})` }}>
     
      <div className="total-back mt-20">
        <div className="total-input w-96 px-5 py-8 mx-auto my-auto border border-gray-300 rounded-lg shadow-lg bg-white">
          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-6">
            <div className="input1">
              <h4 className="title1 text-center">Create an Account</h4>
              <input
                className="input-name w-full px-4 py-2 border border-gray-300 rounded"
                autoComplete="input-name"
                name="name"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input-mail w-full px-4 py-2 border border-gray-300 rounded mt-3"
                type="email"
                name="email"
                placeholder="Enter E-mail Address.."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input2">
              <input
                className="input-pass w-full px-4 py-2 border border-gray-300 rounded"
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button">
              <button  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Signup</button>
            </div>
          </form>
          <hr className="my-6 border-gray-300" />
          <div className="bottom-fp text-center">
            <Link className="bottom-fp1 text-blue-500 hover:text-black">Forget password?</Link>
            <br />
            <Link className="bottom-fp2 text-blue-500 hover:text-black" to="/login">Already have an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
