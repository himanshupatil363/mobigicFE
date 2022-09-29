import axios from "axios";
import React, { useEffect, useState } from "react";
import UploadFile from "../Components/Popups/UploadFile";
import FileCode from "../Components/Popups/FileCode";
import config from "../config";
import Navbar from "../Components/Navbar";
const Dashboard = ({setIsAuthenticated}) => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState();
  const [uploadPopup, setUploadPopup] = useState(false);
  const [fileCodePopup, setFileCodePopup] = useState(false);
  const [codeError, setCodeError] = useState();
  const [code, setCode] = useState();
  const download = (file) => {
    console.log("k", code);
    if (code) {
      let reqConfig = {
        method: "get",
        url: `${config.backendUri}/api/files/download/${file.fileDetails.filename}?code=${code}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("mobigic")).token
          }`,
        },
        responseType: "blob",
      };

      axios(reqConfig)
        .then(function (response) {
          console.log(response);
          const href = URL.createObjectURL(response.data);

          // create "a" HTLM element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "file"); //or any other extension
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
          setFileCodePopup(false);
          setCode();
          setCodeError();
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            setCodeError("Wrong Code");
          }
        });
    } else {
      setFileCodePopup(true);
      setCurrentFile(file);
    }
  };
  const deleteFile = (file) => {
    console.log(file);
    let reqConfig = {
      method: "delete",
      url: `${config.backendUri}/api/files/delete/${file.fileDetails.filename}?code=${file.code}`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("mobigic")).token
        }`,
      },
      responseType: "blob",
    };

    axios(reqConfig)
      .then(function (response) {
        console.log(response);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchData = () => {
    var reqConfig = {
      method: "get",
      url: `${config.backendUri}/api/files`,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("mobigic")).token
        }`,
      },
    };

    axios(reqConfig)
      .then(function (response) {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={`${(uploadPopup || fileCodePopup) && `parent-overlay`}`}>
      <Navbar setUploadPopup={setUploadPopup} setIsAuthenticated={setIsAuthenticated} />
      {uploadPopup && (
        <UploadFile fetchData={fetchData} setUploadPopup={setUploadPopup} />
      )}
      {fileCodePopup && (
        <FileCode
          code={code}
          setCode={setCode}
          setFileCodePopup={setFileCodePopup}
          download={download}
          currentFile={currentFile}
          codeError={codeError}
          setCodeError={setCodeError}
        />
      )}
      <div className="grid grid-cols-8 gap-4 p-10">
        {files.map((file) => (
          <div className="flex flex-col items-center">
            <img className=" h-24 " src={file.fileUrl} />
            <button
              className="px-3 py-1 mt-2 bg-blue-300"
              onClick={() => download(file)}
            >
              download
            </button>
            <button
              className="px-3 py-1 mt-2 bg-red-300"
              onClick={() => deleteFile(file)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
