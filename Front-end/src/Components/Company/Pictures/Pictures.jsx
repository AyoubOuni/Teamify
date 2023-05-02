import React,{useEffect} from 'react'
import './pictures.css'
import Slides from './slides'

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

const Pictures = () => {
  const [activeNav,setActiveNav] = React.useState('/company/pictures')
  const [selectedButton, setSelectedButton] = useState(null);
  const [company, setcompany] = useState([]);
  const [avis, setavis] = useState([]);
  const [values, setvalues] = useState();
  const [numbers, setnumbers] = useState(0);
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
  console.log(myJson.length);
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
    setvalues(myJson[0].avis/myJson[0].number)
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
  const [imageNames, setImagesName] = useState([]);
  const [stadium, setStadium] = useState([]);
  const [numberss, setnumberss] = useState(0);
  console.log(values)
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
        setnumbers(rep[0].numbers);
  
        const images = [];
        for (let i = 1; i <= rep[0].numbers; i++) {
          images.push(`http://localhost:4000/Stadium/${rep[0].id}/picture${i}.jpeg`);
        }
        setImagesName(images);
        console.log(images)
      });
  }, []);

  var picture2;
  const [picture2Valide, setpicture2IsValid] = useState(null);
  const [thispict, setthispic] = useState("");

const checkimage=() => {
    const stadiumFileExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    let areAllStadiumFilesValid = true;
    for (let i = 0; i < thispict.length; i++) {
      const stadiumExtension = thispict[i].name.split('.').pop().toLowerCase();
      if (!stadiumFileExtensions.includes(stadiumExtension)) {
        areAllStadiumFilesValid = false;
        break;
      }
    }
  
  if(areAllStadiumFilesValid===true){
  
    setpicture2IsValid(true);
    picture2=true;
  
  }
  else{
    setpicture2IsValid(false);
    picture2=false;
  
  
  
  }
}

  const updatepicture=(e)=>{
e.preventDefault();
checkimage();
if(picture2){

    const formData3 = new FormData();
    var files = thispict; // FileList object from input element
    
    for (let i = 0; i < files.length; i++) {
      formData3.append('pictures', files[i]);
      
    }
    formData3.append('number', files.length);



fetch(`http://localhost:4000/pictures/${company.numbers}/${id}`, {
method: 'POST',
}).then(async(result)=>{
  console.log('changed');
  console.log(result);

}).then(()=>{

  

fetch(`http://localhost:4000/updatestadiumImage/${id}`, {
method: 'POST',
body: formData3,
}).then(async(result)=>{
  console.log('changed');
  console.log(result);

}).then(()=>{

  window.location.reload();
  
})
})
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
        <div className=' d-flex justify-content-center mt-4 '>
       
        {((numberss != undefined)&&(numbers!=0))?<div className=""><Slides images={imageNames} /></div>:''}
      
        
        </div>
        <div className='row d-flex justify-content-center mt-4'>
        <div className="d-flex justify-content-center mt-3 pb-5 mb-5">
<input type='file'  className='d-none' />

<button className='btn-97  text-center text-nowrap h5 text-white '  data-bs-toggle="modal" data-bs-target="#exampleModal4"  >Upload</button>
<button class="d-none" id='changed'   data-bs-toggle="modal" data-bs-target="#staticBackdrop" >change</button>

</div>
<div className="modal fade"  id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center'>
        <div className="modal-title text-center  "  style={{fontSize:'19px'}} id="exampleModalLabel">Update Your Profile Picture</div></div>
        </div>
        
        <div className="modal-body">
        <form autoComplete='off' required>
        <div className="mb-1">
            <label htmlFor="recipient-name" className="h6">Picture</label>
            <input type="file" style={{fontSize:'14px'}}  onChange={(e) => {setthispic(e.target.files );}} accept="image/png, image/gif, image/jpeg" id='er' multiple className="form-control "  />
            {(picture2Valide===false)?<div style={{bottom:'80px'}} className="text-danger h6 text-nowrap position-relative d-flex justify-content-center  mb-1 text">Invalide Stadium pictures extension(jpg,jpeg,png)</div>:""}

          </div>
          </form>
        </div>
        <hr/>
        <div className="d-flex justify-content-center">

<div className=" mb-3  ">
<button type="button" className="btn-9 " style={{fontSize:'16px'}}  onClick={updatepicture} >Valid</button>
  <button type="button" className="btn-10 ms-2 " style={{fontSize:'16px'}} id='close2' data-bs-dismiss="modal">Close</button>
</div>
</div>
        </div>
        </div>
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

export default Pictures