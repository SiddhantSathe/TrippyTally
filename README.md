# TrippyTally - Travel Expense Calculator

A full-stack web application that helps users calculate travel expenses between different cities using various modes of transport.

## 🌟 Features

- Calculate travel expenses for different transportation modes:
  - Bus (Private AC, Private Non-AC, State Transport)
  - Train (Sleeper, 3AC, 2AC, 1AC)
  - Airways (Economy, Business)
  - Car (Petrol, Diesel)
- View cost estimates in real-time
- Access travel expense history
- Filter previous estimates by source, destination, and mode
- Data caching for faster repeat queries

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios for API requests
- Modern, responsive UI
- React Hooks for state management

### Backend
- Flask (Python)
- MongoDB Atlas for database storage
- Generative AI integration for fare estimation
- RESTful API architecture

## 📋 Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- MongoDB Atlas account

### Backend Setup
1. Navigate to the backend directory:
```bash
cd Travel-Expense-Calc/backend
```

2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Dependencies
```bash
pip install -r requirements.txt
```

4. Create a .env file in the backend directory with
```bash 
MONGO_PASS=your_mongodb_password
```

5. Start the Flask server:
```bash
python app.py
```

## Frontend Setup
- Navigate to the frontend directory.
```bash
cd Travel-Expense-Calc/travel-expense-calc-frontend
```
- Install dependencies.
```bash
npm install
```
- Start the development server.
```bash
npm start
```

## 🖥️ Usage
1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Enter source and destination cities.
3. Select mode of transport and specific options.
4. Get instant fare estimates.
5. Switch to the **History** tab to view previous calculations.

## 📊 Data Flow
1. User inputs travel details.
2. Request is sent to Flask backend API.
3. Backend checks MongoDB cache for recent similar queries.
4. If not found, generates new estimate.
5. Result is stored in MongoDB and returned to user.
6. Frontend displays the results.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch: 
   ```bash
   git checkout -b feature/amazing-feature
   ```