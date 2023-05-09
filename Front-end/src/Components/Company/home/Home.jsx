import React,{useEffect} from 'react'
import './home.css'
import vector from './Vector.png'
import subtract from './c.png'
import e from './e.png'
import group from './Group.png'
import { Link } from 'react-router-dom'
import { GrOverview } from 'react-icons/gr'
import {AiFillStar} from 'react-icons/ai'
import Navbar from './../navbar/Navbar'
import { useState } from 'react'
import teamify from './../../../Assets/images/Teamify.png'
import ooredoo from './../../../Assets/images/ooredoo.jpg'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
import ReactStars from "react-rating-stars-component";
import { NavLink,useNavigate} from 'react-router-dom'

const HomeCompany = () => {
  const [activeNav,setActiveNav] = React.useState('/company')
  const [selectedButton, setSelectedButton] = useState(null);
  const [company, setcompany] = useState([]);
  const [avis, setavis] = useState([]);
  const [values, setvalues] = useState(0);
  const [numbers, setnumbers] = useState(0);
  const [client, setclient] = useState(0);
  const [reserv, setreserv] = useState(0);
  const [view, setview] = useState(0);
useEffect(()=>{ 
   get();
   get2();
   get3();
   get4();
   get5();

 
},[])

  
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
var id=getCookie('user_id')
console.log(id);
//fonction get user by id
const get=async() =>{
await   fetch('http://localhost:4000/getbyid', {
   method: 'POST',
   body: JSON.stringify({
       id:id,
    }),
    headers: {
      "Content-Type":"application/json"
    },
    
  
})
.  then(function(response){
   return response.json();
 })
 .then(function(myJson) {
  // console.log(myJson[0]);
  setcompany(myJson[0]);

 });


}
const get2=async() =>{
await   fetch('http://localhost:4002/stadium/getnumberbycompany', {
   method: 'POST',
   body: JSON.stringify({
       id:id,
    }),
    headers: {
      "Content-Type":"application/json"
    },
    
  
})
.  then(function(response){
   return response.json();
 })
 .then(function(myJson) {
  // console.log(myJson[0]);
   setnumbers(myJson.length);
  console.log(myJson.length);
 });


}
function countDistinctClients(objects) {
  let uniqueClients = {};
  
  objects.forEach((obj) => {
    uniqueClients[obj.id_user] = true;
  });
  
  return Object.keys(uniqueClients).length;
}
const get4=async() =>{
await   fetch('http://localhost:4002/reservation/getbycompany', {
   method: 'POST',
   body: JSON.stringify({
       id:id,
    }),
    headers: {
      "Content-Type":"application/json"
    },
    
  
})
.  then(function(response){
   return response.json();
 })
 .then(function(myJson) {
  // console.log(myJson[0]);
  setreserv(myJson.length);
  const distinctClients = countDistinctClients(myJson);


  setclient(distinctClients)
  console.log(myJson);
  console.log(`reservation is ${distinctClients}`);
 });


}
console.log(company)
const get3=() =>{
     fetch('http://localhost:4000/getavis', {
     method: 'POST',
     body: JSON.stringify({
       id_company:id,
      }),
      headers: {
        "Content-Type":"application/json"
      },
      
    
  })
  .  then(function(response){
     return response.json();
   })
   .then(function(myJson) {
    // console.log(myJson[0]);
    setavis(myJson[0]);
    console.log(myJson[0])
    if(isNaN(myJson[0].avis/myJson[0].number)){
      setvalues(0)
    }
    else{    setvalues(myJson[0].avis/myJson[0].number)}

   });
  
  
  }
  
const get5=() =>{
     fetch('http://localhost:4000/getview', {
     method: 'POST',
     body: JSON.stringify({
       id_company:id,
      }),
      headers: {
        "Content-Type":"application/json"
      },
      
    
  })
  .  then(function(response){
     return response.json();
   })
   .then(function(myJson) {
    // console.log(myJson[0]);
    console.log(myJson[0].number)
    setview(myJson[0].number)
   });
  
  
  }
  function deleteAllCookies() {
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
      let history = useNavigate();
      const deconnect=()=>{
        deleteAllCookies();
                history('/login');
      }
  console.log(values)
  return (
    <>
    <div  className=' row w-100'>
      <div className="col-3">
      <div className=" d-flex justify-content-start ">
    <div className="navbar-container my_bg w-25">
   
   <div className='  position-relative ' >
     <div className='d-flex justify-content-center pt-5'>
       <h2 className='h2 text-white'><img src={teamify} width='50' height='50'/><span className="position-relative" style={{top:'4px'}}>Teamify</span> </h2>

     </div>
     <div className="mt-4">
       <Link to='/company' onClick={() => setActiveNav('/company')} className={activeNav === '/company' ? 'activenav ' : 'not'} >HOME</Link>
     <Link to='/company/stadium' onClick={() => setActiveNav('/company/stadium')} className={activeNav === '/company/stadium' ? 'activenav' : 'not'}>STADIUM</Link>
     <Link to='/company/calendar' onClick={() => setActiveNav('/company/calendar')} className={activeNav === '/company/calendar' ? 'activenav' : 'not'}>CALENDAR</Link>
     <Link to='/company/reservation' onClick={() => setActiveNav('/company/reservation')} className={activeNav === '/company/reservation' ? 'activenav' : 'not'}>RESERAVTION</Link>
     <Link to='/company/pictures' onClick={() => setActiveNav('/company/pictures')} className={activeNav === '/company/pictures' ? 'activenav' : 'not'}>PICTURES</Link>
    </div> 
    </div>
    <div className=" position-absolute  hhh2 d-flex justify-content-center">   

     <div className="text-white pb-2" onClick={()=>{history('/company/setting');}} style={{cursor: 'pointer'}}><span className='position-relative' style={{cursor: 'pointer',top:'23px',right:'41px'}} ><AiFillSetting className='ms-3 '/></span>Setting</div>

      
</div>
    <div className=" position-absolute  hhh d-flex justify-content-center">    <div className="text-white" onClick={deconnect} style={{cursor: 'pointer'}}><span className='position-relative' style={{cursor: 'pointer',top:'23px',right:'41px'}} ><CgLogOut className='ms-3 '/></span>Logout</div>

      
</div>
   
   </div>
   </div>
   </div>

        <div className=" col-8">
<div className="d-flex justify-content-end ps-5 ">
<span className=" mt-3 text-end ps-5 text-dark position-relative" style={{left:'23px'}}  >


<div className="mt-2 h5 position-relative text-nowrap" style={{top:'1px', left:'12px'}}>
{company.name}<img src={`http://localhost:4000/images/${id}/picture.jpeg`}  className="border border-1 border-dark" width='50' height='50' style={{borderRadius:'50%',marginLeft:'30px',cursor:'pointer'}} id="dropdownMenuButton9" data-bs-toggle="dropdown" aria-expanded="false"  />


</div>







</span> 


</div>
        <div className='h3 ms-5'><img src={vector} alt="" /> Overview </div>
        <div className='ms-4 ps-1'>
        <div className='ms-5 ps-5'>

        <div className='row  d-flex justify-content-center mt-4  pt-2'>
        <div className='col border border-2 rounded-3 border-primary ms-2 p-4'>
<div className="d-flex justify-content-center h5 text-primary">Avis</div>
<div className="d-flex justify-content-center h5 text-primary">   
 {values && <ReactStars
    count={5}
    size={33}
    style={{border:"0px solid black"}}
    value={values}
    activeColor="#0C82EE"
    disabled="true"
  />} 
 
  
  </div>

        </div>
        
        <div className='col border border-2 rounded-3 border-primary ms-2 p-4'>
        <div className="d-flex justify-content-center h5 text-primary">Number of view</div>
        <div className="d-flex justify-content-center h2 text-primary">{view}</div>


        </div>
        
        <div className='col border border-2 rounded-3 border-primary ms-2 p-4'>
        <div className="d-flex justify-content-center h5 text-primary text-nowrap">Number of reservation</div>
        <div className="d-flex justify-content-center h2 text-primary">{reserv}</div>

        </div>
        
        
        </div>
        </div>
        </div>
        <div className='mt-5 pt-2 d-flex justify-content-center ms-5 ps-5'>
        <div className='ms-5 position-relative' >
<img src={subtract} alt="" />
<div className="position-absolute h5 text-center " style={{bottom:'109px',left:'30px'}}>Weekly Balance</div>
<div className="position-absolute h2 text-center " style={{bottom:'59px',left:'50px'}}>{reserv * 10} DT</div>
</div>
        <div className='ms-5 position-relative' >
<img src={e} alt="" />
<div className="position-absolute h5 text-center " style={{bottom:'109px',left:'30px'}}>Number of stadium</div>
<div className="position-absolute h2 text-center " style={{bottom:'59px',left:'50px'}}>{numbers}</div>
</div>
<div className='ms-5 position-relative' style={{bottom:'13px'}}><img src={group} alt="" />
<div className="position-absolute h5 text-center " style={{bottom:'97px',left:'30px'}}>Number of client</div>
<div className="position-absolute h2"  style={{bottom:'49px',left:'99px'}}>{client}</div>
</div>

        </div>
        
        </div>




        {/* <div className='def'>
          <Link to='/' >Sousse football Academy</Link>
       </div>
        <div className='title'>
          <GrOverview  className='icon'/>
           <h1>Overview</h1>
        </div>
        <div className='container'>
          <div className='cards'>
            <div className='card'>
              <h2>Avis</h2>
              <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              </div>
              
            </div>

            <div className='card'>
              <h2>Number of Stadiums</h2>
              <h1>2</h1>
            </div>

            <div className='card'>
              <h2>Reservations</h2>
              <h1>20</h1>
            </div>
          </div> */}
        </div>
    
    </>
  )
  
}

export default HomeCompany