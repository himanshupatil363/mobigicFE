import React, { useState } from "react";
import close from "../../assets/close.png";
const FileCode = ({
  code,
  setCode,
  setFileCodePopup,
  download,
  currentFile,
  codeError,
  setCodeError,
}) => {
  const [error, setError] = useState();

  return (
    <div className="h-screen w-screen backdrop-blur-md flex z-50 backdrop-brightness-75 justify-center items-center absolute top-0 left-0">
      <div className="bg-white rounded-xl relative px-12 py-10 flex flex-col items-center">
        <div
          className="absolute cursor-pointer p-2 right-4 top-4"
          onClick={() => setFileCodePopup(false)}
        >
          <img className="h-4 cursor-pointer" src={close} />
        </div>
        <div className="text-xl font-semibold">
          Please enter code to continue
        </div>
        <input
          className="border-2 p-2 mt-8 w-full"
          type="number"
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        {codeError && <div className="text-red-500">{codeError}</div>}
        <button
          className=" mt-8 bg-blue-800 px-8 py-2 rounded cursor-pointer text-white"
          onClick={() => {
            setError();
            setCodeError();
            console.log(code);
            if (code.toString().length !== 6) {
              setError("Code should be of 6 digits");
            } else {
              setError();
              download(currentFile);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileCode;
