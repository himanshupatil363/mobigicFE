import React from "react";

const Navbar = ({ setUploadPopup, setIsAuthenticated }) => {
  return (
    <div className="w-full bg-blue-300  flex justify-between px-10 p-4 text-lg">
      <div className="cursor-pointer" onClick={() => setUploadPopup(true)}>
        Upload File
      </div>
      <div className="text-xl font-semibold">Mobigic Test</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.removeItem("mobigic");
          setIsAuthenticated(false);
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
