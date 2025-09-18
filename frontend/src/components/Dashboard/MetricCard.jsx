import React from 'react';

const MetricCard = ({ title, value, unit, isComparison = false, change = 0 }) => {
    
    const getChangeStyles = () => {
        if (!isComparison) return { arrow: '', color: 'text-emerald-800', bg: 'bg-emerald-50' };
        if (change > 0) return { arrow: '↑', color: 'text-red-600', bg: 'bg-red-50' };
        if (change < 0) return { arrow: '↓', color: 'text-emerald-600', bg: 'bg-emerald-50' };
        return { arrow: '', color: 'text-gray-600', bg: 'bg-gray-50' };
    };
    
    const { arrow, color, bg } = getChangeStyles();

    return (
        <div className={`p-5 rounded-2xl shadow-md border border-emerald-100 ${bg}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline space-x-2">
                <p className={`text-3xl font-bold ${color}`}>{arrow}{value}</p>
                {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
            {isComparison && (
                <p className={`text-xs mt-2 ${color}`}>
                    {change > 0 ? 'Increase' : change < 0 ? 'Decrease' : 'No change'} from last week
                </p>
            )}
        </div>
    );
};

export default MetricCard;