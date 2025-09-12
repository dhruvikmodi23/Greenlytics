import React from 'react';
import { Award, Leaf, Bus, Users } from 'lucide-react';


const achievementDetails = {
    FIRST_LOG: {
        icon: <Award className="w-8 h-8 text-amber-500" />,
        title: "First Log!",
        description: "You've started your journey by logging your first activity."
    },
    GREEN_COMMUTER: {
        icon: <Bus className="w-8 h-8 text-emerald-500" />,
        title: "Green Commuter",
        description: "Logged over 50km of public transport usage. Great choice!"
    },
    VEGGIE_ENTHUSIAST: {
        icon: <Leaf className="w-8 h-8 text-lime-600" />,
        title: "Veggie Enthusiast",
        description: "You've logged 5 vegetarian or vegan meals. A delicious way to help the planet!"
    },
    
};


const Achievements = ({ earnedAchievements }) => {
    if (!earnedAchievements || earnedAchievements.length === 0) {
        
        return (
             <div className="bg-surface p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                     <Award className="w-6 h-6 text-gray-400 mr-3" />
                     <h2 className="text-xl font-semibold text-text-primary">Your Awards</h2>
                </div>
                <p className="text-text-secondary">Your first badge is just around the corner! Keep logging your activities to earn awards.</p>
            </div>
        );
    }

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold text-text-primary">Your Awards</h2>
            </div>
            <div className="space-y-4">
                {earnedAchievements.map((key) => {
                    const details = achievementDetails[key];
                    if (!details) return null; 
                    return (
                        <div key={key} className="flex items-center p-3 bg-background rounded-lg">
                            <div className="mr-4 flex-shrink-0">{details.icon}</div>
                            <div>
                                <h3 className="font-bold text-text-primary">{details.title}</h3>
                                <p className="text-sm text-text-secondary">{details.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;
