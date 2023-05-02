import React,{useEffect,useState} from 'react'
import './SearchStadium.css'
import NavBar from '../NavBar/NavBar'
import academy from './../../../Assets/images/ooredoo.jpg'
import {MdLocationOn} from 'react-icons/md'
import Card from './../Stadium/Card'
import {FaFilter} from 'react-icons/fa'

function Searching() {


  const [user, setuser] = useState([]);

  useEffect(()=>{

    get();
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
     setuser(myJson[0]);
   });
  
  
  }
  const [stadiums,setstadiums] =useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/getallstadium')
    .then(response => response.json())
    .then(response =>setstadiums(response))
    .catch(err => console.error(err));
  }, [])
  const [location, setlocation] = useState('');


  useEffect(()=>{
    checkUserIdCookie();
  },[])
  const filter =()=>{
    if(location === 'sousse'){
    fetch('http://localhost:4009/getallsoussestadium')
      .then(response => response.json())
      .then(response =>setstadiums(response))
      .catch(err => console.error(err));
    } else if (location === ''){
      fetch('http://localhost:4000/getallstadium')
      .then(response => response.json())
      .then(response =>setstadiums(response))
      .catch(err => console.error(err));
  
    }
    else if (location === 'monastir'){
      fetch('http://localhost:4008/getallmonastirstadium')
      .then(response => response.json())
      .then(response =>setstadiums(response))
      .catch(err => console.error(err));
  
    }
      document.getElementById('close').click();
  
  
  }
  
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


  
  return (
    <div>
<NavBar username={`${user.nom && user.prenom ? user.nom + " " + user.prenom : "Loading"}`} url={user.url} id={user.id} />
<div style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal" className="d-flex justify-content-start ms-5 mt-5"><FaFilter /><span className='position-relative h5 ms-1' style={{bottom:'4px'}}>Filter </span> </div>

     { (stadiums.length!==0)?stadiums.map((element,index)=>{

return(
<div key={index} className="d-flex justify-content-center mt-5 "><Card nom={element.name} iduser={id} location={element.location} avis={5} photo={`http://localhost:4000/images/${element.id}/picture.jpeg`} id={element.id}/></div>

)}):<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">
 
</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>}   

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div className='d-flex justify-content-end mt-3 me-2'>
        <button type="button" className="btn-close bordering2 " id='close' data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      <div class="modal-body">
      <span className=" mt-2 width_little ms-3  col-9 ">
                
                <select  onChange={(e) => {
                    setlocation( e.target.value );
                  }}                    style={{ height: "40px",width:'300px',borderRadius:'9px' }}

                  id="location">
<option value="" selected>Choose location</option>
<option value="monastir">Monastir</option>
<option value="sousse">Sousse</option>
</select>
              
              </span>      </div>
      <div class="modal-footer">
      <div className='d-flex justify-content-end  mt-3 me-2'>

        <button type="button" onClick={filter} class="btn-15">Filter</button>    
            <button type="button" class="btn-16 ms-2" aria-label="Close" data-bs-dismiss="modal">Close</button>

      </div>
      </div>
    </div>
  </div>
</div>
<br/>
<br/>


    </div>
  )
}

export default Searching
