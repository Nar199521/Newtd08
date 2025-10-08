from fastapi import APIRouter
from pydantic import BaseModel
import yfinance as yf

router = APIRouter()


class TickerReq(BaseModel):
    symbol: str

class SymbolsReq(BaseModel):
    symbols: list[str]


@router.post('/quote')
def quote(req: TickerReq):
    t = yf.Ticker(req.symbol)
    hist = t.history(period='1y')
    data = []
    for idx, row in hist.tail(50).iterrows():
        data.append({'date': str(idx.date()), 'close': float(row['Close'])})
    return {'symbol': req.symbol, 'series': data}

# New endpoint: fetch data for up to 2000 stocks
@router.post('/quotes')
def quotes(req: SymbolsReq):
    # Limit to 2000 symbols for performance
    symbols = req.symbols[:2000]
    tickers = yf.Tickers(' '.join(symbols))
    result = {}
    for sym in symbols:
        t = tickers.tickers.get(sym)
        if t is None:
            result[sym] = {'error': 'not found'}
            continue
        try:
            hist = t.history(period='1mo')
            prices = []
            for idx, row in hist.tail(10).iterrows():
                prices.append({'date': str(idx.date()), 'close': float(row['Close'])})
            info = t.info if hasattr(t, 'info') else {}
            result[sym] = {
                'prices': prices,
                'shortName': info.get('shortName'),
                'sector': info.get('sector'),
                'marketCap': info.get('marketCap'),
            }
        except Exception as e:
            result[sym] = {'error': str(e)}
    return result
