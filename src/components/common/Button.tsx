import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 ${className}`}
        >
            {text}
        </button>
    );
}; 