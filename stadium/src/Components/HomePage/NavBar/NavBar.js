import React from 'react'
import './NavBar.css'
import {AiOutlineSearch,AiFillSetting} from 'react-icons/ai'
import {FaRegUserCircle} from 'react-icons/fa'
import {CgLogOut} from 'react-icons/cg'
import logo from './../../../Assets/images/Teamify.png'
import { NavLink,useNavigate} from 'react-router-dom'



  

   
function NavBar(props) {
      let history = useNavigate();

  return (
    <div className="nav">
        <div className="d-flex justify-content-start left" style={{cursor:'pointer'}}  onClick={()=>{history('/')}}><img src={logo} alt="logo" className="position-relative " style={{top:'8px'}} width="50" height="50" /><span className="h3 mt-3 text-white">Teamify</span></div>
  
<div className="log-inscri">
     <NavLink to='/inscription'  className='links' >Sign up</NavLink>
     <NavLink to='/login' className='links' >Login</NavLink>
</div>



    </div>
  )
}

export default NavBar
