import React,{useEffect,useState} from 'react';
import Layout from '../components/Layout';
import {connect} from 'react-redux';
import axios from 'axios'
import UserOrderComp from './UserOrderComp';
import '../styles/orders.css'

const UserOrders = (props) => {
  
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
