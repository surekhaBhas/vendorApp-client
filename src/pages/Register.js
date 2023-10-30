import {useState} from 'react'

import {toast} from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Authstyles.css'
const Register = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')

  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(`http://localhost:5500/auth/register`,
      {name,email,password,phone,address})
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }else{
        toast.error(res.data.message)
      }
     
    }
    catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
    
  }
  
  return (
    <div className='register form-container' style={{minHeight:"90vh"}}>
      <h4 className='title'>Register Form</h4>
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" 
    className="form-control"
     id="exampleInputName" 
     onChange={(e)=>{setName(e.target.value)}}
     placeholder='Enter your name'
    value={name}
    required
    autoComplete="off"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input
     type="email"
      className="form-control" 
      id="exampleInputEmail1" 
      onChange={(e)=>{setEmail(e.target.value)}}
     placeholder='Enter your Email'
      required
      value={email}
      aria-describedby="emailHelp" 
      autoComplete="off"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input 
    onChange={(e)=>{setPassword(e.target.value)}}
    placeholder='Enter your password'
    type="password" 
    className="form-control" 
    id="exampleInputPassword1" 
    value={password}
    required
    autoComplete="off"/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
    <input
     type="text" 
     onChange={(e)=>{setPhone(e.target.value)}}
     placeholder='Enter your Phone number'
     className="form-control"
      id="exampleInputPhone" 
      value={phone}
      required
      autoComplete="off"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input 
    type="text"
     className="form-control"
     onChange={(e)=>{setAddress(e.target.value)}}
     placeholder='Enter your Address'
      id="exampleInputAddress"
      required 
      value={address} 
       autoComplete="off"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<p > Already have an account? <span onClick={()=> navigate('/login')} style={{color:"red",fontWeight:"bold"}}> Login</span> </p>
    </div>
 
  )
}

export default Register
