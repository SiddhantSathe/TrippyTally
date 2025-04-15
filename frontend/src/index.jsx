// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles/global.css';

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );



// filepath: c:\Programming\Travel-Expense-Calc\travel-expense-calc-frontend\src\index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

console.log('Rendering App component...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);