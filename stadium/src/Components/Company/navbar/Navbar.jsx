import React from 'react'
import './navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import teamify from './../../../Assets/images/Teamify.png'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
const Navbar = () => {
  const [activeNav,setActiveNav] = useState('/Home')
  return (
    <div className="d-flex justify-content-start">
   
    <div className='my_bg w-25 position-relative ' >
      <div className='d-flex justify-content-center pt-5'>
        <h2 className='h2 text-white'><img src={teamify} width='50' height='50'/><span className="position-relative" style={{top:'4px'}}>Teamify</span> </h2>

      </div>
      <div className="mt-4">
        <Link to='/Home' onClick={() => setActiveNav('/Home')} className={activeNav === '/Home' ? 'activenav ' : 'not'} >HOME</Link>
      <Link to='/Stadium' onClick={() => setActiveNav('/Stadium')} className={activeNav === '/Stadium' ? 'activenav' : 'not'}>STADIUM</Link>
      <Link to='/Calendar' onClick={() => setActiveNav('/Calendar')} className={activeNav === '/Calendar' ? 'activenav' : 'not'}>CALENDAR</Link>
      <Link to='/Reservation' onClick={() => setActiveNav('/Reservation')} className={activeNav === '/Reservation' ? 'activenav' : 'not'}>RESERAVTION</Link>
     </div> 
     </div>
    
    </div>
  )
}   


export default Navbar