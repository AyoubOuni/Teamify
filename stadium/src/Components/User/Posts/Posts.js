import React, { useState,useEffect} from 'react';
import './Posts.css'
import {RiQuestionnaireFill} from 'react-icons/ri'



import NavBar from '../NavBar/NavBar'
import PostCard from './../Home/PostCard';

function getSelectedReaction(id, id_users) {
  for (const user of id_users) {
    if (user.id === id) {
      return user.reaction;
    }
  }
  return null;
}

function Posts() {
   
    


  const [selectedButton, setSelectedButton] = useState(null);
  const [user, setuser] = useState([]);

useEffect(()=>{
  get()
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
   setuser(myJson[0]);
 });


}
console.log(user)
const [status, setstatus] = useState('');

const [posts, setposts] = useState([]);
const [reaction, setreaction] = useState([]);
const [contents, setcontents] = useState('');
const [id_post, setidpost] = useState('');
const [user_id, setuserid] = useState('');



useEffect(()=>{
  fetch('http://localhost:4003/posts/getreaction')
  .then(response => response.json())
  .then(response =>setreaction(response ?? []))
  .catch(err => console.error(err));
}, [])

useEffect(()=>{
  fetch('http://localhost:4003/posts/getbyuser',{ method: 'POST',
  body: JSON.stringify({

    id_user: id
    
  }),
  headers: {
    'Content-Type': 'application/json'
  },
})
  .then(response => {
      setstatus(response.status);
      return response.json();
  })
  .then(response =>setposts(response ?? []))
  .catch(err => console.error(err));
}, [])


console.log(posts)
console.log(reaction)



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


const [postisvalide, setpostIsValid] = useState(null);

var p
const testing=()=>{
  if (contents===''){
    setpostIsValid(false);
      p=false;
  
  }
  else{
      setpostIsValid(true);
      p=true;
  
  }}
const updatepost=async(e)=> {
e.preventDefault();
  testing();
  if((p)){
  await fetch('http://localhost:4003/posts/update2', {
    method: 'POST',
    body: JSON.stringify({
       id: id_post,        
       id_user: id,        
       content: contents,        
    }),
    headers: {
      "Content-Type":"application/json"
    },
 })
  .then(response => {
      setstatus(response.status);
      return response.json();
  })
  .then(response => setposts(response ?? [])).then(()=>{
    document.getElementById('close2').click();
  })
  .catch(err => console.error(err));
}
 
};


const handleKeyDown=(event)=>{
  if(event.keyCode === 13) { 
   updatepost(event)      }
}
const [todelete, settodlete] = useState('');

