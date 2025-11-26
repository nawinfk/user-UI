import React from 'react';

const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded mt-2 inline-block">
      {change}
    </span>
  </div>
);

export default StatCard;


