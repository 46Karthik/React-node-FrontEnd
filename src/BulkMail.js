import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import assets from "./assets.gif";

export default function BulkMail() {
  const [loading, setLoading] = useState(false);
  const [formDataadded, setFormDataadded] = useState(new FormData());
  const [mailText, setMailText] = useState("");

  const uploadSinglefile = (event) => {
    const file = event.target.files[0];
    const newFormData = new FormData();
    newFormData.append("file", file);
    setFormDataadded(newFormData);
  };

  const onhandleSumbit = async () => {
    setLoading(true);
    formDataadded.append("mailText", mailText);
    try {
      const res = await axios.post("http://localhost:5000/bulkMail", formDataadded);
      if (res.data === "mail sent successfully") {
        toast.success(res.data);
      } else {
        toast.error(res.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center">
      {loading ? (
        <div className="flex items-center justify-center">
          <img src={assets} alt="loading" />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Excel file</p>
              </div>
              <input onChange={uploadSinglefile} id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div className="ml-10">
            <div className="flex flex-col">
              <textarea
                value={mailText}
                onChange={(e) => setMailText(e.target.value)}
                className="w-64 h-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                placeholder="Mail Text"
              ></textarea>
              <button
                onClick={onhandleSumbit}
                className="mt-3 px-2 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500"
              >
                Send Mail
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
