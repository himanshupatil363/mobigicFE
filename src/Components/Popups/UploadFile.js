import React, { useEffect, useState } from "react";
import config from "../../config";
import close from "../../assets/close.png";
import axios from "axios";
const UploadFile = ({ setUploadPopup, fetchData }) => {
  const [gotCode, setGotCode] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios({
      url: `${config.backendUri}/api/files/upload`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("mobigic")).token
        }`,
      },
    })
      .then((res) => {
        setGotCode(res.data.code);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [file, setFile] = useState();
  return (
    <div className="h-screen w-screen backdrop-blur-md backdrop-brightness-75 flex z-50 justify-center items-center absolute top-0 left-0">
      {gotCode ? (
        <div className="bg-white rounded-xl relative px-12 py-10">
          <p className="text-lg">Download code for this file is {gotCode}</p>
          <button
            onClick={() => {
              setUploadPopup(false);
              setGotCode();
            }}
            className="mt-8 bg-blue-800 px-8 py-2 rounded cursor-pointer text-white"
          >
            Okay
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl relative px-12 py-10">
          <div
            className="absolute cursor-pointer p-2 right-4 top-4"
            onClick={() => setUploadPopup(false)}
          >
            <img className="h-4 cursor-pointer" src={close} />
          </div>
          <p className="text-xl font-semibold mb-8">Choose a file to upload</p>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="mt-8 bg-blue-800 px-8 py-2 rounded cursor-pointer text-white"
              type="submit"
              value="Upload"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
