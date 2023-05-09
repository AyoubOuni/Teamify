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
import Add from './Add'
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
const Adding = () => {
  const [times, setTimes] = useState(DAYS_OF_WEEK);


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
    .  then(function(reponse){
      setstatus(reponse.status);
      return reponse.json()
     })
     .then(function(myJson) {
      // console.log(myJson[0]);
       setstadiums(myJson);
      console.log(myJson);
     });
    
    
    }

//



function handleTimeChange(dayIndex, timeIndex, value) {
    const newTimes = [...times];
    newTimes[dayIndex].times[timeIndex] = value;
    setTimes(newTimes);
  }
  
  



function handleDeleteTime(dayIndex, timeIndex) {
const newTimes = [...times];
newTimes[dayIndex].times.splice(timeIndex, 1);
setTimes(newTimes);
}

function handleSubmit(event) {
event.preventDefault();
console.log(times); // do something with the times
}


const send=async() =>{
var id_stadium=Math.floor(Math.random() * (100000000000 - 1000000 + 1)) + 1000000;
fetch('http://localhost:4002/stadium/add', {
        method: 'POST',
        body: JSON.stringify({
          id:id_stadium ,
          id_company: id,
          name: stadium.name,
          times: times,
          dimension: `${width} X ${length}`,
          numberofplayers: stadium.number,
          generation: stadium.generation,
          ledlighting:stadium.led,
          duration:stadium.duration,
          price:stadium.price,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {

           get2();
history('/company/stadium')
        })
        .catch(err => console.error(err));
    

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

    
  
  
    
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  console.log(id);
  //fonction get user by id
 
  
  
    const get20=async() =>{
      await   fetch('http://localhost:4002/stadium/getbyitsid', {
         method: 'POST',
         body: JSON.stringify({
             id:222,
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
        console.log(myJson);
       });
      
      
      }
  
  //
  const [deleter, setdelete] = useState('');
  const [iid, setid] = useState('');
  const [width, setwidth] = useState();
  const [length, setlength] = useState();
  const [stadium,setStadium]=useState({
      name:"",times:{},price:"",generation:"",led:"",number:"",duration:""    })
  const [stadium2,setStadium2]=useState({
      ledlighting:"",Dimension:"" })
  
  function handleTimeChange2(dayIndex, timeIndex, value) {
      const newTimes = [...CurrentStadium.times];
      newTimes[dayIndex].times[timeIndex] = value;
      setCurrentStadium({...CurrentStadium,times:newTimes});
    }
    
    
    const handleaddTime=(dayIndex)=> {
      const newTimes = [...times];
      newTimes[dayIndex].times.push("");
      setTimes(newTimes);
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
 

 
  
  const copy= (a)=>{
    setyes(a)
alert(a)
    stadiums.map((yy)=>{
      if(yy.id==a){
        setCurrentStadium({...CurrentStadium,Name:yy.name,Dimension:yy.dimension,Led:yy.ledlighting,number:yy.numberofplayers,price:yy.price,generation:yy.generation,duration:yy.duration,times:yy.times})
     console.log(CurrentStadium);
     {yy.ledlighting ?     document.getElementById("inlineRadio1").checked=true:document.getElementById("inlineRadio2").checked=true}
var i=yy.dimension.split("X");
setwidth(i[0]);
setlength(i[1]);
      }
    })

    
}
  console.log(CurrentStadium.times)

  const send2=async() =>{
    alert(yes)
  fetch('http://localhost:4002/stadium/update', {
          method: 'POST',
          body: JSON.stringify({
            id:yes ,
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
             get2();
             get2();
             get2();
  
             document.getElementById('colsi').click();
          })
          .catch(err => console.error(err));
      
  
  }

   





  
    
    const [yes,setyes]=useState('');
    const [deletee,setdeletee]=useState('');
    const del= () =>{
    fetch('http://localhost:4002/stadium/delete', {
            method: 'POST',
            body: JSON.stringify({
              id:deletee ,
             
            }),
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(() => {
               get2();
    
               document.getElementById('colsin').click();
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

               <u className="h5" style={{textUnderlineOffset:'5px'}}>Add Stadium</u>
</div>
<div className="d-flex justify-content-center ms-4 ">
       
              <form autoComplete='off' required>
                <div class="mb-1">
                  <label for="recipient-name" class="h6">Name :</label>
                  <input  style={{fontSize:'17px'}} type="text"  onChange={(e)=>{setStadium({ ...stadium, name:e.target.value} )}}  placeholder="Entrer Name of stadium" class="form-control" id="name" />
                </div>
      
                <div class="mb-1 pt-3">
                  <label for="recipient-name" class="h6">Dimension:</label>
                  <input  style={{fontSize:'17px',width:'30%'}} onChange={(e)=>{setlength(e.target.value )}} type="text"  placeholder="Length" class="form-control d-inline-block ms-3" id="prénom" />
                 <span className="h5 ms-2 me-2">X</span> <input  onChange={(e)=>{setwidth(e.target.value )}}  style={{fontSize:'17px',width:'30%'}} type="text"  placeholder="Width" class="form-control d-inline-block" id="prénom" />
                </div>
      
                <div class="mb-1 pt-3">
                  <label for="recipient-name" class="h6">Number of players per team :</label>
                  <input style={{fontSize:'17px'}} onChange={(e)=>{setStadium({ ...stadium, number:e.target.value} )}} placeholder="Number of players per team" class="form-control" id="email" />
               </div>
                <div class="mb-1 pt-3">
                  <label for="recipient-name" class="h6">Price :</label>
                  <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Price" onChange={(e)=>{setStadium({ ...stadium, price:e.target.value} )}} aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <span class="input-group-text" id="basic-addon2">DT</span>
      </div>
      
               </div>
               
              
                <div class="mb-1 pt-3">
                  <label for="recipient-name" class="h6">Generation of synthetic turf:</label>
                  <select class="form-select" onChange={(e)=>{setStadium({ ...stadium, generation:e.target.value} )}} aria-label="Default select example">
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
        <input class="form-check-input" type="radio" onChange={(e)=>{setStadium({ ...stadium, led:true} )}}  name="inlineRadioOptions" id="inlineRadio1" value="true" />
        <label class="form-check-label h6" for="inlineRadio1">True</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" onChange={(e)=>{setStadium({ ...stadium, led:false} )}} name="inlineRadioOptions" id="inlineRadio2" value="false" />
        <label class="form-check-label h6"  for="inlineRadio2">False</label>
      </div>
      </div>
      <div class="mb-1 pt-3">
                  <label for="recipient-name" class="h6">Duration :</label>
                  <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Duration" onChange={(e)=>{setStadium({ ...stadium, duration:e.target.value} )}} aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <span class="input-group-text" id="basic-addon2">minutes</span>
      </div>
      
               </div>
               <hr/>
               <div className="d-flex justify-content-center">
               <h4>Times</h4></div>
      <div>
            {times.map((day, dayIndex) => (
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
                      value={time.startTime}
                      onChange={(event) =>{
                          handleTimeChange(dayIndex, timeIndex, event.target.value);
                          }
                        }
                      className="time-input"
                    />
                    
                    <button
                      type="button" style={{width:'15px',bottom:'6px'}} className='btn d-inline-block position-relative  '
                      onClick={() => handleDeleteTime(dayIndex, timeIndex)}
                    >
                      <MdDelete size={26} />
                    </button>
                  </div>
                  </div>
                ))}
                <button type="button" style={{width:'35px',height:'40px'}} className='btn d-inline-block position-relative border-1 border-dark p-2' onClick={() => handleaddTime(dayIndex)}>
                 <img src={add} width='25' height='25' alt="" style={{bottom:'2.5px',right:'2.6px'}} className=' position-relative'/>
                </button>
              </div>
            ))}
            
               </div>
               </div>
            
      
              
              </form>          </div>

            <hr/>
            <div class="d-flex justify-content-center ms-3">
      
            <div class="mt-2 mb-2  ">
            <button type="button" class="btn-9  " style={{fontSize:'18px'}} onClick={send}  >Valider</button>
              <button type="button" id='close' class="btn-10  ms-3" style={{fontSize:'18px'}} data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
      </div>
      
      
          </div>
    </div>
 <br/>
 <br/>
 <br/>
    </>
  )
}

export default Adding
