import React from "react";

const Recommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-amber-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-emerald-800">
          Your Personal Insights
        </h2>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li
            key={index}
            className="flex items-start p-3 bg-emerald-50 rounded-lg"
          >
            <span className="text-emerald-600 font-bold mr-2 mt-0.5">•</span>
            <p className="text-gray-700">{rec}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
