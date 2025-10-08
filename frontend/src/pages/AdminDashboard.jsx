import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Users, stats, and screenings will be loaded from backend

const statCards = [
  { label: 'Total Users', value: '+12%', icon: '👥', color: '#2563eb' },
  { label: 'Pro Users', value: '+8%', icon: '⭐', color: '#16a34a' },
  { label: 'Medium Users', value: '+5%', icon: '💎', color: '#06b6d4' },
  { label: 'Screenings', value: '+3%', icon: '📄', color: '#eab308' },
];

const tabList = [
  { label: 'Overview' },
  { label: 'User Management' },
  { label: 'Subscription Requests' },
  { label: 'Stock Screening' },
];

function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [csv, setCsv] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [stats, setStats] = useState({ total: 0, pro: 0, medium: 0, screenings: 0 });
  const [screenings, setScreenings] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingScreenings, setLoadingScreenings] = useState(false);
  const [screeningDetail, setScreeningDetail] = useState(null);
  const nav = useNavigate();

  // Fetch users from backend (mocked for now)
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      // Replace with real endpoint: /admin/users
      // const res = await axios.get('/admin/users');
      // setUsers(res.data);
      setUsers([
        { name: 'Admin User', email: 'admin@tradinggrow.com', subscription: 'Pro', admin: 'Admin', joined: '1/1/2024' },
        { name: 'Demo User', email: 'demo@tradinggrow.com', subscription: 'Pro', admin: 'User', joined: '1/15/2024' },
        { name: 'John Smith', email: 'user1@example.com', subscription: 'Medium', admin: 'User', joined: '2/1/2024' },
        { name: 'Jane Doe', email: 'user2@example.com', subscription: 'Free', admin: 'User', joined: '2/15/2024' },
        { name: 'Bob Wilson', email: 'user3@example.com', subscription: 'Free', admin: 'User', joined: '3/1/2024' },
      ]);
    } catch (e) {
      setUsers([]);
    }
    setLoadingUsers(false);
  };

  // Fetch stats from backend (mocked for now)
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      // Replace with real endpoint: /admin/stats
      // const res = await axios.get('/admin/stats');
      // setStats(res.data);
      setStats({ total: 1200, pro: 300, medium: 200, screenings: 50 });
    } catch (e) {
      setStats({ total: 0, pro: 0, medium: 0, screenings: 0 });
    }
    setLoadingStats(false);
  };

  // Fetch screenings from backend (mocked for now)
  const fetchScreenings = async () => {
    setLoadingScreenings(true);
    try {
      const res = await axios.get('/admin/screenings');
      setScreenings(res.data);
    } catch (e) {
      setScreenings([]);
    }
    setLoadingScreenings(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
    fetchScreenings();
  }, []);

  const handleRefresh = () => {
    fetchUsers();
    fetchStats();
    fetchScreenings();
  };

  const handleLogout = () => {
    // Clear session (mock)
    nav('/');
  };

  const handleUpdateAllStocks = async () => {
    // Call backend to update all stocks (mock)
    alert('Triggered backend update for all stocks (mock).');
  };

  const handleViewAllScreenings = () => {
    // Show all screenings (mock)
    alert('Show all stock screenings (mock).');
  };

  const handleUserAction = (user) => {
    // Show user actions (edit, delete, etc.)
    alert(`Actions for ${user.name} (mock)`);
  };

  const upload = (e) => {
    e.preventDefault();
    alert('CSV upload endpoint is available on backend: /upload-csv (mock)');
  };

  return (
    <div style={{ background: '#f7fafc', minHeight: '100vh', padding: 0 }}>
      <div className="container" style={{ maxWidth: 1400, marginTop: 30 }}>
        <div className="header" style={{ marginBottom: 0 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Admin Dashboard</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" style={{ background: '#fff', color: '#2563eb', border: '1px solid #2563eb' }} onClick={handleRefresh} disabled={loadingUsers || loadingStats || loadingScreenings}>
              {loadingUsers || loadingStats || loadingScreenings ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <button className="btn" style={{ background: '#fff', color: '#ef4444', border: '1px solid #ef4444' }} onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div style={{ color: '#888', marginBottom: 18, fontSize: 18 }}>Welcome back, Admin</div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 24 }}>
          {tabList.map((t, i) => (
            <button
              key={t.label}
              className="btn"
              style={{
                borderRadius: '8px 8px 0 0',
                background: tab === i ? '#fff' : 'transparent',
                color: tab === i ? '#2563eb' : '#222',
                border: 'none',
                borderBottom: tab === i ? '2px solid #2563eb' : '2px solid transparent',
                fontWeight: tab === i ? 600 : 400,
                fontSize: 16,
                marginRight: 8,
                padding: '10px 24px',
                boxShadow: tab === i ? '0 -2px 8px rgba(0,0,0,0.03)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => setTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 0 && (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: 32, background: '#2563eb', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>Total Users</div>
                  <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 4 }}>{stats.total}</div>
                </div>
              </div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: 32, background: '#16a34a', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⭐</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>Pro Users</div>
                  <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 4 }}>{stats.pro}</div>
                </div>
              </div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: 32, background: '#06b6d4', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💎</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>Medium Users</div>
                  <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 4 }}>{stats.medium}</div>
                </div>
              </div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: 32, background: '#eab308', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>Screenings</div>
                  <div style={{ color: '#22c55e', fontWeight: 500, fontSize: 16, marginTop: 4 }}>{stats.screenings}</div>
                </div>
              </div>
            </div>
            {/* Charts */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 2, background: '#fff', borderRadius: 8, padding: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>User Growth</div>
                <div style={{ height: 200, border: '1px dashed #e5e7eb', borderRadius: 8 }}></div>
              </div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Subscription Distribution</div>
                <div style={{ height: 200, border: '1px dashed #e5e7eb', borderRadius: 8 }}></div>
              </div>
            </div>
            {/* Recent Stock Screenings Table */}
            <div style={{ background: '#fff', borderRadius: 8, padding: 20, marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Recent Stock Screenings
                <button className="btn" style={{ background: '#2563eb', color: '#fff', fontSize: 14, padding: '4px 16px' }} onClick={handleViewAllScreenings}>View All</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, marginBottom: 16 }}>
                <thead>
                  <tr style={{ background: '#f3f6fa' }}>
                    <th style={{ padding: 8, textAlign: 'left' }}>Name</th>
                    <th style={{ padding: 8, textAlign: 'left' }}>Industry</th>
                    <th style={{ padding: 8, textAlign: 'left' }}>Results Found</th>
                    <th style={{ padding: 8, textAlign: 'left' }}>Created</th>
                    <th style={{ padding: 8, textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {screenings.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: 16 }}>No screenings found.</td></tr>
                  )}
                  {screenings.map((s, i) => (
                    <React.Fragment key={i}>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 8, fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: 8 }}>{s.industry}</td>
                        <td style={{ padding: 8 }}>{s.results}</td>
                        <td style={{ padding: 8 }}>{s.created}</td>
                        <td style={{ padding: 8 }}><button className="btn" style={{ fontSize: 14 }} onClick={()=>setScreeningDetail(i)}>View</button></td>
                      </tr>
                      {screeningDetail === i && (
                        <tr>
                          <td colSpan={5} style={{ background: '#f8fafc', padding: 16 }}>
                            {/* Industry and Symbol Selectors */}
                            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                              <div>
                                <label style={{ fontWeight: 600, marginRight: 8 }}>Select Industry:</label>
                                <select
                                  value={s.selectedIndustry || s.industry}
                                  onChange={e => {
                                    const updated = [...screenings];
                                    updated[i] = { ...s, selectedIndustry: e.target.value, selectedSymbol: '' };
                                    setScreenings(updated);
                                  }}
                                  style={{ padding: 6, borderRadius: 6, border: '1px solid #ddd', minWidth: 120 }}
                                >
                                  <option value={s.industry}>{s.industry}</option>
                                  {/* Add more industries if needed */}
                                </select>
                              </div>
                              <div>
                                <label style={{ fontWeight: 600, marginRight: 8 }}>Select Symbol:</label>
                                <select
                                  value={s.selectedSymbol || (s.table && s.table[0]?.symbol) || ''}
                                  onChange={e => {
                                    const updated = [...screenings];
                                    updated[i] = { ...s, selectedSymbol: e.target.value };
                                    setScreenings(updated);
                                  }}
                                  style={{ padding: 6, borderRadius: 6, border: '1px solid #ddd', minWidth: 120 }}
                                >
                                  {s.table && s.table.map((row, j) => (
                                    <option key={j} value={row.symbol}>{row.symbol}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {/* Chart, Table, Bullish Info for selected symbol */}
                            <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
                              {/* Chart */}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, marginBottom: 8 }}>Symbol Chart</div>
                                <div style={{ height: 160 }}>
                                  {/* Replace with real chart for selected symbol if available */}
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={s.chart}>
                                      <XAxis dataKey="date" fontSize={10} />
                                      <YAxis fontSize={10} />
                                      <Tooltip />
                                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} name="Results" />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                              {/* Table */}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, marginBottom: 8 }}>Symbol Table</div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                  <thead>
                                    <tr style={{ background: '#f3f6fa' }}>
                                      <th style={{ padding: 8 }}>Symbol</th>
                                      <th style={{ padding: 8 }}>Price</th>
                                      <th style={{ padding: 8 }}>MRS</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {s.table && s.table.filter(row => row.symbol === (s.selectedSymbol || (s.table[0]?.symbol))).map((row, j) => (
                                      <tr key={j} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: 8 }}>{row.symbol}</td>
                                        <td style={{ padding: 8 }}>{row.price}</td>
                                        <td style={{ padding: 8 }}>{row.mrs}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            {/* Bullish Info */}
                            <div style={{ marginBottom: 24 }}>
                              <div style={{ fontWeight: 600, marginBottom: 8 }}>Bullish Info</div>
                              <div style={{ background: '#e0f2fe', color: '#0369a1', padding: 12, borderRadius: 6, fontWeight: 500 }}>
                                {/* Replace with real bullish/bearish info if available */}
                                {s.bullish || 'Bullish trend detected for this symbol.'}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 1 && (
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 18 }}>User Management</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              <input className="input" style={{ flex: 1, maxWidth: 400 }} placeholder="Search by email or name..." />
              <select className="input" style={{ width: 200 }}>
                <option>All Subscriptions</option>
                <option>Pro</option>
                <option>Medium</option>
                <option>Free</option>
              </select>
              <button className="btn" style={{ background: '#2563eb', color: '#fff' }} onClick={fetchUsers} disabled={loadingUsers}>{loadingUsers ? 'Refreshing...' : 'Refresh'}</button>
              <button className="btn" style={{ background: '#16a34a', color: '#fff' }} onClick={handleUpdateAllStocks}>Update All Stocks</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr style={{ background: '#f3f6fa' }}>
                  <th style={{ padding: 8, textAlign: 'left' }}>User</th>
                  <th style={{ padding: 8, textAlign: 'left' }}>Subscription</th>
                  <th style={{ padding: 8, textAlign: 'left' }}>Admin</th>
                  <th style={{ padding: 8, textAlign: 'left' }}>Joined</th>
                  <th style={{ padding: 8, textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: 16 }}>No users found.</td></tr>
                )}
                {users.map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8 }}>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ color: '#888', fontSize: 13 }}>{u.email}</div>
                    </td>
                    <td style={{ padding: 8 }}>
                      <span style={{ background: u.subscription === 'Pro' ? '#16a34a' : u.subscription === 'Medium' ? '#06b6d4' : '#e5e7eb', color: u.subscription === 'Free' ? '#222' : '#fff', borderRadius: 6, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{u.subscription}</span>
                    </td>
                    <td style={{ padding: 8 }}>
                      <span style={{ background: u.admin === 'Admin' ? '#ef4444' : '#e5e7eb', color: u.admin === 'Admin' ? '#fff' : '#222', borderRadius: 6, padding: '2px 10px', fontWeight: 600, fontSize: 14 }}>{u.admin}</span>
                    </td>
                    <td style={{ padding: 8 }}>{u.joined}</td>
                    <td style={{ padding: 8 }}>
                      <button className="btn" style={{ background: '#2563eb', color: '#fff', fontSize: 14 }} onClick={() => handleUserAction(u)}>Actions ▾</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other tabs can be filled similarly as needed */}
      </div>
    </div>
  );
}

export default AdminDashboard;
