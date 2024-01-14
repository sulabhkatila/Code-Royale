import React from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <div className="flex items-center justify-center h-screen font-mono text-white bg-dark-1">
      <div className=''>
        <div className="relative p-8 border rounded-lg shadow-lg bg-slate-800 border-slate-400 backdrop-filter backdrop-blur-sm bg-opacity-30 ">
          <h2 className="mb-6 text-4xl text-center text-whitefont-bold">
            Register
          </h2>
          <form action="">
            <div className="relative my-4">
              <input
                type="username"
                className="block px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none w-72 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown-translate-y-0 peer-focus:scale-75 peer-translate-y-6"
              >
                Username
              </label>
            </div>
            <div className="relative my-4">
              <input
                type="email"
                className="block px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none w-72 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown-translate-y-0 peer-focus:scale-75 peer-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative my-4">
              <input
                type="password"
                className="block px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none w-72 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown-translate-y-0 peer-focus:scale-75 peer-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="flex items-center justify-between">
             
              {/* Remember me ? */}
              
            </div>
            <button
              className="w-full mb-4 text=[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-200"
              type="submit"
            >
              Register
            </button>
            <div>
              <span className="m-4">
                Already Regsired?{" "}
                <Link to="/accounts/login" className="text-blue-500">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
