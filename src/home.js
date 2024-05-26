import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
     <h3 className="flex items-center mt-7 justify-center space-x-4">Pages</h3>
    <div className="flex items-center mt-10 justify-center space-x-4">
      <button
        onClick={() => navigate("/UploadImage")}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Files
      </button>
      <button
        onClick={() => navigate("/BulkMail")}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Bulk Mail
      </button>
    </div>
    <div className="flex items-center mt-10 justify-center space-x-4">
      <button
        onClick={() => navigate("/register")}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        signup
      </button>
      <button
        onClick={() => navigate("/login")}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
       login
      </button>
    </div>
    <div className="flex items-center mt-10 justify-center space-x-4">
      <button
        onClick={() => navigate("/Forgotpassword")}
        className="w-50 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Forgotpassword
      </button>
    </div>
    </>
   
  );
}

export default Home;
