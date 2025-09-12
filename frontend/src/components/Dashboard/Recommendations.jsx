import React from 'react';
import { Lightbulb } from 'lucide-react';

const Recommendations = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) {
        return null; 
    }

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-xl font-semibold text-text-primary">Your Personal Insights</h2>
            </div>
            <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-primary font-bold mr-2 mt-1">›</span>
                        <p className="text-text-secondary">{rec}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;