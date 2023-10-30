import React,{useEffect,useState} from 'react';
import Layout from '../components/Layout';
import {connect} from 'react-redux';
import axios from 'axios'
import UserOrderComp from './UserOrderComp';
import '../styles/orders.css'
import { useNavigate } from 'react-router-dom';

const UserOrders = (props) => {
  const navigate=useNavigate()
  const [data,setData]=useState([])

  useEffect(()=>{
    const getOrders=async()=>{
        try{
         const res=await axios.get(`http://localhost:5500/purchase/user/${props.user._id}`)
         setData(res.data)
        }catch(err){
         console.log(err)
        }
    }
    getOrders()
  },[])
  return (
    <Layout>
    <div className='order-container container'>
     
        {data.length?data.map(order=><UserOrderComp key={order._id} order={order}/>):<p>No orders</p>}
       
    </div>
    <button className='btn btn-info text-center m-5' style={{float:"right"}} onClick={()=>navigate('/user/home')}>Back</button>
    </Layout>
  );
  }

const mapStateToProps=state=>{
    return{
        user: state.auth.user, 
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(UserOrders)
