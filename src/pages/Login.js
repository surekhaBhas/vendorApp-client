import {useState} from 'react'
import { connect } from 'react-redux';
import {toast} from 'react-toastify';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import '../styles/Authstyles.css'
import { getAuth } from '../Redux';


const Login = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
 
    const navigate=useNavigate();
    const location=useLocation()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
         
            const res=await axios.post(`http://localhost:5500/auth/login`,
            {email,password})
            if(res.data.success){
              toast.success(res.data.message)
             
           props.getAuth(res.data)
              res.data.user.role===1? navigate('/vendor/home'): navigate('/user/home')
             
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
  
    <div className='register form-container' style={{minHeight:"100vh"}}>
      <h4 className='title'>Login Form</h4>
      <form onSubmit={handleSubmit}>
  
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
  <button type="submit" className="btn btn-info text-white">LOGIN</button>
</form>
<p style={{marginTop:"10px"}}>Don't you have an account? <span style={{color:"red",fontWeight:"bold"}} onClick={()=>navigate('/register')}>Sign Up</span></p>
    </div>

  )
}

const mapDispatchToProps=dispatch=>{
  return{
      getAuth:(data)=>dispatch(getAuth(data))
  }
}

export default connect(null, mapDispatchToProps)(Login);
