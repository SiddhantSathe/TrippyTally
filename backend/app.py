# from urllib import response
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from modules.gemini import generate



# app = Flask(__name__)
# CORS(app)


# @app.route('/generate', methods=['GET'])
# def mode():
#     # Get parameters from request.args (for GET requests)
#     source = request.args.get('source', 'mumbai')
#     destination = request.args.get('destination', 'pune')
#     get_mode = request.args.get('mode', '').lower()
    
#     valid_modes = ['bus', 'train', 'airways', 'car']
    
#     if get_mode not in valid_modes:
#         return jsonify({"error": "Invalid mode of transport. Please enter a valid mode."}), 400
    
#     if get_mode == 'bus':
#         bus_type = request.args.get('busType', '').lower()
#         valid_bus_types = ['private ac', 'private non ac', 'state transport']
        
#         if bus_type not in valid_bus_types:
#             return jsonify({"error": "Invalid bus type. Please enter a valid bus type."}), 400
            
#         query = f"What's the average {get_mode} fare from {source} to {destination} in {bus_type}? Return just the number."
        
#     elif get_mode == 'train':
#         train_class = request.args.get('trainClass', '').lower()
#         valid_train_classes = ['sleeper', '3ac', '2ac', '1ac']
        
#         if train_class not in valid_train_classes:
#             return jsonify({"error": "Invalid train class. Please enter a valid train class."}), 400
            
#         query = f"What's the average {get_mode} fare from {source} to {destination} in {train_class}? Return just the number."
        
#     elif get_mode == 'airways':
#         airways_class = request.args.get('airwaysClass', '').lower()
#         valid_airways_classes = ['economy', 'business']
        
#         if airways_class not in valid_airways_classes:
#             return jsonify({"error": "Invalid airways class. Please enter a valid airways class."}), 400
            
#         query = f"What's the average {get_mode} fare from {source} to {destination} in {airways_class}? Return just the number."
        
#     elif get_mode == 'car':
#         fuel_type = request.args.get('fuelType', '').lower()
        
#         if fuel_type not in ['petrol', 'diesel']:
#             return jsonify({"error": "Invalid fuel type. Please enter a valid fuel type."}), 400
            
#         query = f"What's the average {get_mode} fare from {source} to {destination} in {fuel_type}? Return just the number."
    
#     try:
#         # Get response from the gemini module
#         response_text = generate(query)
#         print(f"Generated response: {response_text}")


#         # Return JSON response to frontend
#         return jsonify({"response": response_text}), 200
#     except Exception as e:
#         print(f"Error generating response: {str(e)}")
#         return jsonify({"error": "Failed to generate response"}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)




from urllib import response
from flask import Flask, request, jsonify
from flask_cors import CORS
from modules.gemini import generate
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
mongo_pass = os.getenv("MONGO_PASS")
MONGO_URI = f"mongodb+srv://sathesiddhant21:{mongo_pass}@travelexpensecalc.zvjkwdm.mongodb.net/?retryWrites=true&w=majority&appName=travelexpensecalc"
client = MongoClient(MONGO_URI)
db = client.travel_expense_db
travel_records = db.travel_records

