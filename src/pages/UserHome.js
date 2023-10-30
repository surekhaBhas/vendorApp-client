import { useState, useEffect } from 'react';
import '../styles/purchaseOrder.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function UserHome(props) {
  const [vendors, setVendors] = useState([]);
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  
  const navigate=useNavigate()
 
  useEffect(() => {
    const getVendors = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/auth/vendors`, {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        });
        setVendors(res.data);
        
      } catch (err) {
        console.log(err);
      }
    }
    getVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchaseData = new FormData();
  
    purchaseData.append('product_name', product);
    purchaseData.append('quantity', quantity);
    purchaseData.append('date', date);
    purchaseData.append('vendor', vendor);
    purchaseData.append('file', file); 
  
    try {
      const result = await axios.post(
        'http://localhost:5500/purchase/order',
        purchaseData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast.success("Successfully order Submitted")
      alert("Form submitted successfully")
      navigate('/user/orders')
    } catch (err) {
      console.error(err);
    }
  }
  

  return (
    <Layout>
    <div className='purchase-order-container'>
      <h1>Purchase Order Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='product_name' className='form-label'>Product Name</label>
          <input
            type='text'
            className='form-control'
            id='product_name'
            value={product}
            required
            onChange={(e) => { setProduct(e.target.value) }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='quantity' className='form-label'>Quantity</label>
          <input
            type='number'
            className='form-control'
            id='quantity'
            value={quantity}
            required
            onChange={(e) => { setQuantity(e.target.value) }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>Date</label>
          <input
            type='date'
            className='form-control'
            id='date'
            value={date}
            required
            onChange={(e) => { setDate(e.target.value) }}
          />
        </div>
        <p className='form-label'>Select Vendor</p>
        <select
          className='form-select form-select-lg mb-3'
          aria-label='Large select example'
          onChange={(e) => setVendor(e.target.value)}
        >
          <option>Select Vendor</option>
          {vendors.length ? vendors.map(vendor => (
            <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
          )) : null}
        </select>
        <br />
        <input
          type='file'
          className='form-control'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type='submit' className='btn btn-primary mt-3'>Submit</button>
      </form>
    </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(UserHome);
