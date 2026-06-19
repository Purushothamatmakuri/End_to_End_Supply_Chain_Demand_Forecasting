# 🚀 Running ChainPulse Analytics Locally

This guide explains how to run the complete Supply Chain Demand Forecasting application locally.

The application consists of:

* **Backend** → FastAPI (ML inference, APIs, SHAP explainability)
* **Frontend** → Next.js (Executive Dashboard UI)

---

# Prerequisites

Install:

* Python 3.10+
* Node.js (LTS)
* npm
* Git

---

# Step 1 — Start Backend (FastAPI)

Open **PowerShell Window 1**

Navigate to backend:

```powershell
cd C:\Users\Sai\.gemini\antigravity\scratch\chainpulse-analytics\backend
```

Run server:

```powershell
venv\Scripts\uvicorn main:app --port 8000 --host 0.0.0.0 --reload
```

Expected output:

```text
INFO: Uvicorn running on http://0.0.0.0:8000
```

Verify:

Open:

```text
http://localhost:8000/docs
```

You should see FastAPI API documentation.

---

# Step 2 — Start Frontend (Next.js)

Open **PowerShell Window 2**

Navigate:

```powershell
cd C:\Users\Sai\.gemini\antigravity\scratch\chainpulse-analytics\frontend
```

Install dependencies:

```powershell
npm install
```

Run:

```powershell
npm run dev
```

Expected output:

```text
Ready in ...
Local: http://localhost:3000
```

---

# Step 3 — Launch Application

Open browser:

```text
http://localhost:3000
```

The Executive Dashboard should load.

---

# Troubleshooting

## Backend Issues

Activate environment:

```powershell
venv\Scripts\activate
```

Install requirements:

```powershell
pip install -r requirements.txt
```

---

## Frontend Issues

Reinstall packages:

```powershell
npm install
```

Start again:

```powershell
npm run dev
```

---

# Architecture

```plaintext
Frontend (Next.js)
       ↓
API Layer
       ↓
Backend (FastAPI)
       ↓
ML Models
       ↓
Prediction + Explainability
```

---

# Author

Purushotham Sai
End-to-End Supply Chain Demand Forecasting
