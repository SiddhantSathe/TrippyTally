// import React, { useState } from 'react';
// import styles from '../styles/components/Form.module.css';
// import { fetchFareData } from '../services/api';

// const TravelForm = () => {
//     const [source, setSource] = useState('');
//     const [destination, setDestination] = useState('');
//     const [transportMode, setTransportMode] = useState('');
//     const [fare, setFare] = useState(null);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const response = await fetchFareData(source, destination, transportMode);
//             setFare(response);
//         } catch (err) {
//             setError('Failed to fetch fare data. Please try again.');
//         }
//     };

//     return (
//         <div className={styles.formContainer}>
//             <h2>Travel Expense Calculator</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="source">Source:</label>
//                     <input
//                         type="text"
//                         id="source"
//                         value={source}
//                         onChange={(e) => setSource(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="destination">Destination:</label>
//                     <input
//                         type="text"
//                         id="destination"
//                         value={destination}
//                         onChange={(e) => setDestination(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="transportMode">Transport Mode:</label>
//                     <select
//                         id="transportMode"
//                         value={transportMode}
//                         onChange={(e) => setTransportMode(e.target.value)}
//                         required
//                     >
//                         <option value="">Select...</option>
//                         <option value="bus">Bus</option>
//                         <option value="train">Train</option>
//                         <option value="airways">Airways</option>
//                         <option value="car">Car</option>
//                     </select>
//                 </div>
//                 <button type="submit">Calculate Fare</button>
//             </form>
//             {error && <p className={styles.error}>{error}</p>}
//             {fare !== null && <p>The estimated fare is: {fare}</p>}
//         </div>
//     );
// };

// export default TravelForm;




// filepath: c:\Programming\Travel-Expense-Calc\travel-expense-calc-frontend\src\components\TravelForm.jsx
import React, { useState } from 'react';
import { calculateTravelExpense } from '../services/api';

const TravelForm = ({ onResultReceived }) => {
  const [formData, setFormData] = useState({
    source: 'mumbai',
    destination: 'pune',
    mode: 'bus',
    busType: 'private ac',
    trainClass: 'sleeper',
    airwaysClass: 'economy',
    fuelType: 'petrol'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { mode } = formData;
      let options = {};

      // Set the correct options based on the transport mode
      if (mode === 'bus') options = { busType: formData.busType };
      else if (mode === 'train') options = { trainClass: formData.trainClass };
      else if (mode === 'airways') options = { airwaysClass: formData.airwaysClass };
      else if (mode === 'car') options = { fuelType: formData.fuelType };

      const result = await calculateTravelExpense(
        formData.source,
        formData.destination,
        formData.mode,
        options
      );

      onResultReceived(result);
    } catch (err) {
      setError('Failed to calculate travel expense. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderTransportOptions = () => {
    const { mode } = formData;

    if (mode === 'bus') {
      return (
        <div className="form-group">
          <label htmlFor="busType">Bus Type:</label>
          <select
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
          >
            <option value="private ac">Private AC</option>
            <option value="private non ac">Private Non-AC</option>
            <option value="state transport">State Transport</option>
          </select>
        </div>
      );
    } else if (mode === 'train') {
      return (
        <div className="form-group">
          <label htmlFor="trainClass">Train Class:</label>
          <select
            id="trainClass"
            name="trainClass"
            value={formData.trainClass}
            onChange={handleChange}
          >
            <option value="sleeper">Sleeper</option>
            <option value="3ac">3AC</option>
            <option value="2ac">2AC</option>
            <option value="1ac">1AC</option>
          </select>
        </div>
      );
    } else if (mode === 'airways') {
      return (
        <div className="form-group">
          <label htmlFor="airwaysClass">Airways Class:</label>
          <select
            id="airwaysClass"
            name="airwaysClass"
            value={formData.airwaysClass}
            onChange={handleChange}
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>
        </div>
      );
    } else if (mode === 'car') {
      return (
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="travel-form">
      <div className="form-group">
        <label htmlFor="source">From:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="destination">To:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mode">Transport Mode:</label>
        <select
          id="mode"
          name="mode"
          value={formData.mode}
          onChange={handleChange}
        >
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="airways">Airways</option>
          <option value="car">Car</option>
        </select>
      </div>

      {renderTransportOptions()}

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate Expense'}
      </button>
    </form>
  );
};

export default TravelForm;