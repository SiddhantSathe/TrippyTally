# Travel Expense Calculator

This project is a React-based frontend application for calculating travel expenses based on user input. It interacts with a backend service to fetch fare data for various modes of transport.

## Project Structure

```
travel-expense-calc-frontend
├── public
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # Metadata for the application
│   └── robots.txt          # Search engine indexing control
├── src
│   ├── components          # React components
│   │   ├── Header.jsx      # Header component
│   │   ├── Footer.jsx      # Footer component
│   │   ├── TravelForm.jsx  # Form for user input
│   │   ├── ResultDisplay.jsx# Displays calculation results
│   │   └── TransportOptions.jsx # Options for transport selection
│   ├── hooks               # Custom hooks
│   │   └── useTransportData.js # Hook for managing transport data
│   ├── services            # API service functions
│   │   └── api.js         # Functions for API calls
│   ├── utils               # Utility functions
│   │   └── helpers.js      # Helper functions
│   ├── App.jsx             # Main application component
│   ├── index.jsx           # Entry point for the React application
│   └── styles              # Stylesheets
│       ├── global.css      # Global styles
│       └── components      # Component-specific styles
│           ├── Form.module.css # Styles for TravelForm
│           └── Results.module.css # Styles for ResultDisplay
├── .gitignore              # Git ignore file
├── package.json            # npm configuration file
├── README.md               # Project documentation
└── vite.config.js          # Vite configuration file
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd travel-expense-calc-frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- Use the TravelForm component to input your travel details, including source, destination, and transport mode.
- The ResultDisplay component will show the calculated travel expenses based on the input provided.
- The application supports various transport options, including bus, train, airways, and car.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
