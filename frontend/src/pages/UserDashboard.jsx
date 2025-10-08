import React, {useState} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const sample = [
  {date:'2024-09',price:0.9},
  {date:'2024-11',price:1.0},
  {date:'2025-01',price:1.2},
  {date:'2025-03',price:1.1},
  {date:'2025-05',price:1.4},
  {date:'2025-07',price:1.6},
];

function UserDashboard(){
  const [industry,setIndustry] = useState('Wholesale Distributors')
  const [symbol,setSymbol] = useState('REZI')
  return <div className="container" style={{display:'flex'}}>
    <div className="sidebar">
      <h3>Navigation & Filters</h3>
      <div style={{marginTop:12}}>
        <label>Industry</label>
        <select className="input" value={industry} onChange={e=>setIndustry(e.target.value)}>
          <option>Wholesale Distributors</option>
          <option>Biotechnology</option>
          <option>Homebuilding</option>
        </select>
      </div>
      <div style={{marginTop:12}}>
        <label>Symbols</label>
        <select className="input" value={symbol} onChange={e=>setSymbol(e.target.value)}>
          <option>REZI</option>
          <option>AAPL</option>
          <option>TSLA</option>
        </select>
      </div>
      <div style={{marginTop:12}}>
        <button className="btn">View Stocks</button>
      </div>
    </div>
    <div className="content">
      <div className="header"><h2>{industry} — Overview</h2><div>Plan: Free</div></div>
      <div className="grid">
        <div style={{background:'#fff',padding:12,borderRadius:8,boxShadow:'0 2px 10px rgba(2,6,23,0.04)'}}>
          <h4>{symbol} — Price</h4>
          <div style={{height:220}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sample}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{background:'#fff',padding:12,borderRadius:8,boxShadow:'0 2px 10px rgba(2,6,23,0.04)'}}>
          <h4>Key Metrics</h4>
          <table style={{width:'100%'}}>
            <tbody>
              <tr><td>Market Cap</td><td>$4.8B</td></tr>
              <tr><td>Weekly Growth</td><td>+32%</td></tr>
              <tr><td>Status</td><td>Bullish</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 style={{marginTop:20}}>Top Bullish Stocks</h3>
      <table style={{width:'100%',background:'#fff',borderRadius:8,padding:12}}>
        <thead><tr><th>Symbol</th><th>Industry</th><th>Market Cap</th></tr></thead>
        <tbody>
          <tr><td>REZI</td><td>Wholesale</td><td>$27.3B</td></tr>
          <tr><td>AAPL</td><td>Technology</td><td>$2.5T</td></tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default UserDashboard
