import React, { useState } from 'react';
import { logActivity } from '../../services/apiService';

const subTypes = {
    TRANSPORTATION: [
        { value: 'petrol_car', label: 'Petrol Car' },
        { value: 'electric_car', label: 'Electric Car' },
        { value: 'bus', label: 'Bus' },
        { value: 'train', label: 'Train' },
    ],
    DIET: [
        { value: 'beef_meal', label: 'Beef Meal' },
        { value: 'chicken_meal', label: 'Chicken Meal' },
        { value: 'vegetarian_meal', label: 'Vegetarian Meal' },
        { value: 'vegan_meal', label: 'Vegan Meal' },
    ],
};

const units = {
    TRANSPORTATION: 'km',
    DIET: 'meals',
    ENERGY: 'kWh',
    SHOPPING: 'items'
};

const ActivityLogger = ({ onActivityLogged }) => {
    const [category, setCategory] = useState('TRANSPORTATION');
    const [subType, setSubType] = useState(subTypes.TRANSPORTATION[0].value);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
       
        if (subTypes[newCategory]) {
            setSubType(subTypes[newCategory][0].value);
        } else {
            setSubType('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(value) <= 0) {
            setError('Value must be greater than zero.');
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            await logActivity({ category, subType, value: parseFloat(value) });
            setValue('');
            onActivityLogged(); 
        } catch (err) {
            setError('Failed to log activity. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Log a New Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary">Category</label>
                        <select value={category} onChange={handleCategoryChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                            <option value="TRANSPORTATION">Transportation</option>
                            <option value="DIET">Diet</option>
                            <option value="ENERGY">Energy</option>
                            <option value="SHOPPING">Shopping</option>
                        </select>
                    </div>
                    {subTypes[category] ? (
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Type</label>
                            <select value={subType} onChange={e => setSubType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                                {subTypes[category].map(st => <option key={st.value} value={st.value}>{st.label}</option>)}
                            </select>
                        </div>
                    ) : <div />}
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary">Amount ({units[category]})</label>
                    <input 
                        type="number"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="e.g., 50"
                        required
                        min="0.1"
                        step="any"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 font-semibold text-white bg-secondary rounded-lg hover:bg-opacity-90 disabled:bg-gray-400">
                    {isSubmitting ? 'Logging...' : 'Log Activity'}
                </button>
            </form>
        </div>
    );
};

export default ActivityLogger;
