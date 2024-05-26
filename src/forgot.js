// src/ForgotPasswordPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const BASE_URL = "http://localhost:5000"; // Update with your backend URL

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [code, setcode] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encryptedOtp, setEncryptedOtp] = useState("");
  const navigate = useNavigate();
  const checkOTP = async (e) => {
    if (password == confirmpassword){

      axios
      .post("http://localhost:5000/updatepassword", {
        code,
        email,
        password,
        encryptedOtp,
      })
      .then((result) => {
        console.log(result, "result");
        result.data.statuscode == 0
          ? toast.success(result.data.msg)
          : toast.error(result.data.msg);
        if (result.data.statuscode == 0) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      });
    e.preventDefault();

    }
    else{
      toast.error('password and confirm password mismatch');
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/forgt-password",
        { email }
      );
      if (response.data.msg === "Email sent successfully!") {
        toast.success("Email sent successfully!");
        setEncryptedOtp(response.data.key);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {!encryptedOtp == "" ? (
            <>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="Code" className="sr-only">
                    Code
                  </label>
                  <input
                    id="email-address"
                    name="Code"
                    type="text"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => {
                      setcode(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Password
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="Password"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="Password"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={checkOTP}
                >
                  Reset Password
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmit}
                >
                  Verification Code Send
                </button>
              </div>
            </>
          )}

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
