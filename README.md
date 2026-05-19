# Parkinson’s Disease Prediction System

AI-powered Parkinson’s Disease prediction system using Machine Learning, FastAPI, React, and biomedical voice feature analysis.

---

## Overview

Parkinson’s Disease (PD) is a progressive neurodegenerative disorder that affects speech, coordination, and motor functions. Early detection is critical for improving treatment outcomes and patient care.

This project implements a Machine Learning–based Parkinson’s Disease Prediction System that analyzes biomedical voice features such as:

- Jitter
- Shimmer
- Harmonics-to-Noise Ratio (HNR)
- RPDE
- DFA

The system uses trained ML models to classify Parkinson’s progression and provides predictions through a modern web-based interface.

---

## Features

- Real-time Parkinson’s Disease prediction
- Biomedical voice feature analysis
- FastAPI backend integration
- React + Vite frontend dashboard
- Random Forest, SVM, and k-NN model comparison
- REST API communication
- User-friendly prediction interface
- Modular and scalable architecture

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Development Tools
- VS Code
- Git & GitHub
- Google Colab

---

## Machine Learning Models Used

| Model | Accuracy |
|---|---|
| k-Nearest Neighbors | 87.74% |
| Support Vector Machine | 84.51% |
| Random Forest Classifier | 94.64% |

The Random Forest Classifier achieved the highest overall performance and was selected for deployment.

---

## System Architecture

```text
Frontend (React UI)
        ↓
FastAPI Backend
        ↓
Feature Extraction & Preprocessing
        ↓
Machine Learning Model
        ↓
Prediction Result
```

The backend handles:
- preprocessing
- feature extraction
- model inference
- API communication

while the frontend provides a clean user experience for prediction and visualization.

---

## Project Structure

```text
parkinsons-disease-prediction-system/
│
├── Backend/
│   ├── main.py
│   ├── random_forest_classifier_model.joblib
│
├── src/
├── public/
├── screenshots/
├── README.md
├── package.json
├── vite.config.ts
└── .gitignore
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/parkinsons-disease-prediction-system.git
```

---

## Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
pip install fastapi uvicorn scikit-learn pandas numpy joblib
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Methodology

The project workflow includes:

1. Dataset preprocessing
2. Feature scaling using StandardScaler
3. Model training
4. Hyperparameter tuning using GridSearchCV
5. Cross-validation
6. Real-time inference using FastAPI APIs

---

## Dataset

The project uses the Parkinson’s Disease dataset from the UCI Machine Learning Repository containing biomedical voice measurements.

Features include:
- Jitter
- Shimmer
- RPDE
- DFA
- Pitch variation
- HNR

---

## Testing

The system was tested using:

- Unit Testing
- Integration Testing
- System Testing

The complete workflow:

```text
Input → API → Prediction → Result Display
```

was successfully validated.

---

## Screenshots

### Model Performance Results

![Results](screenshots/result.png)

<img width="939" height="756" alt="image" src="https://github.com/user-attachments/assets/a390d344-5fcc-4df1-abf0-b3854cd7386d" />


## Future Improvements

- MRI integration
- Multimodal healthcare analysis
- Cloud deployment
- User authentication
- Mobile support
- Deep learning implementation
- Clinical dashboard integration

---

## Conclusion

This project demonstrates how Machine Learning and biomedical voice analysis can assist in early Parkinson’s Disease prediction using a scalable full-stack AI system.

The developed solution combines:
- healthcare AI
- machine learning
- backend APIs
- frontend engineering

into a practical diagnostic support prototype.

---

## Authors

- Aditya Dhamala


Under the supervision of:
- Jagalingam P

Vellore Institute of Technology (VIT)

---

## License

This project is intended for academic and research purposes only.
