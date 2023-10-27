import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authContext } from '../components/context/authContext'

const Login = () => {
   // jbna l user mn context
   const {currentUser}=useContext(authContext)
   const {login}=useContext(authContext)

  const [formData, setFormData] = useState({
    username: '',
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
    await login(formData)
    navigate('/home')
  } catch (error) {
           setErr(error.response.data)
           console.error('error : ',error);
    } 
  }
  return (
    <div className='auth'>
    {console.log(currentUser)}
       <h1>Login</h1>
       <form>
        <input type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
         {err && <p>{err}</p>}
        <span> Don't you have an account? <Link to='/register'>register</Link></span>
       </form>
    </div>
  )
}

export default Login