// This file includes utility functions that assist with various tasks throughout the application.

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const calculateDistance = (source, destination) => {
    // Placeholder function for calculating distance
    // In a real application, this could call an API or use a library
    return Math.abs(source.length - destination.length) * 10; // Example logic
};

export const validateInput = (input) => {
    return input && input.trim() !== '';
};