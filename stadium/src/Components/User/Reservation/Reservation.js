import React,{useState,useEffect} from 'react'
import './Reservation.css'
import NavBar from '../NavBar/NavBar'
import Card from './Card'

function Reservation() {

  const [user, setuser] = useState([]);
  const [status, setstatus] = useState('');

  useEffect(()=>{
    get()
  },[])
    
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  var id_user=getCookie('user_id')
  //fonction get user by id
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
  const [reservation,setreservation]=useState([])
useEffect(() => {
fetch('http://localhost:4002/reservation/getbyuser', {
 method: 'POST',
 body: JSON.stringify({
   id: id_user
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
  <br/>
  <br/>
  <div className="     ">
      <div className="d-flex justify-content-center row w-100 ">

  {(status=='500')?<div className='d-flex justify-content-center ms-1 mt-5 h4 pt-5'>There is no reservation</div>:
 (reservation.length!==0)?[...reservation].reverse().map((element,index)=>{

return(
  <div key={index} className=" col-4 d-flex justify-content-center mt-4 "><Card width={28} pdf={element.pdf} nom={element.name_company} numero={element.id} date={element.date} hour={element.hour} /></div>


)}):<>
<div className="d-flex justify-content-center position-relative" style={{top:'200px'}}>
<div class="spinner-border" role="status">
 
</div> </div>
<div className="d-flex justify-content-center position-relative" style={{top:'220px'}}>

<div className='h3'>Loading</div>
</div>
</>}      
</div>
</div>
<br/>
<br/>

    </div>
  )
}

export default Reservation
