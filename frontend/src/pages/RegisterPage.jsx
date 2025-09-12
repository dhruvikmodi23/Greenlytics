import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [householdSize, setHouseholdSize] = useState(1);
    const [dietPreference, setDietPreference] = useState('omnivore');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const data = await register({ username, email, password, zipCode, householdSize, dietPreference });
            localStorage.setItem('authToken', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to register. The email might already be in use.');
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
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Join Greenlytics</h1>
                        <p className="text-md opacity-90">Start your sustainability journey today.</p>
                    </div>
                    
                    
                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                            </svg>
                            Monthly Challenges
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300 mr-2 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Reduce plastic usage by 50%</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300 mr-2 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Walk or bike for short trips</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300 mr-2 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Meat-free days per week</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300 mr-2 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <span>Reduce energy consumption</span>
                            </li>
                        </ul>
                        <div className="mt-4 pt-3 border-t border-white/20">
                            <p className="text-xs italic">Complete challenges to earn badges and rewards!</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            <p className="text-xs text-center">Personalized Tracking</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                            </svg>
                            <p className="text-xs text-center">Data Insights</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="w-full lg:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-md space-y-4">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start items-center mb-4">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-2">
                                
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-emerald-800">Greenlytics</h1>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Create your account</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Or{' '}
                            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                                sign in to your account
                            </Link>
                        </p>
                    </div>
                    
                    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label htmlFor="username" className="block text-xs font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Choose a username"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        <div className="pt-2 mt-2">
                            <h3 className="text-sm font-medium text-emerald-800">Personalize Your Experience</h3>
                            <p className="text-xs text-gray-600 mt-1">Help us calculate your carbon footprint accurately</p>
                            
                            <div className="mt-2 grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="zipCode" className="block text-xs font-medium text-gray-700">
                                        ZIP / Postal Code
                                    </label>
                                    <input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        required
                                        value={zipCode}
                                        onChange={e => setZipCode(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                        placeholder="Postal code"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="householdSize" className="block text-xs font-medium text-gray-700">
                                        Household Size
                                    </label>
                                    <input
                                        id="householdSize"
                                        name="householdSize"
                                        type="number"
                                        min="1"
                                        required
                                        value={householdSize}
                                        onChange={e => setHouseholdSize(parseInt(e.target.value))}
                                        className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="dietPreference" className="block text-xs font-medium text-gray-700">
                                    Primary Diet
                                </label>
                                <select
                                    id="dietPreference"
                                    name="dietPreference"
                                    value={dietPreference}
                                    onChange={e => setDietPreference(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                >
                                    <option value="omnivore">Omnivore</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="pescatarian">Pescatarian</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 p-3">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-2">
                                        <h3 className="text-xs font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Create Account
                            </button>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-xs text-gray-600">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                                    Terms
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;