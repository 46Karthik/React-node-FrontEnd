import React, { useState, useEffect } from "react";
import axios from "axios";

function Gallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/files")
      .then((response) => {
        setData(response.data);
        console.log("API data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item._id}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={item.url}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;

