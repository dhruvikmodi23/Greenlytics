import React from 'react';

const MetricCard = ({ title, value, unit, isComparison = false, change = 0 }) => {
    
    const getChangeStyles = () => {
        if (!isComparison) return { arrow: '', color: 'text-text-primary' };
        if (change > 0) return { arrow: '↑', color: 'text-red-500' };
        if (change < 0) return { arrow: '↓', color: 'text-green-500' };
        return { arrow: '', color: 'text-text-secondary' };
    };
    
    const { arrow, color } = getChangeStyles();

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg flex flex-col justify-between">
            <p className="text-md font-medium text-text-secondary">{title}</p>
            <div className="flex items-baseline space-x-2 mt-2">
                <p className={`text-4xl font-bold ${color}`}>{arrow}{value}</p>
                {unit && <span className="text-lg text-text-secondary">{unit}</span>}
            </div>
        </div>
    );
};

export default MetricCard;
