import React from 'react'
import { useNavigate } from 'react-router-dom'
function Signup(){
  const nav = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    // create account - mocked
    alert('Account created (mock). Logging in as user.')
    nav('/user')
  }
  return <div className="container">
    <div className="header"><h2>Create account</h2></div>
    <form onSubmit={submit}>
      <div style={{marginBottom:12}}><input name="name" placeholder="Full name" className="input" required/></div>
      <div style={{marginBottom:12}}><input name="email" placeholder="Email" className="input" required/></div>
      <div style={{marginBottom:12}}><input name="password" placeholder="Password" className="input" type="password" required/></div>
      <button className="btn">Sign up</button>
    </form>
  </div>
}
export default Signup
