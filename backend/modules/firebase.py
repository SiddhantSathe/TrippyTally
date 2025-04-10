import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("C:/Programming/Travel-Expense-Calc/travelbudget-c1209-firebase-adminsdk-fbsvc-69e602a0ab.json")
firebase_admin.initialize_app(cred)
