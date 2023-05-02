import React,{useEffect,useState} from 'react'
import './Account.css'
import NavBar from '../NavBar/NavBar'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {TbGenderFemme} from 'react-icons/tb'
import {FaRegUserCircle} from 'react-icons/fa'
import {RiFolderUserFill} from 'react-icons/ri'
import {ImUser,ImFilePicture} from 'react-icons/im'
import {AiFillInfoCircle,AiFillCheckCircle} from 'react-icons/ai'
import {MdModeEdit} from 'react-icons/md'
import {HiLockClosed} from 'react-icons/hi'
import {Checknom,Checkemail,CheckNumerotel,Checkpassword} from './CheckData';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom'

function Account() {
  let history = useNavigate();

  var name;
var prenom;
var email;
var tel;
var picturevalide;
  const [nameIsValid, setnameIsValid] = useState(null);
  const [prenomIsValid, setprenomIsValid] = useState(null);
  const [emailIsValid, setemailIsValid] = useState(null);
  const [telIsValid, settelIsValid] = useState(null);
  const [emailused, setused] = useState(null);
  const [pictureIsValid, setpictureIsValid] = useState(null);
  const [newpassword, setnewpassword] = useState({password:""});
  const [oldpassword, setoldpassword] = useState('');
  const [passwordvalide, setvalidepassword] = useState(null);
  const [oldpasswordvalide, setoldpasswordvalide] = useState(null);

    var [User, setuser] = useState([]);
    const [CurrentUser,setCurrentUser]=useState({Nom:"",Prenom:"",Email:"",phone:"",url:""});
    const copy= ()=>{
       setCurrentUser({...CurrentUser,Nom:User.nom,Prenom:User.prenom,Email:User.email,phone:User.phone,url:User.url,})
       console.log(CurrentUser);
  }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

var id=getCookie('user_id');
const change=()=>{

    var aa=document.getElementById('hhh');
    aa.classList.add("focus");

}
const change2=()=>{

    var aa=document.getElementById('hhh2');
    aa.classList.add("focus");

}
const annuler=()=>{

    var aa=document.getElementById('hhh');
    aa.classList.remove("focus");

}
const annuler2=()=>{

    var aa=document.getElementById('hhh2');
    aa.classList.remove("focus");

}
const testing=()=>{
  if ((Checknom(CurrentUser.Nom)===false)||(CurrentUser.Nom==='')){
      setnameIsValid(false);
      name=false;
  
  }
  else{
      setnameIsValid(true);
      name=true;
  
  }
  if ((Checknom(CurrentUser.Prenom)===false)||(CurrentUser.Prenom==='')){
      setprenomIsValid(false);
      prenom=false;
  }else{
      setprenomIsValid(true);
      prenom=true;
  
  }
  if ((Checkemail(CurrentUser.Email)===false)||(CurrentUser.Email==='')){
      setemailIsValid(false);
      email=false;
  }
  else{
      setemailIsValid(true);
      email=true;
  
  }
  if ((CheckNumerotel(CurrentUser.phone)===false)||(CurrentUser.phone==='')){
      settelIsValid(false);
      tel=false;
  }
  else
  {
      settelIsValid(true);
  tel=true;
  }
  
  }



  function getExt(filename)
  {
      var ext = filename.split('.').pop();
      if(ext == filename) return "";
      return ext;
  }

const send=(e)=>{
e.preventDefault();
testing();
if((name)&&(prenom)&&(email)&&(tel)){


   fetch('http://localhost:4000/setdata', {
     method: 'POST',
     body: JSON.stringify({
        id: User.id,
        nom: CurrentUser.Nom,
        prenom: CurrentUser.Prenom,
        email: CurrentUser.Email,
        phone: CurrentUser.phone,
        email2: User.email,
       

     }),
     headers: {
       "Content-Type":"application/json"
     },
  })
.then((result) => {
 if (result.status != 200) {
  console.log('not changed');
  setused(true);

}
 else{

  

  setused(false);



  get();
console.log('changed');
document.getElementById('close').click();

}});}}
    
    
        const get=async() =>{
           await fetch('http://localhost:4000/getbyid', {
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
    
    var username=User.nom+' '+User.prenom;
        console.log(User);
    
      const checkimage=()=>{

        if((CurrentUser.photo=='')){
          setpictureIsValid(false);
          picturevalide=false;
      }
      else{
          let fileExtension = CurrentUser.photo.name.split(".").pop();
      
       if ((fileExtension.toUpperCase()==='JPG')||(fileExtension.toUpperCase()==='JPEG')||(fileExtension.toUpperCase()==='PNG')||(fileExtension.toUpperCase()==='GIF')){
          setpictureIsValid(true);
          picturevalide=true;
      
      }
      else{
          setpictureIsValid(false);
          picturevalide=false;
      
      }

      }}
const updatepicture=(e)=>{
e.preventDefault();
checkimage();
if(picturevalide){

var formData = new FormData();
formData.append('file', CurrentUser.photo);
console.log(User);
fetch(`http://localhost:4000/updateImage/${User.id}`, {
method: 'POST',
body: formData,
}).then(async(result)=>{
   get();
  console.log('changed');
  console.log(result);
  document.getElementById('close2').click();

}).then(()=>{
  get();

  window.location.reload();
  
})
}

}
var valide_password;
var valide_oldpassword;
const testpassword=()=>{
  if ((Checkpassword(newpassword.password)===false)||(newpassword.password==='')){
    setvalidepassword(false);
    valide_password=false;
}
else{
  setvalidepassword(true);
  valide_password=true;
}



}


const changepassword=async(e)=>{
  e.preventDefault();
  if(oldpassword==''){
    setoldpasswordvalide(false);
    valide_oldpassword=false;
  }
  else{

    valide_oldpassword=true;
    setoldpasswordvalide(true);
  
  }
   testpassword();
  

if((valide_oldpassword)){
  bcrypt.compare(oldpassword,User.password, function(err, result) {
        if (result) {
      setoldpasswordvalide(true);
      valide_oldpassword=true;

if(valide_password){
console.log('badel ya bro') ;
 fetch('http://localhost:4000/setnewpassword', {
    method: 'POST',
    body: JSON.stringify({
       email:User.email,
       password: newpassword.password,
    }),
    headers: {
      "Content-Type":"application/json"
    },
    
 })
.then((result) => {
if (result.status != 200) {
    console.log("error");
}
else{
  document.getElementById('changed').click();
  var close=document.getElementById('closing');
  setTimeout(() => {
  close.click();
  }, "1200");
  setTimeout(() => {
    history('/');
  }, "1400");
};
})
 }


    }
  else{
    valide_oldpassword=false;

    setoldpasswordvalide(false);
  
  }});

}}

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

useEffect(()=>{
  get();
},[]);

const show_password=()=>{
        
  const password1=document.getElementById('pass');
  const password2=document.getElementById('pp');
   if(password1.type==="text"){
      password1.type="password";
      password2.type="password";
   }
   else{
      password1.type="text";
      password2.type="text";
  
   }
  }
  return (
    <div>
<NavBar username={`${User.nom && User.prenom ? User.nom + " " + User.prenom : "Loading"}`} url={User.url} id={User.id} />
      {(User.length!==0)?
      <div><div className="d-flex justify-content-center pt-2 mt-5">
                 <div className="card w-50 ">
                 <h1 className="page-title mt-2"><RiFolderUserFill className='position-relative' style={{bottom:'5px'}}/>Account</h1>
                 <div className='d-flex justify-content-center'>
                 <div className="settings-section">
                  <div className="d-flex justify-content-center">
      <h2 className="settings-title text-nowrap"><AiFillInfoCircle className='position-relative me-1' style={{bottom:'2px'}} />General Information</h2></div>
<div className='titles' style={{fontSize:'20px'}}>
<div className="d-flex justify-content-center">
Nom : {User.nom} </div>

<div className="d-flex justify-content-center mt-2">


Prenom : {User.prenom}

</div>
<div className="d-flex justify-content-center mt-2">

Email : {User.email}
</div>
<div className="d-flex justify-content-center mt-2">

N°Tel : {User.phone}
</div>
</div>
<div className="d-flex justify-content-center mt-2">

<a onClick={copy} className="text-primary" style={{cursor: 'pointer'}}data-bs-toggle="modal" data-bs-target="#exampleModal1"  ><MdModeEdit className='position-relative ' style={{bottom:'2px'}}/>Edit</a>
      </div>
      </div>
      </div>
      <div className='d-flex justify-content-center'>

      <div className="settings-section">
      <div className='d-flex justify-content-center mt-2'>

  <h2 className="settings-title text-nowrap "><ImFilePicture className='position-relative me-1' style={{bottom:'4px'}}/>My picture</h2></div>
  <div className="d-flex justify-content-center mt-5 ms-3  ">
     <div className="hovering" id="hovering"  data-bs-toggle="modal" data-bs-target="#exampleModal4"   >
<div className="  ">     {(User.url==="vide")?<FaRegUserCircle   alt="" style={{width:'200px',height:'200px',borderRadius:'100px'}}/>
:<img src={`http://localhost:4000/images/${User.id}/picture.jpeg`}  alt="" style={{width:'200px',height:'200px',borderRadius:'100px'}} />}

<div className='d-flex justify-content-center '>
  <div  className=' text-dark position-relative ms-2 text2  ' style={{bottom:'135px',fontSize:'20px'}} > Change your <br/>profile picture</div></div></div></div> 
</div>

      <div className="modal fade" onClick={copy} id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <input type="file" style={{fontSize:'14px'}}  onChange={(e) => {setCurrentUser({ ...CurrentUser, photo: e.target.files[0] });}} className="form-control " id='picture' accept="image/png, image/gif, image/jpeg"  />
            {(pictureIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger h-6 text-nowrap text">Invalide picture extension(jpg,jpeg,png)</div>:""}

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
    <div className='d-flex justify-content-center'>

    <div className="settings-section">
    <div className='d-flex justify-content-center mt-2 mb-2'>

  <h2 className="settings-title text-nowrap"><HiLockClosed  className='position-relative me-1' style={{bottom:'2px'}}/>Password</h2></div>
  <div class="form-group ">
  <div className="d-flex justify-content-center">

      <div class="input-group w-75 " id="hhh2">

        <input name="currentPassword" onFocus={change2} onBlur={annuler2} onChange={(e)=>{setoldpassword(e.target.value)}} placeholder="Old Password" id='pp' type="password" class="form-control inputs " autocomplete="Old Password"  />
        <span class="focus-input"></span>
        </div>

      </div>
      {(oldpasswordvalide===false)?<div style={{marginTop:'6px'}} className="text-danger h6 d-flex justify-content-center text text-nowrap">Invalide old Password</div>:""}

    </div>
    <div class="form-group mt-3">
    <div className="d-flex justify-content-center">

      <div class="input-group w-75 " id="hhh">
        <input id="pass" onFocus={change} onBlur={annuler} name="password" onChange={(e)=>{setnewpassword({password:e.target.value});}} placeholder="New Password" type="password" class="form-control inputs" autocomplete="New Password"/>
        <span class="focus-input"></span>
      </div>
      </div>
      {(passwordvalide===false)?<div style={{marginTop:'6px'}} className="text-danger h6 ms-2 d-flex justify-content-center text-center text-nowrap">Invalide Password(must contain minumum<br/> 8 caractere  1 chiffre,1 Uppercase,1 lowercase!)</div>:""}

    </div>
    <div className="ms-4 d-flex justify-content-center mt-3 col-5 ps-4 ">
<input type="checkbox" onChange={show_password} className='me-1' style={{width:'17px'}}/>  <label style={{fontSize:'17px'}}>Show password</label>            
     </div>
   <div class="form-submit right mt-3">
    <div className="d-flex justify-content-center mt-2 pt-2">
     <button class="btn-22 text-nowrap "    onClick={(e)=>changepassword(e)} >Change Password</button>
     <button class="d-none" id='changed'   data-bs-toggle="modal" data-bs-target="#staticBackdrop" >change</button></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div className='d-flex justify-content-center'>
        <div class="modal-title text-center  "  style={{fontSize:'22px'}} id="exampleModalLabel">Update Your Profile</div></div>
      </div>
      <div class="modal-body">
        <form autoComplete='off' required>
          <div class="mb-1">
            <label for="recipient-name" class="h5">Nom :</label>
            <input  style={{fontSize:'17px'}} type="text" value={CurrentUser.Nom} onChange={(e)=>{setCurrentUser({ ...CurrentUser,Nom:e.target.value});}} placeholder="Entrer Votre Nom" class="form-control" id="name" />
          </div>
          {(nameIsValid===false)?<div  className="text-danger text-center h6 text-nowrap text position-relative ">Invalide nom</div>:""}

          <div class="mb-1 pt-3">
            <label for="recipient-name" class="h5">Prenom:</label>
            <input  style={{fontSize:'17px'}} type="text" value={CurrentUser.Prenom} onChange={(e)=>{setCurrentUser({ ...CurrentUser,Prenom:e.target.value});}} placeholder="Entrer Votre Prenom" class="form-control" id="prénom" />
          </div>
          {(prenomIsValid===false)?<div  className="text-danger  text-nowrap text-center position-relative h6 ">Invalide prenom</div>:""}

          <div class="mb-1 pt-3">
            <label for="recipient-name" class="h5">Email :</label>
            <input style={{fontSize:'17px'}} value={CurrentUser.Email}onChange={(e)=>{setCurrentUser({ ...CurrentUser,Email:e.target.value});}} placeholder="Entrer Votre Email" class="form-control" id="email" />
         </div>
         {(emailIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger text-center position-relative  h6 text-nowrap text">Invalide E-mail</div>:""}
         {(emailused===true)?<div style={{marginTop:'6px'}} className="text-danger text-center position-relative h6 text-nowrap text">this E-mail is already used!!!</div>:""}

        
          <div class="mb-1 pt-3">
            <label for="recipient-name" class="h5">Tel:</label>
            <input  style={{fontSize:'17px'}} value={CurrentUser.phone} onChange={(e)=>{setCurrentUser({ ...CurrentUser,phone:e.target.value});}} type="text" placeholder="Entrer  Votre N°Tel" class="form-control" id="tel" />
          </div>
          {(telIsValid===false)?<div style={{marginTop:'6px'}} className="text-danger text-center position-relative h6 text-nowrap text">Invalide N°Tel(must contain 8 chiffre!)</div>:""}

          
      

        
        </form>
      </div>
      <hr/>
      <div class="d-flex justify-content-center ms-3">

      <div class="mt-2 mb-4  ">
      <button type="button" class="btn-9  " style={{fontSize:'18px'}} onClick={(e)=>send(e)} >Valider</button>
        <button type="button" id='close' class="btn-10  ms-3" style={{fontSize:'18px'}} data-bs-dismiss="modal">Close</button>
      </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog mt-5  " style={{color:'white' }}>
    <div class="modal-content h-100">
      <div class="modal-header bg-success  d-flex justify-content-center" style={{fontSize:"18px",fontWeight:"bold"}}>
      <AiFillCheckCircle className='me-1'/><span>Password changed successfully!</span>
      <button type="button" id='closing' class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>

      </div>
    </div>
  </div>
</div> 



    </div> :<>
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
<br/>
<br/>
<br/>
</div>
                 
  )
}

export default Account
