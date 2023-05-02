import React,{useState,useEffect} from 'react'
import './reservation.css'
import Card from './Card'
import { Link } from 'react-router-dom'
import teamify from './../../../Assets/images/Teamify.png'
import { NavLink,useNavigate} from 'react-router-dom'

import ooredoo from './../../../Assets/images/ooredoo.jpg'
import {AiFillSetting} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
function Reservation2() {

  const [company, setcompany] = useState([]);
  const [status, setstatus] = useState('');

  useEffect(()=>{
    get()
  },[])
    
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  var id=getCookie('user_id')
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
  const [reservation,setreservation]=useState([])
useEffect(() => {
fetch('http://localhost:4002/reservation/getbycompany', {
 method: 'POST',
 body: JSON.stringify({
   id:id
 }),
 headers: {
   'Content-Type': 'application/json'
 },
}).then((reponse)=>{
  setstatus(reponse.status)
 return reponse.json()
}).then(rep=>{
  setreservation(rep)
})


},[])
console.log(reservation)


useEffect(()=>{
  checkUserIdCookie();
},[])

function checkUserIdCookie() {
  const userId = getCookie('user_id');
  if (!userId) {
    // Redirect the user to the login page
    window.location.href = '/login';
  }
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

const [activeNav,setActiveNav] = React.useState('/company/reservation')

  return (
  <>
    <div  className=' row w-100'>
      <div className="col-3 ">
      <div className="  d-flex justify-content-start  ">
    <div className="navbar-container my_bg w-25" >
   
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
<><div className="  d-flex justify-content-end   ps-5 ms-5 row" >
<br/>
 
  {(status=='500')?<div className='d-flex justify-content-center ms-1 mt-5 h4 pt-5'>There is no reservation</div>:
 (reservation.length!==0)?[...reservation].reverse().map((element,index)=>{

return(
  <div key={index} className="col-6 d-flex justify-content-center mt-4 "><Card width={60} pdf={element.pdf} nom={element.name_stadium} user={element.name_user} numero={element.id} date={element.date} hour={element.hour} /></div>


)}):<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">
 
</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>}      
<br/>
<br/>
</div>
</>

</div>
</div>
<br/>
<br/>
<br/>
      </>

        
        




      
       


 

  )
}

export default Reservation2
