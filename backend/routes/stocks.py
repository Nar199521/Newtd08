from fastapi import APIRouter
from pydantic import BaseModel
import yfinance as yf

router = APIRouter()

class TickerReq(BaseModel):
    symbol: str

@router.post('/quote')
def quote(req: TickerReq):
    # Fetch using yfinance (requires internet when deployed)
    t = yf.Ticker(req.symbol)
    hist = t.history(period='1y')
    # return simple series for front-end plotting
    data = []
    for idx, row in hist.tail(50).iterrows():
        data.append({'date': str(idx.date()), 'close': float(row['Close'])})
    return {'symbol': req.symbol, 'series': data}
