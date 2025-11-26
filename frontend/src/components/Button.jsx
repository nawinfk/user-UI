import React from 'react';

const Button = ({ children, onClick, disabled, className = '', variant = 'primary', type = 'submit' }) => {
  const baseStyle = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 focus:ring-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 focus:ring-blue-100",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-100",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;