

  import React from 'react'
import './stadium.css'
import { NavLink,useNavigate} from 'react-router-dom'
import {RxDimensions,} from 'react-icons/rx'
import {RiTeamFill,RiQuestionnaireFill} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import {GiLightBulb} from 'react-icons/gi'
import {RxUpdate} from 'react-icons/rx'
import {GiDuration} from 'react-icons/gi'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {AiOutlineDelete} from 'react-icons/ai'

import { useParams } from 'react-router-dom';

import stade from './../../../Assets/images/stadiumlogo.png'
import { Link } from 'react-router-dom'
import { GrOverview } from 'react-icons/gr'
import {AiFillStar} from 'react-icons/ai'
import Navbar from './../navbar/Navbar'
import { useState,useEffect } from 'react'
import teamify from './../../../Assets/images/Teamify.png'
import {AiFillSetting} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
import ReactStars from "react-rating-stars-component";
import ooredoo from './../../../Assets/images/ooredoo.jpg'
import CardStadium from './CardStadium copy'
import {RiAddCircleFill} from 'react-icons/ri'
import './stadium.css'
import add from './add.png'; // import CSS file
import {MdDelete} from 'react-icons/md'
const DAYS_OF_WEEK = [
    { id:'2',name: 'Monday', times: [] },
    {  id:'3',name: 'Tuesday', times: [] },
    {  id:'4',name: 'Wednesday', times: [] },
    {  id:'5',name: 'Thursday', times: [] },
    {  id:'6',name: 'Friday', times: [] },
    { id:'7',name: 'Saturday', times: [] },
    { id:'1', name: 'Sunday', times: [] },
  ];
  function Add() {
      const [times, setTimes] = useState(DAYS_OF_WEEK);
      let { iid } = useParams();


  const [status, setstatus] = useState('');


  const [company, setcompany] = useState([]);
  const [stadiums, setstadiums] = useState([]);
  
useEffect(()=>{ 
   get();
   get2();
 

 
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
  const [activeNav,setActiveNav] = React.useState('/company/stadium')


  

//







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

    
  
  
    
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  console.log(id);
  //fonction get user by id
 
  
  
   
  
  //
  const [width, setwidth] = useState();
  const [length, setlength] = useState();

  function handleTimeChange2(dayIndex, timeIndex, value) {
      const newTimes = [...CurrentStadium.times];
      newTimes[dayIndex].times[timeIndex] = value;
      setCurrentStadium({...CurrentStadium,times:newTimes});
    }
    
    
   
  const handleaddTime2=(dayIndex)=> {
  const newTimes = [...CurrentStadium.times];
  newTimes[dayIndex].times.push("");
  setCurrentStadium({...CurrentStadium,times:newTimes});
  }
  
  function handleDeleteTime2(dayIndex, timeIndex) {
  const newTimes = [...CurrentStadium.times];
  newTimes[dayIndex].times.splice(timeIndex, 1);
  setCurrentStadium({...CurrentStadium,times:newTimes});
  }
  
  function handleSubmit2(event) {
  event.preventDefault();
  console.log(times); // do something with the times
  }
  
  const [CurrentStadium,setCurrentStadium]=useState({Name:"",Dimension:"",Led:"",number:"",price:"",generation:"",duration:'',times:""});
 

  const get2=async() =>{
      await   fetch('http://localhost:4002/stadium/getbyitsid', {
         method: 'POST',
         body: JSON.stringify({
             id:iid,
          }),
          headers: {
            "Content-Type":"application/json"
          },
          
        
      })
      .  then(function(reponse){
        setstatus(reponse.status);
        return reponse.json()
       })
       .then(function(myJson) {
        // console.log(myJson[0]);
         setstadiums(myJson[0]);
         setCurrentStadium({...CurrentStadium,Name:myJson[0].name,Dimension:myJson[0].dimension,Led:myJson[0].ledlighting,number:myJson[0].numberofplayers,price:myJson[0].price,generation:myJson[0].generation,duration:myJson[0].duration,times:myJson[0].times})
         console.log(CurrentStadium);
         {myJson[0].ledlighting ?     document.getElementById("inlineRadio1").checked=true:document.getElementById("inlineRadio2").checked=true}
    var i=myJson[0].dimension.split("X");
    setwidth(i[0]);
    setlength(i[1]);
        console.log(myJson);
       });
      
      
      }
  
  

  const send2=async() =>{
  fetch('http://localhost:4002/stadium/update', {
          method: 'POST',
          body: JSON.stringify({
            id:iid ,
            id_company: id,
            name: CurrentStadium.Name,
            times: CurrentStadium.times,
            dimension: `${width} X ${length}`,
            numberofplayers: CurrentStadium.number,
            generation: CurrentStadium.generation,
            ledlighting:CurrentStadium.Led,
            duration:CurrentStadium.duration,
            price:CurrentStadium.price,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(() => {
            history('/company/stadium')
          })
          .catch(err => console.error(err));
      
  
  }

   





  
    
   

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
    
   
    <div className='d-flex justify-content-center'> 

    <div className='card w-50 p-5'>
    <div className='d-flex justify-content-center'> 

               <u className="h5" style={{textUnderlineOffset:'5px'}}>Update Stadium</u>
</div>
       <form autoComplete='off' required>
        <div class="mb-1">
          <label for="recipient-name" class="h6">Name :</label>
          <input  style={{fontSize:'17px'}} type="text" onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, Name:e.target.value} )}} value={CurrentStadium.Name}  placeholder="Entrer Name of stadium" class="form-control" id="name" />
        </div>

        <div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">Dimension:</label>
          <input  style={{fontSize:'17px',width:'30%'}} value={length} onChange={(e)=>{setlength(e.target.value )}} type="text"  placeholder="Length" class="form-control d-inline-block ms-3" id="prénom" />
         <span className="h5 ms-2 me-2">X</span> <input  onChange={(e)=>{setwidth(e.target.value )}} value={width} style={{fontSize:'17px',width:'30%'}} type="text"  placeholder="Width" class="form-control d-inline-block" id="prénom" />
        </div>

        <div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">Number of players per team :</label>
          <input style={{fontSize:'17px'}} onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, number:e.target.value} )}} value={CurrentStadium.number} placeholder="Number of players per team" class="form-control" id="email" />
       </div>
        <div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">Price :</label>
          <div class="input-group mb-3">
