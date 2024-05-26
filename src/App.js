import './index.css'
import {BrowserRouter, Route , Routes, useLocation} from 'react-router-dom'

import Login from '../src/login';
import Register from '../src/Signup';
import ForgotPasswordPage from './forgot';
import UploadImage from './imageUpload';
import { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import BulkMail from './BulkMail';
import Home from './home'


function App() {
 return (
    <div>
    <BrowserRouter>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    

    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/Forgotpassword" element={<ForgotPasswordPage/>}/>
    <Route path="/UploadImage" element={<UploadImage/>}/>
    <Route path="/BulkMail" element={<BulkMail/>}/>
    </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App
  