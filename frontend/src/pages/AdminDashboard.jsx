import React, {useState} from 'react'

function AdminDashboard(){
  const [csv, setCsv] = useState(null)
  const upload = (e)=>{
    e.preventDefault()
    alert('CSV upload endpoint is available on backend: /upload-csv (mock)')
  }
  return <div className="container">
    <div className="header"><h2>Admin Dashboard</h2><div>Role: Admin</div></div>
    <div style={{display:'flex',gap:20}}>
      <div style={{flex:1,background:'#fff',padding:12,borderRadius:8}}>
        <h3>User Management</h3>
        <p>CRUD operations available on backend: /users</p>
      </div>
      <div style={{flex:1,background:'#fff',padding:12,borderRadius:8}}>
        <h3>Subscription Management</h3>
        <p>Manage Free / Medium / Pro / Cancel</p>
      </div>
    </div>

    <div style={{marginTop:20,background:'#fff',padding:12,borderRadius:8}}>
      <h3>CSV Upload (Upload tickers)</h3>
      <form onSubmit={upload}>
        <input type="file" accept=".csv" onChange={e=>setCsv(e.target.files && e.target.files[0])}/>
        <div style={{marginTop:12}}>
          <button className="btn">Upload CSV</button>
        </div>
      </form>
      <p style={{marginTop:8}}>After upload, backend will fetch stock info (yfinance) and populate dashboards.</p>
    </div>
  </div>
}

export default AdminDashboard
