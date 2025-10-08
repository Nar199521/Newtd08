from fastapi import APIRouter, UploadFile, File, Form
import pandas as pd
from io import StringIO

router = APIRouter()

@router.post('/upload-csv')
async def upload_csv(file: UploadFile = File(...)):
    content = await file.read()
    try:
        df = pd.read_csv(StringIO(content.decode()))
    except Exception as e:
        return {'error':'invalid csv', 'detail':str(e)}
    # Expect column 'symbol'
    symbols = df['symbol'].dropna().unique().tolist() if 'symbol' in df.columns else []
    return {'message':'csv received', 'symbols': symbols}
