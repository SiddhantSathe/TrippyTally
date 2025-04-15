import React, { useState, useEffect } from 'react';
import { fetchTravelHistory } from '../services/api';

const TravelHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    source: '',
    destination: '',
    mode: ''
  });

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchTravelHistory(filters);
        setHistory(data);
        setError(null);
      } catch (err) {
        setError('Failed to load travel history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="travel-history">
    <div className="history-container">
      <h2>Recent Travel Expenses</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="source-filter">Source:</label>
          <input
            type="text"
            id="source-filter"
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            placeholder="Filter by source"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="destination-filter">Destination:</label>
          <input
            type="text"
            id="destination-filter"
            name="destination"
            value={filters.destination}
            onChange={handleFilterChange}
            placeholder="Filter by destination"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="mode-filter">Transport Mode:</label>
          <select
            id="mode-filter"
            name="mode"
            value={filters.mode}
            onChange={handleFilterChange}
          >
            <option value="">All modes</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="airways">Airways</option>
            <option value="car">Car</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading history...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <p>No travel expense records found.</p>
        </div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Mode</th>
                <th>Details</th>
                <th>Fare (₹)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>{record.source}</td>
                  <td>{record.destination}</td>
                  <td>{record.mode}</td>
                  <td>
                    {record.busType ? `Bus: ${record.busType}` : ''}
                    {record.trainClass ? `Train: ${record.trainClass}` : ''}
                    {record.airwaysClass ? `Class: ${record.airwaysClass}` : ''}
                    {record.fuelType ? `Fuel: ${record.fuelType}` : ''}
                  </td>
                  <td>₹{record.fare}</td>
                  <td>{formatDate(record.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default TravelHistory;