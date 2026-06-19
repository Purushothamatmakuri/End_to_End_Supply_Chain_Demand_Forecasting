import joblib
import pandas as pd
import traceback
import sys

def test_pipeline():
    print("Loading model...")
    model_path = r"C:\Users\Sai\.gemini\antigravity\scratch\chainpulse-analytics\backend\pkl_files\final_xgboost.pkl"
    pipeline = joblib.load(model_path)
    
    print(f"Pipeline Steps: {pipeline.steps}")
    
    regressor = pipeline.steps[-1][1]
    
    # Try passing a dummy array of 22 zeros
    import numpy as np
    dummy_input = np.zeros((1, 22))
    try:
        pred = regressor.predict(dummy_input)
        print(f"Prediction directly on regressor (with zeros): {pred}")
    except Exception as e:
        print("Regressor predict failed:")
        traceback.print_exc()

if __name__ == "__main__":
    test_pipeline()
