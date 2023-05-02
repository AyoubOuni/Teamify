import React,{useState,useEffect,useRef} from 'react'
import {GiHearts} from 'react-icons/gi'
import {FaRegUserCircle} from 'react-icons/fa'
import {AiFillLike,AiFillDislike} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import './HomeUser.css'
import moment from 'moment';


function PostCard(props) {  
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
  //fonction get user by id
  const get=async() =>{
  await   fetch('http://localhost:4000/getbyid', {
     method: 'POST',
     body: JSON.stringify({
         id:props.photo,
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
 
    const [likes, setLikes] = useState(props.like);
  const [hearts, setHearts] = useState(props.heart);
  const [dislikes, setDislikes] = useState(props.dislike);
  const [selectedButton, setSelectedButton] = useState(props.selected);
 
  const change = (status,e) => {
    fetch(`http://localhost:4003/posts/setreaction/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id_users: {id:id,reaction:e},
         reaction: e
 
      }),
      headers: {
        "Content-Type":"application/json"
      },
   })
 .then((result) => {
console.log(result.status)
 
 })
 


 if(selectedButton === null ){
}



    if (status === 'react1' && selectedButton !== 'react1') {
      setHearts((prev) => prev + 1);
      if (selectedButton === 'react2') {
        setLikes((prev) => prev - 1);
      } else if (selectedButton === 'react3') {
        setDislikes((prev) => prev - 1);
      }
      setSelectedButton('react1');
    } else if (status === 'react2' && selectedButton !== 'react2') {
      setLikes((prev) => prev + 1);
      if (selectedButton === 'react1') {
        setHearts((prev) => prev - 1);
      } else if (selectedButton === 'react3') {
        setDislikes((prev) => prev - 1);
      }
      setSelectedButton('react2');
    } else if (status === 'react3' && selectedButton !== 'react3') {
      setDislikes((prev) => prev + 1);
      if (selectedButton === 'react1') {
        setHearts((prev) => prev - 1);
      } else if (selectedButton === 'react2') {
        setLikes((prev) => prev - 1);
      }
      setSelectedButton('react3');
    } else {
      // User clicked on a reaction that is already selected, so cancel the reaction
      setHearts((prev) => prev - (selectedButton === 'react1' ? 1 : 0));
      setLikes((prev) => prev - (selectedButton === 'react2' ? 1 : 0));
      setDislikes((prev) => prev - (selectedButton === 'react3' ? 1 : 0));
      setSelectedButton(null);
      console.log('nu')

    }
  };





  
  

  return (
      <div className="card hy w-50 bg-card">
        
        <div className="d-flex justify-content-end  ms-2 ps-1" style={{marginTop:'22px'}}>
 
  

  <>
 

</>
  
  </div>
  <div className="position-relative" style={{bottom:'10px'}}>
<div className="d-flex justify-content-start  ms-4 ps-1 ">
{(user.url==="vide")?<FaRegUserCircle  size={48}   className='ms-1 position-relative text-dark d-inline'  />:

user.url &&
<img src={`http://localhost:4000/images/${user.id}/picture.jpeg`} alt="company" width="50" height="50" className='rounded-5'/>}<span className='h5 position-relative ms-2' style={{top:'14px'}}>{props.nom}</span>
</div>
<div className="d-flex justify-content-start position-relative  ms-4 ps-1 " style={{bottom:'48px'}}>
{(user.url==="vide")?<span className=' position-relative text-primary fw-bold text3' style={{right:'-64px'}} >{moment(props.duree).fromNow()}</span>:<span className=' position-relative text-primary fw-bold text3' style={{right:'-60px'}} >{moment(props.duree).fromNow()}</span>}

</div>
<div className="d-flex justify-content-start mt-2 pb-3  ms-5 ps-4 ">

<div className="d-flex justify-content-start text-wrap text-break ms-3 pe-5" style={{fontFamily:'Poppins',fontSize:'18px'}}>

{props.content}</div>

</div>
<div className="d-flex justify-content-start mt-4  ms-5 ps-4 position-relative" style={{left:'16px'}}>
<span className={`border2 ${selectedButton === 'react1' ? 'reacted' : ''}`} id="react1">
          <GiHearts
            style={{ cursor: 'pointer' }}
            className="text-white pb-1"
            onClick={() => {
              change('react1','heart');
            }}
            size={23}
          />
        </span>
        <span className={`border3 ms-3 ${selectedButton === 'react2' ? 'reacted' : ''}`} id="react2">
          <AiFillLike
            style={{ cursor: 'pointer' }}
            onClick={() => {
              change('react2','like');
            }}
            className="text-white pb-1"
            size={23}
          />
        </span>
        <span className={`border4 ms-3 ${selectedButton === 'react3' ? 'reacted' : ''}`} id="react3">
          <AiFillDislike
            style={{ cursor: 'pointer' }}
            onClick={() => {
              change('react3','dislike');
            }}
            className="text-white pb-1"
            size={23}
          />
        </span>



</div>
<div className="d-flex justify-content-start  pt-1 ms-5 ps-4 ">
    <span className="col-1 ps-2 h6 d-flex justify-content-center text-center">
{hearts}</span>
    <span className="col-1 d-flex justify-content-center text-center h6 position-relative pe-1 ps-1" >
{likes}</span>
    <span className="col-1 d-flex justify-content-center text-center h6 position-relative pe-3 ps-1">
{dislikes}</span>
    
</div>
</div>
</div>
  )
}

export default PostCard
