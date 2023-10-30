import React from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { removeAuth } from '../Redux';
import '../styles/Header.css'
const Header2 = (props) => {
    const {user,token}=props
    const navigate=useNavigate()
    const LogoutHandler=()=>{
        navigate('/login')
        props.removeAuth()
       
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary backGround">
  <div className="container-fluid pl-3 pr-3">
    <span className="navbar-brand name" href="#">App</span>
   {user.name?<span className="nav-link active name">{user.name}</span>:null}
     
      {token? 
          <NavLink className="nav-link active name" to='/login' aria-current="page" onClick={LogoutHandler}>
            Log out
          </NavLink>
          : <NavLink className="nav-link active name" aria-current="page" to='/login'>
            Log In
          </NavLink>}

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
export default connect(mapStateToProps,mapDispatchToProps)(Header2);
