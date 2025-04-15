import React from 'react';

const TransportOptions = ({ options, onSelect }) => {
    return (
        <div>
            <h2>Select Transport Mode</h2>
            <ul>
                {options.map((option) => (
                    <li key={option} onClick={() => onSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransportOptions;