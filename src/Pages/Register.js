import axios from "axios";
import React, { useState } from "react";
import config from "../config";
import { Link } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [reenter, setReenter] = useState();
  const [err, setErr] = useState();
  const handleRegister = ({ setIsAuthenticated }) => {
    axios
      .post(`${config.backendUri}/api/users/signup`, {
        username: username,
        password: password,
      })
      .then((data) => {
        localStorage.setItem("mobigic", JSON.stringify(data.data));
        setIsAuthenticated(true);
      })
      .catch((err) => setErr(err.response.data.message));
  };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-white flex flex-col items-start p-10 rounded">
        <div className="flex justify-center w-full text-3xl text-blue-900 font-bold mb-5">
          <p>Register</p>
        </div>
        <p className="text-lg">Username</p>
        <input
          value={username}
          className="rounded my-1 border md:w-72 p-2"
          onChange={(e) => setUsername(e.target.value)}
          type="email"
        />
        <p className="mt-3 text-lg">Password</p>
        <input
          className="rounded my-1 border md:w-72 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <p className="mt-3 text-lg">Reenter password</p>
        <input
          className="rounded my-1 border md:w-72 p-2"
          value={reenter}
          onChange={(e) => setReenter(e.target.value)}
          type="password"
        />
        <div className="text-red-400">{err}</div>
        <div className="flex justify-end w-full">
          <Link to="/login" className="cursor-pointer text-blue-800">
            already have an account?
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="mt-6 bg-blue-800 text-white px-8 rounded py-2"
            onClick={() => {
              if (password == reenter) {
                setErr();
                handleRegister();
              } else {
                setErr("Password mismatch");
              }
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
