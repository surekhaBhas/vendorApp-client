import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import {Provider} from 'react-redux'
import store from './Redux/store';
import UserHome from './pages/UserHome';
import UserAuth from './pages/UserAuth';
import VendorAuth from './pages/vendorAuth';
import VendorHome from './pages/vendorHome';
import UserOrders from './pages/UserOrders';
function App() {
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login/>} />
        <Route path='/user' element={<UserAuth/>}>
        <Route path='home' element={<UserHome/>} />
        <Route path='orders' element={<UserOrders/>}/>
        </Route> 
        <Route path='/vendor'element={<VendorAuth/>}>
          <Route path='home' element={<VendorHome/>} />
        </Route>
       
      </Routes>
    </Provider>
      
    </>
  );
}


export default App;