<input type="text" class="form-control" placeholder="Price" value={CurrentStadium.price} onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, price:e.target.value} )}} aria-label="Recipient's username" aria-describedby="basic-addon2" />
<span class="input-group-text" id="basic-addon2">DT</span>
</div>

       </div>
       
      
        <div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">Generation of synthetic turf:</label>
          <select class="form-select" onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, generation:e.target.value} )}} value={CurrentStadium.generation} aria-label="Default select example">
<option className='h6' selected>Open this select menu</option>
<option className='h6' value="1">1st</option>
<option className='h6' value="2">2nd</option>
<option className='h6' value="3">3rd</option>
<option className='h6' value="4">4th</option>
<option  className='h6' value="5">5th</option>
<option className='h6' value="6">6th</option>
</select>          </div>
<div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">LED lighting :</label>
          <br/>
          <div className="d-flex justify-content-center">
          <div class="form-check form-check-inline">
<input class="form-check-input" type="radio" onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, Led:true} )}} name="inlineRadioOptions" id="inlineRadio1" value="true" />
<label class="form-check-label h6" for="inlineRadio1">True</label>
</div>
<div class="form-check form-check-inline">
<input class="form-check-input" type="radio" onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, Led:false} )}} name="inlineRadioOptions" id="inlineRadio2" value="false" />
<label class="form-check-label h6"  for="inlineRadio2">False</label>
</div>
</div>
<div class="mb-1 pt-3">
          <label for="recipient-name" class="h6">Duration :</label>
          <div class="input-group mb-3">
<input type="text" class="form-control" placeholder="Duration" value={CurrentStadium.duration} onChange={(e)=>{setCurrentStadium({ ...CurrentStadium, duration:e.target.value} )}} aria-label="Recipient's username" aria-describedby="basic-addon2" />
<span class="input-group-text" id="basic-addon2">minutes</span>
</div>

       </div>
       <hr/>
       <div className="d-flex justify-content-center">
       <h4>Times</h4></div>
<div>
    {CurrentStadium.times && CurrentStadium.times.map((day, dayIndex) => (
      <div key={day.name} className="day">
        <h5>{day.name}</h5>
        {day.times.map((time, timeIndex) => (
          <div className="d-flex justify-content-center">
          <div key={`${day.name}-${timeIndex}`} className="time ">
            <label htmlFor={`${day.name}-${timeIndex}-start`}>
              Start time:
            </label>
            <input
              id={`${day.name}-${timeIndex}-start`}
              type="time"
              value={time}
              onChange={(event) =>
                  handleTimeChange2(dayIndex, timeIndex, event.target.value)
                }
              className="time-input"
            />
            
            <button
              type="button" style={{width:'15px',bottom:'6px'}} className='btn d-inline-block position-relative  '
              onClick={() => handleDeleteTime2(dayIndex, timeIndex)}
            >
              <MdDelete size={26} />
            </button>
          </div>
          </div>
        ))}
        <button type="button" style={{width:'35px',height:'40px'}} className='btn d-inline-block position-relative border-1 border-dark p-2' onClick={() => handleaddTime2(dayIndex)}>
         <img src={add} width='25' height='25' alt="" style={{bottom:'2.5px',right:'2.6px'}} className=' position-relative'/>
        </button>
      </div>
    ))}
    
       </div>
       </div>
    
       <div class="d-flex justify-content-center ms-3">

<div class="mt-2 mb-4  ">
<button type="button" class="btn-9  " style={{fontSize:'18px'}} onClick={send2}  >Valider</button>
  <button type="button" id='close' class="btn-10  ms-3" style={{fontSize:'18px'}} data-bs-dismiss="modal">Close</button>
</div>
</div>
      
      </form>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Add
