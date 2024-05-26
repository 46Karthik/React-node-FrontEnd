import React, { useState } from "react";
import axios from "axios";
import assets from "./assets.gif";
import { useDropzone } from 'react-dropzone';
import Gallery from "./gallery.js";
import toast, { Toaster } from 'react-hot-toast';

function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filedata, setFiledata] = useState(null);
  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFiledata(uploadedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64,filedata) => {
    setLoading(true);
    console.log(filedata)
    try {
      const res = await axios.post("http://localhost:5000/uploadImage", { image: base64,
      Name: filedata.name,
      size: String(filedata.size)
     });
      setUrl(res.data.url);
      toast.success("Image uploaded successfully")
      window.location.reload()
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image:")
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    setSelectedFiles(files[0])
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64,files[0]);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  return (
    <div className="flex justify-center flex-col m-8 ">
         <Gallery/>
      <div>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Upload Photo
        </h2>
      </div>
      <div>
        {url && (
          <div>
            Access your file at{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <img src={assets} alt="loading" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                 {...getInputProps()}
                 onChange={uploadImage}
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
              />
            </label>
          </div>
        )}
      </div>
      {filedata && (
        <div>
          <p>Selected file: {filedata.name}</p>
          <button onClick={uploadImage}>Upload File</button>
        </div>
      )}
    </div>

   
  );
}

export default UploadImage;





















