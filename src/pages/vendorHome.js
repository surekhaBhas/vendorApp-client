import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import '../styles/orders.css'
import Header2 from '../components/Header2';
import OrderComp from './OrderComp';
const VendorHome = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/purchase/vendor/${props.user._id}`);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrderDetails();
  }, [props.user._id]);


  
  

  return (
   <>
   <Header2/>
   <div className='container order-container'>
    <h1 className='text-center'>Purchase Order List</h1>
      {orders.length ? orders.map(order=><OrderComp order={order} key={order._id}/>) : (
        <p>No orders available.</p>
      )}
    </div></>
    
   
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(VendorHome);
