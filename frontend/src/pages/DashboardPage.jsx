import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../services/apiService';
import MetricCard from '../components/Dashboard/MetricCard';
import CategoryChart from '../components/Dashboard/CategoryChart';
import ActivityLogger from '../components/Dashboard/ActivityLogger';

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
    }, []); // Removed navigate from dependency array as it's stable

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    
    // --- Data Calculation ---
    const lastWeek = dashboardData?.lastWeekFootprint ?? 0;
    const thisWeek = dashboardData?.thisWeekFootprint ?? 0;
    const percentageChange = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : (thisWeek > 0 ? 100 : 0);
    const hasData = dashboardData && thisWeek > 0;
    const today = new Date("2025-09-12T12:55:00");

    // --- Render Logic ---
    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10 text-text-secondary">Loading your EcoTrack dashboard...</div>;
        }

        if (error) {
            return <div className="text-center text-red-600 bg-red-100 p-6 rounded-lg">{error} Please try logging in again.</div>;
        }

        if (!hasData) {
            return (
                <div className="text-center bg-surface p-10 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-primary mb-2">Welcome to EcoTrack!</h2>
                    <p className="text-text-secondary mb-6">Your dashboard is ready. Log your first activity below to see your carbon footprint analysis.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <MetricCard 
                            title="This Week's Footprint"
                            value={thisWeek.toFixed(2)}
                            unit="kg CO₂e"
                        />
                        <MetricCard 
                            title="vs. Last Week"
                            value={`${percentageChange.toFixed(1)}%`}
                            isComparison={true}
                            change={percentageChange}
                        />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-surface p-6 rounded-xl shadow-lg">
                   <h2 className="text-xl font-semibold text-text-primary mb-4">Category Breakdown</h2>
                   <CategoryChart data={dashboardData.categoryBreakdown} />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <header className="bg-surface shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">EcoTrack</h1>
                        <p className="text-sm text-text-secondary">
                           {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
                    >
                        Logout
                    </button>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* The main dashboard content is rendered first */}
                    {renderContent()}
                    {/* The activity logger is now always visible below the main content */}
                    <ActivityLogger onActivityLogged={fetchData} />
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;

