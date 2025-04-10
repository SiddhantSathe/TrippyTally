// // import React from 'react';
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// // import TravelForm from './components/TravelForm';
// // import ResultDisplay from './components/ResultDisplay';
// // import './styles/global.css';

// // const App = () => {
// //     return (
// //         <div>
// //             <Header />
// //             <main>
// //                 <TravelForm />
// //                 <ResultDisplay />
// //             </main>
// //             <Footer />
// //         </div>
// //     );
// // };

// // export default App;



// // filepath: c:\Programming\Travel-Expense-Calc\travel-expense-calc-frontend\src\App.jsx
// import React,{ useState } from 'react';
// import TravelForm from './components/TravelForm';
// import ResultDisplay from './components/ResultDisplay';
// import TravelHistory from './components/TravelHistory';
// import './styles/global.css';

// function App() {
//   const [result, setResult] = useState(null);
//   const [activeTab, setActiveTab] = useState('calculator');

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Travel Expense Calculator</h1>
//         <p>Calculate approximate travel expenses between cities</p>
//       </header>
      
//       <main className="app-content">
//         <div className="form-container">
//           <TravelForm onResultReceived={setResult} />
//         </div>
//         <div className="result-container">
//           <ResultDisplay result={result} />
//         </div>
//       </main>
      
//       <footer className="app-footer">
//         <p>&copy; {new Date().getFullYear()} Travel Expense Calculator</p>
//       </footer>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import ResultDisplay from './components/ResultDisplay';
import TravelHistory from './components/TravelHistory';
import './styles/global.css';

function App() {
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' or 'history'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Travel Expense Calculator</h1>
        <p>Calculate approximate travel expenses between cities</p>
        
        <nav className="app-nav">
          <button 
            className={`nav-tab ${activeTab === 'calculator' ? 'active' : ''}`} 
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`} 
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </nav>
      </header>
      
      <main className="app-content">
        {activeTab === 'calculator' ? (
          <>
            <div className="form-container">
              <TravelForm onResultReceived={setResult} />
            </div>
            <div className="result-container">
              <ResultDisplay result={result} />
            </div>
          </>
        ) : (
          <div className="history-wrapper">
            <TravelHistory />
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Travel Expense Calculator</p>
      </footer>
    </div>
  );
}

export default App;