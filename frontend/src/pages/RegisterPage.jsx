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
        <div className="min-h-screen flex items-center justify-center bg-background py-12">
            <div className="w-full max-w-lg p-8 space-y-6 bg-surface rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary">Create Your Greenlytics Account</h1>
                    <p className="mt-2 text-text-secondary">Start tracking your carbon footprint today!</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
                    
                    <hr className="my-4"/>
                    <h3 className="text-lg font-semibold text-text-primary">Onboarding Details</h3>
                    
                    <input value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="ZIP / Postal Code" required className="w-full px-4 py-2 border rounded-lg" />
                    <div>
                        <label className="text-sm font-medium">Household Size</label>
                        <input type="number" value={householdSize} onChange={e => setHouseholdSize(parseInt(e.target.value))} min="1" required className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Primary Diet</label>
                        <select value={dietPreference} onChange={e => setDietPreference(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                            <option value="omnivore">Omnivore</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                        </select>
                    </div>

                     {error && <p className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="w-full px-4 py-3 font-semibold text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        Create Account
                    </button>
                </form>
                <p className="text-sm text-center text-text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
