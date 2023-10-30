import React from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { removeAuth } from '../Redux';
import '../styles/Header.css'
const Header = (props) => {
    const {user,token}=props
    const navigate=useNavigate()
    const LogoutHandler=()=>{
        props.removeAuth()
        navigate('/login')
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary backGround">
  <div className="container-fluid pl-3 pr-3">
    <span className="navbar-brand name" href="#">App</span>
   {user.name?<span className="nav-link active name">{user.name}</span>:null}
     
       <div className='d-flex gap-5'><NavLink to='/user/orders' className="nav-link active name" aria-current="page">
            My Orders
          </NavLink>
          <NavLink className="nav-link active name " aria-current="page" onClick={LogoutHandler} to='/login'>
            Log out
          </NavLink>
          </div>

  </div>
</nav>
  );
}
const mapStateToProps=state=>{
    return{
        user: state.auth.user, 
        token: state.auth.token,
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
      removeAuth: () => dispatch(removeAuth()) 
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
