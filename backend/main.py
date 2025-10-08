from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, stocks, admin

app = FastAPI(title='StockPulse API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(auth.router, prefix='/auth')
app.include_router(stocks.router, prefix='/stocks')
app.include_router(admin.router, prefix='/admin')

@app.get('/')
def root():
    return {'msg':'StockPulse API running'}
