import React,{useState,useEffect} from 'react'
import './Forgetpassword.css'
import {BsEmojiWink} from 'react-icons/bs'
import {HiLockClosed} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {Checkpassword} from './CheckData';
  import { useSelector } from 'react-redux';

function Setnewpassword() {
    const [champvide,setchampvide]=useState(false);
    const [erreur,seterreur]=useState(false);
    const [passwordvalide,setpasswordvalide]=useState(true);
    const user=useSelector(state => state.user);
 
        let history = useNavigate();
  var [password, setpassword] = useState({pass1: "",pass2:""});
const retourne=()=>{
    history("/login" );
  }

 useEffect(()=>{

  window.onpopstate =async function(event) {
    history("/login");

};

 },[]) 

  

 var passwordtrue;
  const test=()=>{

    if ((password.pass1==="")||(password.pass2==="")){
      setchampvide(true);
    }
   else{
setchampvide(false);
    }
  
  }
  const testing=()=>{

   
    if ((Checkpassword(password.pass1)===false)){
     
      setpasswordvalide(false);
        passwordtrue=false;
      
    }
    else{
      if(password.pass1===password.pass2){
      setpasswordvalide(true);
      passwordtrue=true;
    }
    else{
      setpasswordvalide(false);
      passwordtrue=false;
    }
  
  
  }
  }
  console.log(user[0])
  const envoyer=async(e)=>{
    e.preventDefault();
    var t=120;
    document.cookie = `time=${t}`;
     testing();
     test();

    if(passwordtrue){
   fetch('http://localhost:4000/setnewpassword', {
    method: 'POST',
    body: JSON.stringify({
       email:user[0],
       password: password.pass1,
    }),
    headers: {
      "Content-Type":"application/json"
    },
    
 })
.then((result) => {
if (result.status != 200) {
  seterreur(true);
    console.log("error");
}
else{
   
history('/login');
};
})
 }}
 const show_password=()=>{
        
  const password1=document.getElementById('pass1');
  const password2=document.getElementById('pass2');
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

<div className="container">
	<div className="d-flex justify-content-center pt-5">
            <div className="card width-small">

                <div className="text-center card-body">
                  <BsEmojiWink size={40} />
                  <div className="text-center title" >Set a new password</div>
<br/>                 
    
    
                      <div className="form-group">
                        <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><HiLockClosed /></span>
                          <input id="pass1" name="pass1" placeholder="Set new Password"  onChange={(e) => { setpassword({ ...password, pass1: e.target.value });}} className="form-control"  type="password" />
                          </div>
                         <br/>
                         <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><HiLockClosed /></span>
                        <input id="pass2" name="pass1" placeholder="Confirm the new Password"  onChange={(e) => { setpassword({ ...password, pass2: e.target.value });}} className="form-control"  type="password" />
                          </div>

                        {((!champvide)&&(passwordvalide===false))?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">Put a valide password</div>:""}
                        {(champvide===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">Please enter new password</div>:""}
                        {(erreur===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger   text-nowrap">The Time is Over !!!</div>:""}

                      </div>
                      <div className="pe-3 d-flex justify-content-center mt-3 col-6   ">
<input type="checkbox" onChange={show_password} className='me-1' style={{width:'17px'}}/>  <label style={{fontSize:'17px'}}>Show password</label>            
     </div>
                      <br/>
                      <div className='d-flex justify-content-end mt-3'>
                        <button  className="btn-20   me-2"  onClick={retourne} >Annuler</button>
                        <button  className="btn-21  text-nowrap" onClick={envoyer} >Valide</button>
                      </div>
    
                </div>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
	</div>


    
  )
}

export default Setnewpassword
