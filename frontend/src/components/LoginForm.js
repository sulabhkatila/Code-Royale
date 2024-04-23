import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

export default function LoginForm() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  if (loading)
    return <div className="h-screen text-white bg-dark-1">Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen font-mono text-white bg-dark-1">
      <div className="">
        <div className="relative p-8 border rounded-lg shadow-lg bg-slate-800 border-slate-400 backdrop-filter backdrop-blur-sm bg-opacity-30 ">
          <h2 className="mb-6 text-4xl font-bold text-center text-white">
            Login
          </h2>
          <form action="" onSubmit={handleLogin}>
            <div className="relative my-4">
              <input
                name="username"
                type="username"
                className="block px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none w-72 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                onChange={handleChange}
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
                name="password"
                type="password"
                className="block px-0 py-3 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none w-72 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown-translate-y-0 peer-focus:scale-75 peer-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <label htmlFor="Remember Me">Remember Me</label>
              </div>
              <Link to="" className="text-blue-500">
                Forgot Password
              </Link>
            </div>
            <button
              className="w-full mb-4 text=[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-200"
              type="submit"
            >
              Login
            </button>
            <div>
              <span className="m-4">
                New Here?{" "}
                <Link to="/accounts/register" className="text-blue-500">
                  Create an Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
