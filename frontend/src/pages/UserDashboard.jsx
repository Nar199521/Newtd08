
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const industries = [
  'Wholesale Distributors', 'Tobacco', 'General Bldg Contractors', 'Biotechnology', 'Homebuilding', 'Professional and commercial equipment'
]
// Map each industry to its own stock symbols
const industrySymbols = {
  'Wholesale Distributors': ['REZI', 'ADM'],
  'Tobacco': ['MO', 'BTI'],
  'General Bldg Contractors': ['J', 'ACM'],
  'Biotechnology': ['AMGN', 'GILD'],
  'Homebuilding': ['LEN', 'DHI'],
  'Professional and commercial equipment': ['AAPL', 'DELL']
}
const bullishIndustries = [
  'Wholesale Distributors', 'Tobacco'
]
const defaultSymbol = 'AAPL';
const industrySummary = [
  { industry: 'Wholesale Distributors', price: '+32.0%', marketCap: '$4.8B', bullish: '1/2', stocks: 2 },
  { industry: 'Tobacco', price: '+16.7%', marketCap: '$1.1B', bullish: '1/1', stocks: 1 },
  { industry: 'General Bldg Contractors', price: '+14.8%', marketCap: '$2.0B', bullish: '1/1', stocks: 1 },
]
const topBullish = [
  { symbol: 'ADM', industry: 'Packaged Foods', marketCap: '$27.3B', growth: '+14.2%' },
  { symbol: 'AAPL', industry: 'Technology', marketCap: '$2.5T', growth: '+12.0%' },
]

