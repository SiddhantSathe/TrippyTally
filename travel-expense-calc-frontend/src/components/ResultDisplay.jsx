import React from 'react';

const ResultDisplay = ({ result }) => {
  console.log("Result received in ResultDisplay:", result);
  
  if (!result) return (
    <div className="result-display">
      <h2>Awaiting Input</h2>
      <p>Please fill out the form and submit to see travel expense estimate.</p>
    </div>
  );

  return (
    <div className="result-display">
      <h2>Estimated Travel Expense</h2>
      
      {/* Debug information - remove in production */}
      {/* <div className="debug-info" style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        <p>Raw result: {JSON.stringify(result)}</p>
      </div> */}
      
      {result.response !== null && result.response !== undefined ? (
        <div className="result-value">₹{result.response}</div>
      ) : result.error ? (
        <div className="error-message">Error: {result.error}</div>
      ) : (
        <div className="result-value">No data returned from API</div>
      )}
      
      <p className="result-note">
        This is an approximate expense based on current rates.
      </p>
    </div>
  );
};

export default ResultDisplay;



// import React from 'react';

// const ResultDisplay = ({ result }) => {
//   if (!result) return null;

//   // Extract the response value from the result object
//   const responseValue = result.response;

//   return (
//     <div className="result-display">
//       <h2>Estimated Travel Expense</h2>
//       {typeof responseValue === 'object' ? (
//         <div className="result-value">
//           <p>Unable to display result directly</p>
//           <pre>{JSON.stringify(responseValue, null, 2)}</pre>
//         </div>
//       ) : (
//         <div className="result-value">₹{responseValue}</div>
//       )}
//       <p className="result-note">
//         This is an approximate expense based on current rates.
//       </p>
//     </div>
//   );
// };

// export default ResultDisplay;