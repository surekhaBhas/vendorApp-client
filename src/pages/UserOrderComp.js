import React ,{useState}from 'react';
import axios from 'axios'

const UserOrderComp = ({order}) => {
 
    const selectShipping = async (e) => {
        const array = [1, 2, 3];
        for (const value of array) {
          const response = value == e.target.value ? 'yes' : 'no';
          
          try {
            const res = await axios.put(`http://localhost:5500/purchase/response/${order._id}/${value}`, { response });
            console.log(res);
          } catch (error) {
            console.error(error);
          }
        }
      };
  return (
    <div className='order-card mt-5 p-3'>
    
       <p><span className='sub'>Product Name:</span> {order.product_name}</p>
       <p><span className='sub'>Quantity:</span> {order.quantity}</p>
       <p><span className='sub'>Date:</span> {order.date}</p>
       {
        order.message?<div>
            <p className='text-center text-danger'>{order.message}</p> 
            <select className='form-select' onChange={selectShipping}>
                <option>Select Schedule</option>
                <option value='1'>{order.schedule1.shipping}</option>
                <option value='2'>{order.schedule2.shipping}</option>
                <option value='3'>{order.schedule3.shipping}</option>
            </select>
        </div>:<p className='text-center text-warning'>vendor not viewed your order yet once vendor view you can select shipping schedule</p> 
       }
    </div>
  );
}

export default UserOrderComp;
