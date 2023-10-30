import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios'
const VendorAuth = (props) => {
  const [ok, setOk] = useState(false);
    useEffect(() => {
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
        const authCheck = async () => {
     
          const res = await axios.get(`http://localhost:5500/auth/vendor-auth`);
         
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        };
        if (props.token) authCheck();
      }, [props.token]);
  
    return ok ? <Outlet /> : <Spinner path="" />
  ;
}
const mapStateToProps=state=>{
    return{
        user: state.auth.user, 
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(VendorAuth);
