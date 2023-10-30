import React,{useState,useEffect} from 'react';
import axios from 'axios'
const OrderComp = ({order}) => {
    const [shipping1,setShipping1]=useState(order.schedule1.shipping)
  const [shipping2,setShipping2]=useState(order.schedule2.shipping)
  const [shipping3,setShipping3]=useState(order.schedule3.shipping)
  const [show,setShow]=useState(false)
 
  const [pdfUrl, setPdfUrl] = useState(null);
  const [data,setData]=useState(order)
  console.log(order)
   useEffect(()=>{
    const getData=async()=>{
        try{
            const res=await axios.get(`http://localhost:5500/purchase/order/${data._id}`)
            setData(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getData()
   },[shipping1,shipping2,shipping3])

    const openPdfInNewTab = async(pdf) => {
        setPdfUrl(`http://localhost:5500/uploads/${encodeURIComponent(pdf)}`);
        if (pdfUrl) {
          window.open(pdfUrl, '_blank');
        } 
        const res = await axios.put(`http://localhost:5500/purchase/message/${order._id}`, { message: 'Vendor is viewed your order' });

      };
    
    const setShippingDetails = async (orderId, num,e) => {
        const response = await axios.put(
          `http://localhost:5500/purchase/shipping/${orderId}/${num}`,
          { shipping: e }
        );
       
      };
  return (
    <div>
       <div key={data._id} className='order-card'>
            <p><span className='sub'>User Id:</span> {data.user}</p>
            <p><span className='sub'>Product Name:</span> {data.product_name}</p>
            <p><span className='sub'>Quantity:</span> {data.quantity}</p>
            <p><span className='sub'>Date:</span> {data.date}</p>
            <div className='d-flex justify-content-between'>
            <button
              className="btn btn-primary"
              onClick={() => openPdfInNewTab(order.pdf)}
            >
              Show PDF
            </button> 
            <button className="btn btn-warning" onClick={()=>setShow(true)}>Update shipping Details</button>
            </div>
             {
              show && <div className='d-flex flex-column p-5 box-shadow'>
                   <div> 
                    <label htmlFor='shipping-1' className='sub'>Shipping 1</label>
                    <br/>
                    <input type='Date'
                     className='mb-3 p-1 form-control mt-2' 
                     placeholder='Schedule 1'
                     value={shipping1} 
                     id='shipping-1'
                     onChange={(e) => {setShipping1(e.target.value);setShippingDetails(data._id, 1, e.target.value)}}

                     />
                    </div>     
                   <div> 
                   <label htmlFor='shipping-2' className='sub'>Shipping 2</label>
                   <br/>
                    <input type='Date'
                    className='mb-3 p-1 form-control mt-2' 
                    placeholder='Schedule 2' 
                    value={shipping2}
                     id='shipping-2'
                     onChange={(e) => {setShipping2(e.target.value);setShippingDetails(data._id, 2, e.target.value)}}

                     />
                    </div>
                   <div>
                   <label htmlFor='shipping-3' className='sub'>Shipping 3</label>
                   <br/>
                    <input type='Date' 
                    className='mb-3 p-1 form-control mt-2'
                    placeholder='Schedule 3' 
                    value={shipping3}
                    onChange={(e) => {setShipping3(e.target.value);setShippingDetails(data._id, 3, e.target.value)}}

                     id='shipping-3'/>
                     <button className='btn btn-info text-white' onClick={()=>setShow(false)}>Close</button>
                    </div>
                   
              </div>
             }   
             <h5 className='mt-5'>Shipping Schedules</h5> 
            <div className='d-flex justify-content-around mt-3'>
            {shipping1?<button disabled={data.schedule1.response === 'no'} className={data.schedule1.response==="yes"?'btn btn-success':'btn'}>{shipping1}</button>:null}
            {shipping2?<button disabled={data.schedule2.response === 'no'} className={data.schedule2.response==="yes"?'btn btn-success':'btn'}>{shipping2}</button>:null}
            {shipping3?<button disabled={data.schedule3.response === 'no'} className={data.schedule3.response==="yes"?'btn btn-success':'btn'}>{shipping3}</button>:null}
           </div>
          </div>
    </div>
  );
}

export default OrderComp;
