
import {RxDimensions,} from 'react-icons/rx'
import {RiTeamFill,RiQuestionnaireFill} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import {GiLightBulb} from 'react-icons/gi'
import {RxUpdate} from 'react-icons/rx'
import {GiDuration} from 'react-icons/gi'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {AiOutlineDelete} from 'react-icons/ai'


import stade from './../../../Assets/images/stadiumlogo.png'


  import './stadium.css'
  import { Link } from 'react-router-dom'
  import { GrOverview } from 'react-icons/gr'
  import {AiFillStar} from 'react-icons/ai'
  import Navbar from './../navbar/Navbar'
  import { useState,useEffect } from 'react'
  import teamify from './../../../Assets/images/Teamify.png'
  import {FaRegUserCircle} from 'react-icons/fa'
  import {AiFillSetting} from 'react-icons/ai'
  import {CgLogOut} from 'react-icons/cg'
  import ReactStars from "react-rating-stars-component";
  import ooredoo from './../../../Assets/images/ooredoo.jpg'
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
    function CardStadium(props) {    
  
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
  
  
    const get2=async() =>{
      await   fetch('http://localhost:4002/stadium/getbyitsid', {
         method: 'POST',
         body: JSON.stringify({
             id:props.id,
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
  
 



  return (
    <>
    {stadiums &&
      <div className="card  mt-5 bg-card pt-5" >
<div className="d-flex justify-content-center   ">
 

<span className='h5 pt-4'>{stadiums.name}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<img src={stade} alt="company" width="360" height="200" className=''/></div>
<div className="d-flex justify-content-center mt-3  ">

<RxDimensions size={26} /><span className="ms-1 h6 mt-1  ">Dimension : {stadiums.dimension} m</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiTeamFill size={24} className='' /><span className="ms-1 h6 mt-1  ">Number of players per team : {stadiums.numberofplayers} </span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<MdFilterAlt size={26} /><span className="ms-1 h6 mt-1  ">Generation of synthetic turf : {stadiums.generation}{(stadiums.generation==1)?'st':(stadiums.generation==2)?'nd':(stadiums.generation==3)?'rd':'th'} generation</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiLightBulb size={24} /><span className="ms-1 h6 mt-1  ">Led lighting : {(stadiums.ledlighting)?'YES':'NO'}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiMoneyDollarCircleFill style={{position:'relative',top:'3px'}} size={24} /><span className="ms-1 h6 mt-1  ">Price : {stadiums.price} DT</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiDuration size={24} style={{position:'relative',top:'3px'}} /><span className="ms-1 h6 mt-1  ">Duration : {stadiums.duration} minutes</span>
</div>




</div>
  
              }
              </>
              
              )
}

export default CardStadium
