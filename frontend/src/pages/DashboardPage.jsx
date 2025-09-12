import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary">Greenlytics Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
            <p className="mt-4 text-text-secondary">
                Dashboard
            </p>
        </div>
    );
};

export default DashboardPage;
