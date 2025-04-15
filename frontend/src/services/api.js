import axios from 'axios';

// const API_URL = 'http://localhost:5000'; // Your Flask backend URL
const API_URL = "https://trippytally.onrender.com/"

export const calculateTravelExpense = async (source, destination, mode, options) => {
  try {
    const response = await axios.get(`${API_URL}/generate`, { 
      params: { 
        source, 
        destination, 
        mode,
        ...options 
      } 
    });
    
    console.log('Received response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error calculating travel expense:', error);
    if (error.response && error.response.data) {
        return { error: error.response.data.error || 'API request failed' };
      }
      return { error: 'Network error or server unavailable' };
    // throw error;
  }
};


export const fetchTravelHistory = async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/history`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching travel history:', error);
      throw error;
    }
  };