import React,{useState} from 'react'
import NavBar from '../NavBar/NavBar'
import { useParams } from 'react-router-dom';
import Map from './Map';
import {MdLocationOn,MdEmail} from 'react-icons/md'
import {IoMdCafe} from 'react-icons/io'
import {GiRotaryPhone} from 'react-icons/gi'
import {MdFamilyRestroom} from 'react-icons/md'
import {RiParkingFill} from 'react-icons/ri'
import {FaShower} from 'react-icons/fa'
import {TbNorthStar} from 'react-icons/tb'
import CardStadium from './CardStadium'
import ReactStars from "react-rating-stars-component";
import { useEffect } from 'react';
import gradin from './../../../Assets/images/gradin.png'
import family from './../../../Assets/images/family.png'
import Slides from './slides'
function Stadiumprofile() {   
     let { id } = useParams();
     const [value, setvalue] = useState(0);
     const [user, setuser] = useState([]);
     const [avis, setavis] = useState([]);
     const [calender, setcalender] = useState([]);




     useEffect(()=>{
       get();
       get2();
       get3();
     },[])
       
     function getCookie(name) {
       const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop().split(';').shift();
     }
     var id_user=getCookie('user_id')
     //fonction get user by id
     const get3=async() =>{
     await   fetch('http://localhost:4000/getavis', {
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
       setvalue(myJson[0].avis/myJson[0].number)
      });
     
     
     }
     const get=async() =>{
     await   fetch('http://localhost:4000/getbyid', {
        method: 'POST',
        body: JSON.stringify({
            id:id_user,
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
        setuser(myJson[0]);
      });
     
     
     }


   
     const get2=async() =>{
     await   fetch('http://localhost:4002/reservation/getbystadium', {
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
       setcalender(myJson[0]);
      });
     
     
     }
    
     const [imageNames, setImagesName] = useState([]);
     const [stadium, setStadium] = useState([]);
     const [numbers, setnumbers] = useState(0);
     
     useEffect(() => {
       fetch('http://localhost:4000/getstadiumbyid', {
         method: 'POST',
         body: JSON.stringify({
           id: id
         }),
         headers: {
           'Content-Type': 'application/json'
         },
       })
         .then((response) => response.json())
         .then((rep) => {
           setStadium(rep);
           if(rep[0].location==='sousse'){
            fetch('http://localhost:4009/setview', {
              method: 'POST',
              body: JSON.stringify({
                id_company: id,
                id_user:id_user
              }),
              headers: {
                'Content-Type': 'application/json'
              },
            });
           }
           else if(rep[0].location==='monastir'){
            fetch('http://localhost:4008/setview', {
              method: 'POST',
              body: JSON.stringify({
                id_company: id,
                id_user:id_user
              }),
              headers: {
                'Content-Type': 'application/json'
              },
            });
           }
           setmap(rep[0].adresse);
           setnumbers(rep[0].numbers);
     
           const images = [];
           for (let i = 1; i <= rep[0].numbers; i++) {
             images.push(`http://localhost:4000/Stadium/${rep[0].id}/picture${i}.jpeg`);
           }
           setImagesName(images);
         });
     }, []);
     

useEffect(() => {
  fetch('http://localhost:4002/view/setview', {
    method: 'POST',
    body: JSON.stringify({
      id_company: id,
      id_user:id_user
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });


},[])
     const [stadiumintern,setstadiumintern]=useState([])
     const [status, setstatus] = useState('');
     const [map, setmap] = useState('');

useEffect(() => {
  fetch('http://localhost:4002/stadium/getbycompany', {
    method: 'POST',
    body: JSON.stringify({
      id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((reponse)=>{   
    setstatus(reponse.status);
     return reponse.json()
  }).then(rep=>{
    setstadiumintern(rep)
  })


},[])
console.log(stadiumintern)

  console.log(value);
  const send=async(v) =>{
    await   fetch('http://localhost:4000/setavis', {
       method: 'POST',
       body: JSON.stringify({
     
         id_company:id,
         id_user:{ id:id_user, avis: v }

         
        }),
        headers: {
          "Content-Type":"application/json"
        },
        
      
    })
    .  then(function(response){

      if(stadium[0].location === 'sousse'){
        fetch('http://localhost:4009/setavis', {
       method: 'POST',
       body: JSON.stringify({
       
        id_company:id,
        id_user:{ id:id_user, avis: v }
  
        
       })
      ,
        headers: {
          "Content-Type":"application/json"
        },
        
      
    })
      }
      else if (stadium[0].location === 'monastir'){
        fetch('http://localhost:4008/setavis', {
       method: 'POST',
       body: JSON.stringify({
       
        id_company:id,
        id_user:{ id:id_user, avis: v }
  
        
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
     });
    
    
    }

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
    
    function getCookie(name) {
      const cookieString = document.cookie;
      if (cookieString) {
        const cookies = cookieString.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(`${name}=`.length, cookie.length);
          }
        }
      }
      return null;
    }

   
console.log(imageNames)
  return (
    <div>

<NavBar username={`${user.nom && user.prenom ? user.nom + " " + user.prenom : "Loading"}`} url={user.url} id={user.id} />
{ (stadium.length!==0)? <>
<div className="row w-100 ps-4">
<div className="col-5">
      <div className="d-flex justify-content-start mt-5 ms-3 text-nowrap">
      <img src={`http://localhost:4000/images/${stadium[0].id}/picture.jpeg`} alt="" style={{width:'100px',height:'100px',borderRadius:'50px'}} />
      <div className="d-flex justify-content-center mt-4 pt-2 h4 ms-3">
{stadium[0].name}</div><br/>
    
      </div>
      <div className="d-flex justify-content-center  col-10 position-relative ms-4" style={{bottom:'13px',left:'8px'}}>
      <div className=" col-11 d-flex justify-content-start mt-2 margin-left ">
<MdLocationOn size={33} className='text-primary position-relative' style={{left:'18px',bottom:'15px'}} /><span className='text-muted ms-1 position-relative ' style={{left:'20px',bottom:'9px',fontSize:'19px'}} >{stadium[0].location}</span>

</div>
      </div>
      <div className="d-flex justify-content-center mt-1  col-10 position-relative ms-4" style={{bottom:'13px',left:'8px'}}>
      <div className=" col-11 d-flex justify-content-start mt-2 margin-left ">
<MdEmail size={33} className='text-primary position-relative' style={{left:'18px',bottom:'10px'}} /><span className='text-muted  ms-1 position-relative ' style={{left:'20px',bottom:'6px',fontSize:'19px'}} >{stadium[0].email}</span>

</div>
      </div>
      <div className="d-flex justify-content-center mt-1  col-10 position-relative ms-4" style={{bottom:'13px',left:'8px'}}>
      <div className=" col-11 d-flex justify-content-start mt-2 margin-left ">
<GiRotaryPhone size={33} className='text-primary position-relative' style={{left:'18px',bottom:'10px'}} /><span className='text-muted ms-1  position-relative ' style={{left:'20px',bottom:'6px',fontSize:'19px'}} >{stadium[0].phone}</span>

</div>
      </div>
      <div className="d-flex justify-content-center   col-10 position-relative ms-5" style={{bottom:'19px',left:'6px'}}>
      <div className=" col-11 d-flex justify-content-start  margin-left ">
      <ReactStars
    count={5}
    size={33}
    onChange={(v)=>{send(v)}}
    style={{border:"0px solid black"}}
    value={value}
    activeColor="#0C82EE"
  />
</div>
      </div>
      <div className="d-flex justify-content-center mt-3   col-10 position-relative ms-4 ps-4" style={{bottom:'19px',left:'6px'}}>
    {(stadium[0].buvette)?<span className='rounding' title="buvette"><IoMdCafe size={32}/></span>:""}
    {(stadium[0].vesiaire)?<span className='rounding ms-2' title="vestiaire"><FaShower size={32}/></span>:""}
    {(stadium[0].espacefamilial)?<span className='rounding ms-2' title="espacefamilial"><img src={family} height={32} width={32}/></span>:""}
    {(stadium[0].parking)?<span className='rounding ms-2' title="parking"><RiParkingFill size={32}/></span>:""}
    {(stadium[0].gradin)?<span className='rounding ms-2' title="gradin"><img src={gradin} height={32} width={32}/></span>:""}
      </div>
      <div className="d-flex justify-content-center mt-3 h6   mb-4 ms-2" >
   <div className='text-wrap text-break ms-3 pe-5'><TbNorthStar /><u style={{    textUnderlineOffset: '4.5px' }}>Description :</u> {stadium[0].description}</div>
      </div>
      </div>
<div className="col-6 mt-5 pt-4">{((numbers != undefined)&&(numbers!=0))?<Slides images={imageNames} />:''}
</div>
      </div>
<div className="row w-100">
      {(status=='500')?<div className='d-flex justify-content-center ms-1 mt-5 h5 pt-5'>There is no Stadium</div>:

      (stadiumintern.length!==0)? stadiumintern.map((e,i)=>{
        return(
        <div className='col-4'><div className="d-flex justify-content-center ms-4" >
      <CardStadium id={e.id} id_user={user.id} user_name={`${user.nom} ${user.prenom}`} price={e.price} duration={e.duration} id_company={stadium[0].id} nom={e.name} company={stadium[0].name} times={e.times} dimension={e.dimension} number={e.numberofplayers} generation={e.generation} led={e.ledlighting} />
      </div>
      
      
      </div>
        )

      }):<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">
 
</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>}  </div>
     
      
      <br/>
   
      </>:<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">
 
</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>} 
<br/>
      <br/>
      <br/>
{(map==undefined)?"":(map !== '') ?
      <Map map={map} />
      :<>
      <div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
      <div class="spinner-border" role="status">
       
      </div> </div>
      <div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>
      
      <div className='h3'>Loading</div>
      </div>
      </>}
    </div>
  )
}

export default Stadiumprofile
