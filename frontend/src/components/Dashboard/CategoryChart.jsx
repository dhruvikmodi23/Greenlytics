import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
    TRANSPORTATION: '#3B82F6', 
    DIET: '#EF4444', 
    ENERGY: '#F59E0B', 
    SHOPPING: '#8B5CF6', 
};

const CategoryChart = ({ data }) => {
    const chartData = Object.entries(data).map(([name, value]) => ({
        name: name.charAt(0) + name.slice(1).toLowerCase(),
        value,
    })).filter(entry => entry.value > 0);

    if (chartData.length === 0) {
        return <div className="flex items-center justify-center h-64 text-text-secondary">Log an activity to see your breakdown!</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.toUpperCase()] || '#8884d8'} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} kg CO₂e`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CategoryChart;