function UserDashboard() {
  const [industryType, setIndustryType] = useState('All')
  const [industry, setIndustry] = useState('Wholesale Distributors')
  const [symbol, setSymbol] = useState(industrySymbols['Wholesale Distributors'][0])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showIndustry, setShowIndustry] = useState(false)
  const [symbolFilter, setSymbolFilter] = useState('')
  // Fix: Add missing state for bulk stocks
  const [bulkData, setBulkData] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState('');

  // Fix: Add missing fetchBulkStocks function
  const fetchBulkStocks = async () => {
    setBulkLoading(true);
    setBulkError('');
    setBulkData(null);
    // Example: combine all industry symbols (in real use, get from user input or backend)
    const allSymbols = Object.values(industrySymbols).flat();
    try {
      const res = await axios.post('/stocks/quotes', { symbols: allSymbols });
      setBulkData(res.data);
    } catch (e) {
      setBulkError('Failed to fetch bulk stock data');
    }
    setBulkLoading(false);
  };

  // Filter industries based on type
  const filteredIndustries = industryType === 'Bullish' ? bullishIndustries : industries

  useEffect(() => {
    if (showIndustry) fetchStock(symbol)
    // eslint-disable-next-line
  }, [symbol, showIndustry])

  // When industry changes, update symbol to first available for that industry
  useEffect(() => {
    if (!filteredIndustries.includes(industry)) {
      setIndustry(filteredIndustries[0])
    }
  }, [industryType])

  // When industry changes, update symbol to first symbol for that industry
  useEffect(() => {
    setSymbol(industrySymbols[industry][0])
  }, [industry])

  const fetchStock = async (sym) => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('/stocks/quote', { symbol: sym })
      setChartData(res.data.series)
    } catch (e) {
      setError('Failed to fetch stock data')
      setChartData([])
    }
    setLoading(false)
  }

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value)
  }

  const handleIndustryTypeChange = (e) => {
    setIndustryType(e.target.value)
    setShowIndustry(false)
  }

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value)
    setShowIndustry(false)
  }

  const handleViewStocks = () => {
    setShowIndustry(true)
  }

  // Mock historical data for the selected stock
  const historicalTable = [
    {
      symbol,
      industry,
      market_cap: '2.5T',
      market_cap_formatted: '$2.5T',
      latest_volume: 1110000,
      mrs_current: 15.7,
      weekly_growth: '+2.1%',
      total_stocks: industrySymbols[industry].length,
      total_market_cap_formatted: '$3.1T',
      price_vs_sma_pct: '+5.2%',
      watchlist_type: 'Bullish',
    },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
      <aside style={{ width: 260, background: '#fff', borderRight: '1px solid #eee', padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#2563eb' }}>StockPulse</div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Select Symbol: </label>
          <input
            className="input"
            style={{ width: 180, display: 'inline-block', marginLeft: 8, marginBottom: 8 }}
            placeholder="Filter symbols..."
            value={symbolFilter}
            onChange={e => setSymbolFilter(e.target.value)}
          />
          <select className="input" style={{ width: 180, display: 'inline-block', marginLeft: 8 }} value={symbol} onChange={handleSymbolChange}>
            {industrySymbols[industry]
              .filter(sym => sym.toLowerCase().includes(symbolFilter.toLowerCase()))
              .map(sym => (
                <option key={sym} value={sym}>{sym}</option>
              ))}
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500 }}>Select Industry</label>
          <select className="input" style={{ marginTop: 8 }} value={industry} onChange={handleIndustryChange}>
            {filteredIndustries.map(i => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div style={{ marginTop: 32 }}>
          <button className="btn" style={{ width: '100%' }} onClick={handleViewStocks}>View Stocks</button>
        </div>
        <div style={{ marginTop: 32 }}>
          <button className="btn" style={{ width: '100%' }} onClick={handleViewStocks}>View Stocks</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn" style={{ width: '100%', background: '#16a34a', color: '#fff' }} onClick={fetchBulkStocks} disabled={bulkLoading}>
            {bulkLoading ? 'Loading 2000 Stocks...' : 'Fetch 2000 Stocks'}
          </button>
          {bulkError && <div style={{ color: 'red', marginTop: 8 }}>{bulkError}</div>}
        </div>
      </aside>
      <main style={{ flex: 1, padding: 32, background: '#f7fafc' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <input className="input" style={{ flex: 1, maxWidth: 400 }} placeholder="Search industry..." />
        </div>
        {bulkData && (
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Bulk Stock Data (Sample)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f3f6fa' }}>
                  <th style={{ padding: 8 }}>Symbol</th>
                  <th style={{ padding: 8 }}>Short Name</th>
                  <th style={{ padding: 8 }}>Sector</th>
                  <th style={{ padding: 8 }}>Market Cap</th>
                  <th style={{ padding: 8 }}>Last Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(bulkData).slice(0, 20).map(([sym, info]) => (
                  <tr key={sym} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{sym}</td>
                    <td style={{ padding: 8 }}>{info.shortName || '-'}</td>
                    <td style={{ padding: 8 }}>{info.sector || '-'}</td>
                    <td style={{ padding: 8 }}>{info.marketCap ? `$${info.marketCap}` : '-'}</td>
                    <td style={{ padding: 8 }}>{info.prices && info.prices.length ? `$${info.prices[info.prices.length-1].close}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>Showing 20 of {Object.keys(bulkData).length} stocks</div>
          </div>
        )}
        {showIndustry && <>
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Industry Analysis: {industry}</div>
            <div style={{ marginBottom: 16, color: '#2563eb', fontWeight: 500 }}>
              Why Bullish? <span style={{ color: '#222', fontWeight: 400 }}>
                {industry === 'Wholesale Distributors' && 'Strong price momentum, high volume, and positive MRS for most stocks.'}
                {industry === 'Tobacco' && 'Consistent growth, outperforming benchmark, and bullish technicals.'}
                {industry === 'General Bldg Contractors' && 'Rising demand, strong volume, and positive price action.'}
                {industry === 'Biotechnology' && 'Breakout above resistance, high MRS, and strong volume.'}
                {industry === 'Homebuilding' && 'Bullish trend, high volume, and strong price vs SMA.'}
                {industry === 'Professional and commercial equipment' && 'Steady growth, positive MRS, and above-benchmark performance.'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Industry Benchmark vs Stock Price</div>
                <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} name="Stock Price" />
                      <Line type="monotone" dataKey="benchmark" stroke="#eab308" strokeWidth={2} dot={false} name="Industry Benchmark" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Volume Chart</div>
                <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={false} name="Volume" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>Bullish Status</div>
                <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 18 }}>Bullish</div>
              </div>
            </div>

            {/* Stock MRS Table */}
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Stock MRS Table</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f3f6fa' }}>
                    <th style={{ padding: 8 }}>Symbol</th>
                    <th style={{ padding: 8 }}>MRS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{symbol}</td>
                    <td style={{ padding: 8 }}>{Math.round(Math.random()*20+10)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Current Price Table */}
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Current Price Table</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f3f6fa' }}>
                    <th style={{ padding: 8 }}>Symbol</th>
                    <th style={{ padding: 8 }}>Current Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{symbol}</td>
                    <td style={{ padding: 8 }}>{chartData.length ? `$${chartData[chartData.length-1].price.toFixed(2)}` : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{marginTop:16}}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>Historical Data Table</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#f3f6fa' }}>
                    <th style={{ padding: 8 }}>symbol</th>
                    <th style={{ padding: 8 }}>industry</th>
                    <th style={{ padding: 8 }}>market_cap</th>
                    <th style={{ padding: 8 }}>market_cap_formatted</th>
                    <th style={{ padding: 8 }}>latest_volume</th>
                    <th style={{ padding: 8 }}>mrs_current</th>
                    <th style={{ padding: 8 }}>weekly_growth</th>
                    <th style={{ padding: 8 }}>total_stocks</th>
                    <th style={{ padding: 8 }}>total_market_cap_formatted</th>
                    <th style={{ padding: 8 }}>price_vs_sma_pct</th>
                    <th style={{ padding: 8 }}>watchlist_type</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalTable.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: 8 }}>{row.symbol}</td>
                      <td style={{ padding: 8 }}>{row.industry}</td>
                      <td style={{ padding: 8 }}>{row.market_cap}</td>
                      <td style={{ padding: 8 }}>{row.market_cap_formatted}</td>
                      <td style={{ padding: 8 }}>{row.latest_volume}</td>
                      <td style={{ padding: 8 }}>{row.mrs_current}</td>
                      <td style={{ padding: 8 }}>{row.weekly_growth}</td>
                      <td style={{ padding: 8 }}>{row.total_stocks}</td>
                      <td style={{ padding: 8 }}>{row.total_market_cap_formatted}</td>
                      <td style={{ padding: 8 }}>{row.price_vs_sma_pct}</td>
                      <td style={{ padding: 8 }}>{row.watchlist_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 20, marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>All Industries Summary (Page 1 of 15)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f3f6fa' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Industry</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Price vs time_pct</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Total Market Cap</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Bullish Stocks</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Total Stocks</th>
                </tr>
              </thead>
              <tbody>
                {industrySummary.filter(row => row.industry === industry).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{row.industry}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.price}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.marketCap}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.bullish}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.stocks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>Showing selected industry summary</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 20, marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Top Bullish Stocks</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f3f6fa' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Symbol</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Industry</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Market Cap</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Weekly Growth</th>
                </tr>
              </thead>
              <tbody>
                {topBullish.filter(row => row.industry === industry || industryType === 'All').map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>{row.symbol}</td>
                    <td style={{ padding: 8 }}>{row.industry}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.marketCap}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{row.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}
      </main>
    </div>
  )
}

export default UserDashboard