@app.route('/generate', methods=['GET'])
def mode():
    # Get parameters from request.args (for GET requests)
    source = request.args.get('source', 'mumbai')
    destination = request.args.get('destination', 'pune')
    get_mode = request.args.get('mode', '').lower()
    
    valid_modes = ['bus', 'train', 'airways', 'car']
    
    if get_mode not in valid_modes:
        return jsonify({"error": "Invalid mode of transport. Please enter a valid mode."}), 400
    
    # Check if we have a cached result in the database
    cached_result = travel_records.find_one({
        'source': source.lower(),
        'destination': destination.lower(),
        'mode': get_mode
    })
    
    # If we have a recent result (less than 24 hours old), return it
    if cached_result and 'timestamp' in cached_result:
        age_hours = (datetime.now() - cached_result['timestamp']).total_seconds() / 3600
        if age_hours < 24 and 'fare' in cached_result:
            print(f"Using cached result: {cached_result['fare']}")
            return jsonify({"response": cached_result['fare']}), 200
    
    # Otherwise proceed with generating a new result
    if get_mode == 'bus':
        bus_type = request.args.get('busType', '').lower()
        valid_bus_types = ['private ac', 'private non ac', 'state transport']
        
        if bus_type not in valid_bus_types:
            return jsonify({"error": "Invalid bus type. Please enter a valid bus type."}), 400
            
        query = f"What's the average {get_mode} fare from {source} to {destination} in {bus_type}? Return just the number."
        extra_params = {'busType': bus_type}
        
    elif get_mode == 'train':
        train_class = request.args.get('trainClass', '').lower()
        valid_train_classes = ['sleeper', '3ac', '2ac', '1ac']
        
        if train_class not in valid_train_classes:
            return jsonify({"error": "Invalid train class. Please enter a valid train class."}), 400
            
        query = f"What's the average {get_mode} fare from {source} to {destination} in {train_class}? Return just the number."
        extra_params = {'trainClass': train_class}
        
    elif get_mode == 'airways':
        airways_class = request.args.get('airwaysClass', '').lower()
        valid_airways_classes = ['economy', 'business']
        
        if airways_class not in valid_airways_classes:
            return jsonify({"error": "Invalid airways class. Please enter a valid airways class."}), 400
            
        query = f"What's the average {get_mode} fare from {source} to {destination} in {airways_class}? Return just the number."
        extra_params = {'airwaysClass': airways_class}
        
    elif get_mode == 'car':
        fuel_type = request.args.get('fuelType', '').lower()
        
        if fuel_type not in ['petrol', 'diesel']:
            return jsonify({"error": "Invalid fuel type. Please enter a valid fuel type."}), 400
            
        query = f"What's the average {get_mode} fare from {source} to {destination} in {fuel_type}? Return just the number."
        extra_params = {'fuelType': fuel_type}
    
    try:
        # Get response from the gemini module
        response_text = generate(query)
        print(f"Generated response: {response_text}")
        
        # If we got a valid numeric response, store it in the database
        try:
            # Clean up response - remove any non-numeric characters except decimal point
            clean_response = ''.join(c for c in str(response_text) if c.isdigit() or c == '.')
            fare_value = float(clean_response)
            
            # Prepare the record
            record = {
                'source': source.lower(),
                'destination': destination.lower(),
                'mode': get_mode,
                'fare': str(fare_value),  # Store as string to avoid precision issues
                'timestamp': datetime.now(),
                **extra_params  # Include mode-specific parameters
            }
            
            # Update or insert the record
            travel_records.update_one(
                {
                    'source': source.lower(),
                    'destination': destination.lower(),
                    'mode': get_mode,
                    **extra_params
                },
                {'$set': record},
                upsert=True
            )
            
        except (ValueError, TypeError) as e:
            print(f"Could not parse response as number: {e}")
            # Continue anyway - we'll still return the response even if we couldn't store it

        # Return JSON response to frontend
        return jsonify({"response": response_text}), 200
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({"error": "Failed to generate response"}), 500

@app.route('/history', methods=['GET'])
def get_history():
    """Endpoint to retrieve travel expense history"""
    try:
        # Get query parameters for filtering
        source = request.args.get('source', '').lower()
        destination = request.args.get('destination', '').lower()
        mode = request.args.get('mode', '').lower()
        
        # Build the query filter
        query_filter = {}
        if source:
            query_filter['source'] = source
        if destination:
            query_filter['destination'] = destination
        if mode:
            query_filter['mode'] = mode
        
        # Get records from MongoDB
        results = list(travel_records.find(
            query_filter,
            {'_id': 0}  # Exclude the MongoDB ID
        ).sort('timestamp', -1).limit(50))  # Get latest 50 records
        
        # Convert datetime objects to strings for JSON serialization
        for record in results:
            if 'timestamp' in record:
                record['timestamp'] = record['timestamp'].isoformat()
        
        return jsonify(results), 200
    except Exception as e:
        print(f"Error retrieving history: {str(e)}")
        return jsonify({"error": "Failed to retrieve history"}), 500

@app.route('/test', methods=['GET'])
def test():
    """Simple endpoint to test if the API is working"""
    return jsonify({"response": "750"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)