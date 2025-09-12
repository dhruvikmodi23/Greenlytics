import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login({ email, password });
      console.log("Login successful, token:", data.token);
      localStorage.setItem("authToken", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 to-teal-100">
      
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-emerald-700 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIvPjwvZz48L3N2Zz4=')]"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-10">
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-3">Welcome to Greenlytics</h1>
            <p className="text-md opacity-90">
              Track your carbon footprint, visualize your impact, and join the
              sustainability movement.
            </p>
          </div>

          
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
              </svg>
              Monthly Challenges
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-300 mr-2 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Reduce plastic usage by 50%</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-300 mr-2 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Walk or bike for short trips</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-300 mr-2 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Meat-free days per week</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-300 mr-2 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Reduce energy consumption</span>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-xs italic">
                Complete challenges to earn badges and rewards!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-1 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <p className="text-xs text-center">Track Emissions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-1 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
              <p className="text-xs text-center">Visualize Data</p>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-8 pb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-400/20"></div>
          <div className="w-12 h-12 rounded-full bg-teal-300/30"></div>
        </div>
      </div>

      
      <div className="w-full lg:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center mb-4">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-2">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-emerald-800">Greenlytics</h1>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xs font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Sign in
              </button>
            </div>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-emerald-100 text-gray-500 ">
                    New to Greenlytics?
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <Link
                  to="/register"
                  className="w-full flex justify-center py-2 px-4 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Create your account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
