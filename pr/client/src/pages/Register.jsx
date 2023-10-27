import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const[err,setErr]=useState(null)
   const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/auth/register', formData);
    navigate('/login')
  } catch (error) {
           setErr(error.response.data)
           console.error('error : ',error);
    } 
  }


  return (
    <div className='auth'>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <button type="submit">Register</button>
     {err&& <p>{err}</p>}
     <span>  you have an account? <Link to='/login'>login</Link></span>
    </form>
 </div>
  )
}

export default Register