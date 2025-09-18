import React, { useState } from "react";
import { logActivity } from "../../services/apiService";

const subTypes = {
  TRANSPORTATION: [
    { value: "petrol_car", label: "Petrol Car" },
    { value: "electric_car", label: "Electric Car" },
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train" },
  ],
  DIET: [
    { value: "beef_meal", label: "Beef Meal" },
    { value: "chicken_meal", label: "Chicken Meal" },
    { value: "vegetarian_meal", label: "Vegetarian Meal" },
    { value: "vegan_meal", label: "Vegan Meal" },
  ],
};

const units = {
  TRANSPORTATION: "km",
  DIET: "meals",
  ENERGY: "kWh",
  SHOPPING: "items",
};

const ActivityLogger = ({ onActivityLogged }) => {
  const [category, setCategory] = useState("TRANSPORTATION");
  const [subType, setSubType] = useState(subTypes.TRANSPORTATION[0].value);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);

    if (subTypes[newCategory]) {
      setSubType(subTypes[newCategory][0].value);
    } else {
      setSubType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(value) <= 0) {
      setError("Value must be greater than zero.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await logActivity({ category, subType, value: parseFloat(value) });
      setValue("");
      onActivityLogged();
    } catch (err) {
      setError("Failed to log activity. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
      <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-emerald-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clipRule="evenodd"
          />
        </svg>
        Log a New Activity
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="TRANSPORTATION">Transportation</option>
              <option value="DIET">Diet</option>
              <option value="ENERGY">Energy</option>
              <option value="SHOPPING">Shopping</option>
            </select>
          </div>
          {subTypes[category] ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {subTypes[category].map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ({units[category]})
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., 50"
            required
            min="0.1"
            step="any"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-3 font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging...
            </>
          ) : (
            "Log Activity"
          )}
        </button>
      </form>
    </div>
  );
};

export default ActivityLogger;
