# StockPulse — Scaffold (React + FastAPI)

This is a minimal runnable scaffold for a Stock Market Analysis platform.
It includes:
- React frontend (Vite) with Login, Signup, UserDashboard, AdminDashboard (mocked auth)
- FastAPI backend with endpoints for auth, stock quotes (yfinance), and CSV upload.

## How to run

### Backend
1. Create virtualenv: python -m venv venv
2. Activate and install: pip install -r requirements.txt
3. Start server: uvicorn main:app --reload

### Frontend
1. cd frontend
2. npm install
3. npm run dev

## Notes
- Auth is mocked in this scaffold. Replace with real DB, JWT, and proper password hashing.
- yfinance requires internet at runtime to fetch real quotes.
- CSV upload endpoint expects a `symbol` column.

