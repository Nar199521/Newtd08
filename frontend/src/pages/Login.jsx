import React from 'react'
import { useNavigate } from 'react-router-dom'
function Login(){
  const nav = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    const role = e.target.role.value
    // NOTE: This scaffold uses a simple role switch for demo. Replace with real auth.
    if(role === 'admin') nav('/admin')
    else nav('/user')
  }
  return <div className="container">
    <div className="header"><h2>StockPulse — Login</h2><div></div></div>
    <form onSubmit={submit}>
      <div style={{marginBottom:12}}><input name="email" placeholder="Email" className="input" required/></div>
      <div style={{marginBottom:12}}><input name="password" placeholder="Password" className="input" type="password" required/></div>
      <div style={{marginBottom:12}}>
        <select name="role" className="input">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className="btn">Login</button>
    </form>
    <p style={{marginTop:12}}>Don't have an account? <a href="/signup">Sign up</a></p>
  </div>
}
export default Login
