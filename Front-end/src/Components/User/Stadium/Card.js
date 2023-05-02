import React from 'react'
import './Stadium.css'
import {MdLocationOn} from 'react-icons/md'
import { NavLink,useNavigate} from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

function Card(props) {  
      let history = useNavigate();
      
  const [value, setvalue] = React.useState(0);
  const [come, setcome] = React.useState(false);
 

 
    

  //fonction get user by id
  const get3=async() =>{
    
  await   fetch('http://localhost:4000/getavis', {
     method: 'POST',
     body: JSON.stringify({
       id_company:props.id,
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
    setvalue(myJson[0].avis/myJson[0].number)
    setcome(true)
   });
  
  
  }
  const send=async(v) =>{
  await   fetch('http://localhost:4000/setavis', {
     method: 'POST',
     body: JSON.stringify({
     
      id_company:props.id,
      id_user:{ id:props.iduser, avis: v }

      
     })
    ,
      headers: {
        "Content-Type":"application/json"
      },
      
    
  })
  .  then(function(response){

    if(props.location === 'sousse'){
      fetch('http://localhost:4009/setavis', {
     method: 'POST',
     body: JSON.stringify({
     
      id_company:props.id,
      id_user:{ id:props.iduser, avis: v }

      
     })
    ,
      headers: {
        "Content-Type":"application/json"
      },
      
    
  })
    }
    else if (props.location === 'monastir'){
      fetch('http://localhost:4008/setavis', {
     method: 'POST',
     body: JSON.stringify({
     
      id_company:props.id,
      id_user:{ id:props.iduser, avis: v }

      
     })
    ,
      headers: {
        "Content-Type":"application/json"
      },
      
    
  })
    }

     return response.json();
   })
   .then(function(myJson) {
    // console.log(myJson[0]);
    setvalue(myJson[0].avis/myJson[0].number)
    setcome(true)
   });
  
  
  }
  
  React.useEffect(()=>{

    get3();
  },[])
console.log(value)
  return (
    <>
    {(come)?    <div className="card w-50 bg-card" style={{height:'145px'}}>
    <div className="d-flex justify-content-start mt-2 ms-5 ">
    
    <img src={props.photo} alt="company" width="60" height="60" className='rounded-5'/><span className='h5 position-relative ms-2' style={{top:'20px'}}>{props.nom}</span>
    </div>
    <div className="row">
    <div className=" col-3 d-flex justify-content-start mt-2 margin-left ">
    <MdLocationOn size={25} className='text-primary position-relative' style={{left:'18px',bottom:'15px'}} /><span className='text-muted h6 position-relative' style={{left:'20px',bottom:'10px',textTransform:'capitalize'}} >{props.location}</span>
    
    </div>
    
    <div className="col-3 d-flex justify-content-end margin-left2 mb-4 position-relative" style={{left:'65px',bottom:'14px'}}>
    
    <button className='btn-4  rounded-5 text-white' onClick={()=>{history(`/user/stadium/${props.id}`)}}>Consult</button>
    
    </div>
    <div className="col-3 d-flex justify-content-start margin-left2  position-relative" style={{right:'47px',bottom:'39px'}}>
    
    <ReactStars
        count={5}
        size={26}
        onChange={(v)=>{send(v)}}
        style={{border:"0px solid black"}}
        value={value}
        activeColor="#0C82EE"
      />
    </div>
    </div>
    
    </div>:""}
  </>
  )
}

export default Card
