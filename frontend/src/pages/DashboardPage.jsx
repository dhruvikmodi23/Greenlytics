import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../services/apiService';
import MetricCard from '../components/Dashboard/MetricCard';
import CategoryChart from '../components/Dashboard/CategoryChart';
import ActivityLogger from '../components/Dashboard/ActivityLogger';
import Recommendations from '../components/Dashboard/Recommendations'; 
import Achievements from '../components/Dashboard/Achievements';     

const DashboardPage = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const data = await getDashboardData();
            setDashboardData(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch dashboard data. Your session might have expired.');
            console.error(err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    
    const lastWeek = dashboardData?.lastWeekFootprint ?? 0;
    const thisWeek = dashboardData?.thisWeekFootprint ?? 0;
    const percentageChange = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : (thisWeek > 0 ? 100 : 0);
    const hasData = dashboardData && thisWeek > 0;
    const today = new Date();

    const renderDashboardContent = () => {
        if (!hasData) {
            return (
                <div className="text-center bg-white p-8 rounded-2xl shadow-md border border-emerald-100">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-800 mb-2">Welcome to Greenlytics!</h2>
                    <p className="text-gray-600 mb-6">Log your first activity below to see your carbon footprint analysis.</p>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <MetricCard title="This Week's Footprint" value={thisWeek.toFixed(2)} unit="kg CO₂e" />
                            <MetricCard title="vs. Last Week" value={`${percentageChange.toFixed(1)}%`} isComparison={true} change={percentageChange} />
                        </div>
                         <Recommendations recommendations={dashboardData.recommendations} />
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
                       <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                            </svg>
                            Category Breakdown
                       </h2>
                       <CategoryChart data={dashboardData.categoryBreakdown} />
                    </div>
                </div>

                <Achievements earnedAchievements={Array.from(dashboardData.achievements || [])} />
            </>
        );
    };

    return (
        <div className="min-h-screen bg-emerald-50 text-gray-800">
            <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-emerald-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,3c0,0-4,4-4,8c0,2.209,1.791,4,4,4s4-1.791,4-4C16,7,12,3,12,3z M15.938,12.489C15.728,12.174,15.5,11.876,15.5,11 c0-1.933-2.133-3.5-3.5-5.5c-1.367,2-3.5,3.567-3.5,5.5c0,0.876-0.228,1.174-0.438,1.489C6.172,13.061,5,14.796,5,17 c0,3.866,3.134,5,7,5s7-1.134,7-5C19,14.796,17.828,13.061,15.938,12.489z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-emerald-800">Greenlytics</h1>
                            <p className="text-sm text-gray-500">
                               {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors shadow-sm">
                        Logout
                    </button>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {isLoading && (
                        <div className="text-center p-10 text-gray-500 bg-white rounded-2xl shadow-md border border-emerald-100">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
                            <p>Loading your Greenlytics dashboard...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-700 bg-red-50 p-6 rounded-2xl border border-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error} Please try logging in again.
                        </div>
                    )}
                    {!isLoading && !error && (
                        <>
                            {renderDashboardContent()}
                            <ActivityLogger onActivityLogged={fetchData} />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;