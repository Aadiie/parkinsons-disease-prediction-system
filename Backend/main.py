from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # To allow your frontend to talk to this API
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

# --- 1. Initialize the API ---
app = FastAPI()

# --- 2. Add CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- 3. Load Your Model ---
try:
    model = joblib.load("random_forest_classifier_model.joblib")
    print("Model loaded successfully")
except FileNotFoundError:
    print("Model file not found. Make sure 'random_forest_classifier_model.joblib' is in the correct path.")
    model = None

# --- 4. Define the Input Data Shape ---
# This class correctly expects lowercase names
class InputFeatures(BaseModel):
    age: float
    sex: float
    test_time: float
    jitter_percent: float
    jitter_abs: float
    jitter_rap: float
    jitter_ppq5: float
    jitter_ddp: float
    shimmer: float
    shimmer_db: float
    shimmer_apq3: float
    shimmer_apq5: float
    shimmer_apq11: float
    shimmer_dda: float
    nhr: float
    hnr: float
    rpde: float
    dfa: float
    ppe: float

# --- 5. Define the Prediction Endpoint ---
@app.post("/predict")
async def predict(data: InputFeatures):
    if model is None:
        return {"error": "Model not loaded. Please check server logs."}

    # --- 6. Prepare Data for the Model ---
    input_dict = data.dict()
    
    # This mapping converts lowercase form names to the model's expected names
    feature_mapping = {
        "age": "age",
        "sex": "sex",
        "test_time": "test_time",
        "jitter_percent": "Jitter(%)",
        "jitter_abs": "Jitter(Abs)",
        "jitter_rap": "Jitter:RAP",
        "jitter_ppq5": "Jitter:PPQ5",
        "jitter_ddp": "Jitter:DDP",
        "shimmer": "Shimmer",
        "shimmer_db": "Shimmer(dB)",
        "shimmer_apq3": "Shimmer:APQ3",
        "shimmer_apq5": "Shimmer:APQ5",
        "shimmer_apq11": "Shimmer:APQ11",
        "shimmer_dda": "Shimmer:DDA",
        "nhr": "NHR",
        "hnr": "HNR",
        "rpde": "RPDE",
        "dfa": "DFA",
        "ppe": "PPE"
    }

    model_input_data = {model_name: input_dict.get(ui_name) for ui_name, model_name in feature_mapping.items()}

    
    model_feature_order = [
        "age",
        "sex",
        "test_time",
        "Jitter(%)",
        "Jitter(Abs)",
        "Jitter:RAP",
        "Jitter:PPQ5",
        "Jitter:DDP",
        "Shimmer",
        "Shimmer(dB)",
        "Shimmer:APQ3",
        "Shimmer:APQ5",
        "Shimmer:APQ11",
        "Shimmer:DDA",
        "NHR",
        "HNR",
        "RPDE",
        "DFA",
        "PPE"
    ]

    try:
        input_df = pd.DataFrame([model_input_data])
        # This line now re-orders the columns into the correct sequence
        input_df = input_df[model_feature_order]
    except Exception as e:
        return {"error": f"Error preparing data: {e}. Check feature names and order."}

    # --- 7. Make Prediction ---
    try:
        prediction = model.predict(input_df)
        probability = model.predict_proba(input_df)

        # Correctly gets probability for class 1 (Parkinson's)
        parkinsons_probability = probability[0][1] 

        return {
            "prediction": int(prediction[0]), # This will be 1 for Parkinson's
            "probability": float(parkinsons_probability)
        }
    except Exception as e:
        return {"error": f"Error during prediction: {e}"}

# --- 8. (Optional) Root Endpoint ---
@app.get("/")
def read_root():
    return {"message": "Parkinson's Prediction API is running."}

