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
const StadiumCompany = () => {
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

           document.getElementById('changed5').click();
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
  
    <div className="modal fade" id="exampleModal31" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
    <div className='d-flex justify-content-end'>
      <button type="button" className="btn-close bordering2" id='colsin' data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className='d-flex justify-content-center'>
      <div class="modal-title text-center  "  style={{fontSize:'22px'}} id="exampleModalLabel">Delete Stadium</div></div>
    </div>
    <div class="modal-body">
    <div class="d-flex justify-content-center ms-3">

<h5>   Are you Sure to delete this Stadium ?
</h5>
   </div>
   </div>
    <hr/>
    <div class="d-flex justify-content-center ms-3">

    <div class="mt-2 mb-4  ">
    <button type="button" class="btn-9  " style={{fontSize:'18px'}} onClick={del}   >Valider</button>
      <button type="button" id='close' class="btn-10  ms-3" style={{fontSize:'18px'}} data-bs-dismiss="modal">Close</button>
    </div>
    </div>
  </div>
</div>


</div>
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
</div><div className=' d-flex justify-content-center  ms-5 row'>

<div className='d-flex justify-content-center ms-5 row  '>
<div className='row w-100'>


{(status=='500')?<div className='d-flex justify-content-center ms-1 mt-5 h5 pt-5'>There is no Stadium</div>:

(stadiums.length!==0)? stadiums.map((e,i)=>{
  return(
  <><div className="col-6 " >
{/* <CardStadium id={e.id} del={e.id} id_user={'0000'} user_name={`admin`} id_company={stadiums[0].id} nom={e.name} company={stadiums[0].name} times={e.times} dimension={e.dimension} duration={e.duration} price={e.price} number={e.numberofplayers} generation={e.generation} led={e.ledlighting} /> */}

{stadiums &&
      <div className="card  mt-5 bg-card pt-5" >
<div className="d-flex justify-content-center   ">
 

<span className='h5 pt-4'>{e.name}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<img src={stade} alt="company" width="360" height="200" className=''/></div>
<div className="d-flex justify-content-center mt-3  ">

<RxDimensions size={26} /><span className="ms-1 h6 mt-1  ">Dimension : {e.dimension} m</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiTeamFill size={24} className='' /><span className="ms-1 h6 mt-1  ">Number of players per team : {e.numberofplayers} </span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<MdFilterAlt size={26} /><span className="ms-1 h6 mt-1  ">Generation of synthetic turf : {e.generation}{(e.generation==1)?'st':(e.generation==2)?'nd':(e.generation==3)?'rd':'th'} generation</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiLightBulb size={24} /><span className="ms-1 h6 mt-1  ">Led lighting : {(e.ledlighting)?'YES':'NO'}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiMoneyDollarCircleFill style={{position:'relative',top:'3px'}} size={24} /><span className="ms-1 h6 mt-1  ">Price : {e.price} DT</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiDuration size={24} style={{position:'relative',top:'3px'}} /><span className="ms-1 h6 mt-1  ">Duration : {e.duration} minutes</span>
</div>

<span className="d-flex justify-content-start ms-4 mt-3 mb-4  ">

<button className="btn-12 text-white px-5 pt-1" onClick={()=>{            history(`/company/stadium/update/${e.id}`)}}  ><RxUpdate size={20} className='position-relative'  style={{bottom:'3px'}}/><span className="ms-1 h6  ">Update</span></button>
</span>


</div>

  
              }
<span className="d-flex justify-content-end me-3">
<button className="btn-12 ms-3 text-white px-5 pt-1 position-relative"  onClick={()=>{setdeletee(e.id)}} style={{background:'red',borderColor:'red',bottom:'62px'}}  data-bs-toggle="modal" data-bs-target="#exampleModal31"><AiOutlineDelete size={20} className='position-relative'  style={{bottom:'3px'}}/><span className="ms-1 h6  ">Delete</span></button>
</span>

</div>
<div className="modal fade" id="exampleModal11" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
    <div className='d-flex justify-content-end'>
      <button type="button" className="btn-close bordering2" id='colsi' data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className='d-flex justify-content-center'>
      <div class="modal-title text-center  "  style={{fontSize:'22px'}} id="exampleModalLabel">Update Stadium</div></div>
    </div>
    <div class="modal-body">
     
    </div>
    <hr/>
   
  </div>
</div>


</div>
</>
  )

}):<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">

</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>}  

      <div className="col-6"><div className="card  mt-5 bg-card pt-5" style={{cursor:'pointer',height:'684px'}} onClick={()=>{history('/company/stadium/add')}}>
<div className="d-flex justify-content-center uuuui  "  >
 <RiAddCircleFill size={80} />
    </div>
    </div></div>
      </div>
      </div>
      </div>
<div className=" ">   




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
    
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
    </>
  )
  
}

export default StadiumCompany