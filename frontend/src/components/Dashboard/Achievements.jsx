import React from 'react';

const achievementDetails = {
    FIRST_LOG: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        title: "First Log!",
        description: "You've started your journey by logging your first activity."
    },
    GREEN_COMMUTER: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
        ),
        title: "Green Commuter",
        description: "Logged over 50km of public transport usage. Great choice!"
    },
    VEGGIE_ENTHUSIAST: {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-lime-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
        ),
        title: "Veggie Enthusiast",
        description: "You've logged 5 vegetarian or vegan meals. A delicious way to help the planet!"
    },
};

const Achievements = ({ earnedAchievements }) => {
    if (!earnedAchievements || earnedAchievements.length === 0) {
        return (
             <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-800">Your Awards</h2>
                </div>
                <p className="text-gray-600">Your first badge is just around the corner! Keep logging your activities to earn awards.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-emerald-800">Your Awards</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earnedAchievements.map((key) => {
                    const details = achievementDetails[key];
                    if (!details) return null; 
                    return (
                        <div key={key} className="flex items-start p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                            <div className="mr-4 flex-shrink-0">{details.icon}</div>
                            <div>
                                <h3 className="font-bold text-emerald-800">{details.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{details.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;