const deleting=async(iid) => {
  settodlete(iid);

     document.getElementById('hovering2').click();
}
const update=async(iid,contentt,id_us) => {
  setcontents(contentt);
  setidpost(iid);
  setuserid(id_us);
     document.getElementById('hovering').click();
}
const drop=(e) => {

  e.preventDefault();




    fetch('http://localhost:4003/posts/delete2', {
      method: 'POST',
      body: JSON.stringify({
         id: todelete,        
         id_user: id,        
      }),
      headers: {
        "Content-Type":"application/json"
      },
   })
   .then(response => {
    setstatus(response.status);
    return response.json();
  })
  .then(response =>setposts(response ?? [])).then(()=>{
    document.getElementById('closer').click();
  })
  .catch(err => console.error(err));
  }



  return (
    <div>
<NavBar username={`${user.nom && user.prenom ? user.nom + " " + user.prenom : "Loading"}`} url={user.url} id={user.id} />
      <button className="d-none" id="hovering2"  data-bs-toggle="modal" data-bs-target="#exampleModal2"   >d</button>

      <div className="modal fade "  id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2 " id='closer' data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center "  style={{fontSize:'18px'}} id="exampleModalLabel"><span ><RiQuestionnaireFill size={35} className='position-relative' style={{bottom:'2px'}}/></span>
<span className="ms-2"> Are you sure to delete this Post ?</span></div></div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center " >
            <button className='btn-15' onClick={(e)=>{drop(e)}} data-bs-toggle="modal" data-bs-target="#exampleModal1">Yes</button>
            <button className='btn-16 ms-2'  data-bs-toggle="modal" data-bs-target="#exampleModal1">No</button>
            
            </div></div>
        </div>
       

       
        </div>
        </div>
        </div>




        
      <button className="d-none" id="hovering"  data-bs-toggle="modal" data-bs-target="#exampleModal4"   >d</button>

      <div className="modal fade"  id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center'>
        <div className="modal-title text-center  "  style={{fontSize:'19px'}} id="exampleModalLabel">Update Your Post</div></div>
        </div>
        
        <div className="modal-body">
        <form autoComplete='off' required>
        <div className="mb-1">
            <label htmlFor="recipient-name" className="h6 ms-3">Post</label>
            <div className="d-flex justify-content-start">
            <input type="text" value={contents} onKeyDown={handleKeyDown}  onChange={(e)=>{setcontents(e.target.value)}}  className='input0 ps-3 position-relative'  />
            </div>
            {(postisvalide===false)?<div  className="text-danger text-center mt-3 h6 text-nowrap text position-relative ">Invalide Post</div>:""}

          </div>
          </form>
        </div>
        <hr/>
        <div className="d-flex justify-content-center">

<div className=" mb-3  ">
<button type="button" className="btn-9 " style={{fontSize:'16px'}} onClick={(e)=>{updatepost(e)}}  >Valid</button>
  <button type="button" className="btn-10 ms-2 " style={{fontSize:'16px'}} id='close2' data-bs-dismiss="modal">Close</button>
</div>
</div>
        </div>
        </div>
        </div>
    
    
      {(status=='500')?<div className='d-flex justify-content-center ms-1 mt-5 h4 pt-5'>There is no Post</div>:

(posts?.length !== 0)?[...posts].reverse().map((element,index)=>
reaction.map((el,inde)=>{
 const selectedReaction = getSelectedReaction(id, el.id_users);


if(el.id===element.id){
  



       return(selectedReaction  ? <>
{(element.id_user===id)?
 <> <div className="dropdown position-relative yy22"  style={{top:'3px',right:'16px'}}>
   <button class=" dropbtn"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
...
 </button>
 <ul className="dropdown-menu dropdown-menu-lg-end" style={{height:'98px'}} aria-labelledby="dropdownMenuButton1">
  <a className="dropdown-item drop  elem goodtext  position-relative"  onClick={()=>{update(element.id,element.content,element.id_user)}}  style={{cursor: 'pointer',bottom:'8px',height:'50px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'16px'}} ><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Update</span></span></a>
  <hr className="position-relative" style={{bottom:'24px'}}/>
  <a className="dropdown-item drop h6 elem goodtext  position-relative" onClick={()=>{deleting(element.id)}}  style={{cursor: 'pointer',bottom:'40px',height:'46px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'14px'}} ><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Delete</span></span></a>

</ul>
</div>

 

</>:""}      <div key={el.id} className={`d-flex justify-content-center   `}>  <PostCard nom={element.author} key={index} id_user={element.id_user}  photo={element.id_user} duree={element.date} 
       content={element.content}
       url={element.url}
       selectedButton={selectedButton}
       heart={el.reaction.heart}
       like={el.reaction.like}
       dislike={el.reaction.dislike}
       id={element.id}
     selected={(selectedReaction=='heart')?'react1':(selectedReaction=='like')?'react2':(selectedReaction=='dislike')?'react3':''}
       setSelectedButton={setSelectedButton}
      />
     </div></>:
     
     
    <> {(element.id_user===id)?
 <> <div className="dropdown position-relative yy22"  style={{top:'3px',right:'16px'}}>
   <button class=" dropbtn" type="button"   data-bs-toggle="dropdown" aria-expanded="false">
...
 </button>
 <ul className="dropdown-menu dropdown-menu-lg-end" style={{height:'98px'}} aria-labelledby="dropdownMenuButton1">
  <a className="dropdown-item drop  elem goodtext  position-relative"  onClick={()=>{update(element.id,element.content,element.id_user)}}  style={{cursor: 'pointer',bottom:'8px',height:'50px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'16px'}} ><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Update</span></span></a>
  <hr className="position-relative" style={{bottom:'24px'}}/>
  <a className="dropdown-item drop h6 elem goodtext  position-relative" onClick={()=>{deleting(element.id)}} style={{cursor: 'pointer',bottom:'40px',height:'46px'}} ><span className='position-relative' style={{cursor: 'pointer',top:'7px',right:'14px'}} ><span className=" h6 position-relative" style={{top:'1.5px',left:'5px'}}>Delete</span></span></a>

</ul>
</div>

 

</>:""}      <div key={el.id}  className={`d-flex justify-content-center  `}>

       <PostCard key={index} nom={element.author} id_user={element.id_user}  photo={element.id_user} duree={element.date} 
       content={element.content}
       url={element.url}
       selectedButton={selectedButton}
       heart={el.reaction.heart}
       like={el.reaction.like}
       dislike={el.reaction.dislike}
       id={element.id}
     selected={null}
       setSelectedButton={setSelectedButton}
      />
     </div></>)
}






}

)


  
     
     )
     
     
     
 

:<>
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
</div>


  )
}

export default Posts
