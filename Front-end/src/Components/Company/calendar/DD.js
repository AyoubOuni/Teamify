
import React,{useState,useEffect, useLayoutEffect} from 'react'
import './calendar.css'
import { Link } from 'react-router-dom'

import teamify from './../../../Assets/images/Teamify.png'
import s from './../../../Assets/images/s.png'

import {AiFillSetting} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
import {IoArrowBackCircleSharp} from 'react-icons/io5'
import { NavLink,useNavigate} from 'react-router-dom'
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';

import {RxDimensions,} from 'react-icons/rx'
import {RiTeamFill,RiQuestionnaireFill} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import {GiLightBulb} from 'react-icons/gi'
import {GiDuration} from 'react-icons/gi'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import stadium from './../../../Assets/images/stadiumlogo.png'
import elipse1 from './../../../Assets/images/elispe1.png'
import elipse2 from './../../../Assets/images/elipse2.png'
import elipse3 from './../../../Assets/images/elipse3.png'
import 'react-calendar/dist/Calendar.css';
import jsPDF from 'jspdf';
import axios from 'axios';

function DD() {  
  let { uid } = useParams();
  let { id } = useParams();
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
        setStadium(rep[0]);})
   
  }, []);
  const [user, setuser] = useState([]);
  const [Stadium, setStadium] = useState([]);

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
    const deconnect=()=>{
        deleteAllCookies();
                history('/login');
      }
        const [calender, setcalender] = useState([]);
        const [data, setdata] = useState([]);
        const [ti, sett] = useState([]);
        const [my, setmy] = useState([]);
        const [time, settime] = useState('');
        const [endtime, setendtime] = useState('');

        useEffect(()=>{ 
          get();
          geti();
          get2();
          get33();
          get22();

        },[])
        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
        }
        var id_user=getCookie('user_id')
       
        const get22=async() =>{
        await   fetch('http://localhost:4002/stadium/getbyitsid', {
           method: 'POST',
           body: JSON.stringify({
               id:uid,
            }),
            headers: {
              "Content-Type":"application/json"
            },
            
          
        })
        .  then(function(response){
           return response.json();
         })
         .then(function(myJson) {
          console.log(myJson[0].times);
          sett(myJson[0].times);
          setdata(myJson[0]);
          
         });}



        const get2=async() =>{
        await   fetch('http://localhost:4002/reservation/getbystadium', {
           method: 'POST',
           body: JSON.stringify({
               id:uid,
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
          setcalender(myJson);
          
         });}
        const get20=async() =>{
        await   fetch('http://localhost:4002/reservation/getbystadium', {
           method: 'POST',
           body: JSON.stringify({
               id:uid,
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
          setcalender(myJson);
          
         });}
useLayoutEffect(()=>{
get33();


},[])
        const get33=() =>{

         
           fetch('http://localhost:4002/reservation/getbyuserandstade', {
           method: 'POST',
           body: JSON.stringify({
               id:id_user,
               id_stadium:uid
            }),
            headers: {
              "Content-Type":"application/json"
            },
            
          
        })
        .  then(function(response){
           return response.json();
         })
         .then( function(myJson) {
          // console.log(myJson[0]);
          setmy(myJson);
         });
        
        }
        function getMonthName(monthNumber) {
                const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                return monthNames[Number(monthNumber) - 1];
              }
              function convertTime(time) {
                let hours = 0;
                let minutes = 0;
                if (time === '24:00') {
                  hours = 0;
                  minutes = 0;
                } else {
                  const parts = time.split(":");
                  hours = parseInt(parts[0]);
                  minutes = parseInt(parts[1]);
                }
                const totalMinutes = hours * 60 + minutes;
                const newTotalMinutes = totalMinutes + 90; // adding 90 minutes
                let newHours = Math.floor(newTotalMinutes / 60);
                let newMinutes = newTotalMinutes % 60;
                if (newHours >= 24) {
                  newHours = 0;
                }
                const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
                return newTime;
              }
              
        const reserve=async(t) =>{
      
        settime(t);
        setendtime(convertTime(t));
        let parts = selectedDate.split("/");
 setselected (parts[0] + " " + getMonthName(parts[1]) + " " + parts[2])
        }
        
console.log(calender)
function compareTime(time1, time2) {
        const [hours1, minutes1] = time1.split(':').map(Number);
        const [hours2, minutes2] = time2.split(':').map(Number);
      
        if (hours1 > hours2) {
          return 1;
        } else if (hours1 < hours2) {
          return -1;
        } else {
          if (minutes1 > minutes2) {
            return 1;
          } else if (minutes1 < minutes2) {
            return -1;
          } else {
            return 0;
          }
        }
      }
      var f=[]
const [numero,setnumero]=useState('');
const giveme =async (a,b) => {
        
    f=await calender.filter((e)=>{return e.hour==a && e.date==b})
   await setnumero(f[0].id)
document.getElementById('rrr').click();
    };
      const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        let formattedHour = parseInt(hour, 10);
        if (formattedHour === 24) {
          formattedHour = 0;
        }
        return `${formattedHour.toString().padStart(2, '0')}:${minute}`;
      };
      const [user_name, setusername] = useState('');

 
      const checkTimes = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
     const t=formatTime(timeString);
     console.log(t);
        return ti.map((timeObj) => {
          const { times } = timeObj;
          return times.filter((time) => compareTime(time, t) === -1);
        });
      };
      
      var overs=checkTimes();
      console.log('over');
      console.log(overs);
      console.log('over');
      console.log(overs);

const generatePDF = async (id,a,b,c,d) => {
      // Create a new instance of jsPDF
  const doc = new jsPDF();
  doc.rect(10, 10, 189.6, 150);
  doc.setLineWidth(1);
  doc.stroke();
  
  // Add image to the PDF and center it at the top of the page
  doc.addImage(teamify,'JPEG', 81, 10, 50, 50);
  doc.line(61.5, 76, 156, 76);

  // Add content to the PDF
  const text = `                 Teamify
                          
               Reservation N° : ${id}
           company : ${a}
                        Stadium : ${b}
                        User : ${c}
                     User ID : ${d}
                              Time : ${time}
                          Date : ${selectedDate}`;
  
  const x = 53;
  let y = 30 + 38 ; // Set y-coordinate below image

  // Split the text into an array of strings that fit within a specified width
  const textLines = doc.splitTextToSize(text, 180);

  // Add each line of text to the PDF
  textLines.forEach(line => {
        if (line.includes("Teamify")) { // Check if line contains "Teamify"
          doc.setFontSize(24); // Set font size for "Teamify"
        } else {
          doc.setFontSize(14); // Set font size for other text
        }
        doc.text(line, x, y);
        y += 10; // Increase the y-coordinate for the next line of text
      });
        // Save the PDF to a blob
        const pdfBlob = await doc.output('blob');
        
        // Create a new FormData object
        const formData = new FormData();
        
        // Append the PDF blob to the FormData object
        formData.append('pdf', pdfBlob, 'id.pdf');
        formData.append('id', id);
        
        // Send the FormData object to the server using Axios
        const response = await axios.post('http://localhost:4002/reservation/api/save-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Handle the response from the server
        console.log(response.data);
      }
      

      

      let history = useNavigate();
      const [inweek, setinweek] = useState(getDayNumberInWeek(new Date()));
      const [selected, setselected] = useState('');
      const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("fr-FR"));
      const [today, settoday] = useState(new Date().toLocaleDateString("fr-FR"));

      const handleDateChange = date => {
        setSelectedDate(date.toLocaleDateString("fr-FR"));
        setinweek(getDayNumberInWeek(date));
      };
      console.log(inweek)
      function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();
        return dayOfWeek;
      }
      
      function getDayNumberInWeek(date) {
        const dayOfWeek = getDayOfWeek(date);
        return dayOfWeek + 1;
      }
      
      console.log('before')
      console.log(my)
      const sendreservation=async() =>{
        var id_reserv=Math.floor(Math.random() * (100000000000 - 1000000 + 1)) + 1000000;
        fetch('http://localhost:4002/reservation/add', {
                method: 'POST',
                body: JSON.stringify({
                  id:id_reserv ,
                  id_company: id,
                  id_stadium: uid,
                  name_stadium: data.name,
                  name_company: Stadium.name,
                  id_user: "0000",
                  name_user: user_name,
                  pdf:`pdf/${id_reserv}/${id_reserv}.pdf`,
                  date:selectedDate,
                  hour:time,
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
              })
                .then(async() => {
                        generatePDF(id_reserv,Stadium.name,data.name,user_name,"0000")
                   get2();
                   get33();
                })
                .catch(err => console.error(err));
            

}


 
const [activeNav,setActiveNav] = React.useState('/company/calendar')
const [company, setcompany] = useState([]);




function getCookie(name) {
const value = `; ${document.cookie}`;
const parts = value.split(`; ${name}=`);
if (parts.length === 2) return parts.pop().split(';').shift();
}
//fonction get user by id
const geti=async() =>{
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

function deleteAllCookies() {
const cookies = document.cookie.split(';');

for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i];
  const eqPos = cookie.indexOf('=');
  const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
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
    <div className=''>
    <div className='d-flex justify-content-start'>

    <div className="ms-5 mt-4 mb-1" style={{cursor:'pointer'}} onClick={()=>{history(`/company/calendar`)}}><IoArrowBackCircleSharp size={40} /></div>
    </div>
    <div className='d-flex justify-content-center pb-5'>

      <div className="card   bg-card pt-5" style={{width:'60%'}}>

        <div className='d-flex justify-content-center mb-3 h4 text-primary'>
        <u className="" style={{textUnderlineOffset:'6px'}}>        Stadium {data.name}
</u>


          </div>
        <div className='d-flex justify-content-center'>

        <div className=" d-flex justify-content-center mb-3"  style={{fontSize:'22px'}} id="exampleModalLabel">Calendar</div></div>
        <div className="modal-body">
        <div className='d-flex justify-content-center'>
        <Calendar  onChange={handleDateChange}  />

        </div>
        </div>
        <div className="modal-footer">
        <div className='d-flex justify-content-center my-3'>
<div className="h5">Times</div>
        </div>
        <div className='d-flex justify-content-center row'>
              
        {
  ti.filter((timeSlot) => timeSlot.id == inweek)
  .map((timeSlot) => {
    return timeSlot.times.map((time) => {
      const isReserved = calender.some((reservation) => {
        return (
          (overs.some((over) => over.includes(time)) && selectedDate === today) ||
          (reservation.date === selectedDate && reservation.hour === time)
        );
      });

     
  
      const className = isReserved || (overs.includes(time) && selectedDate === today) ? 'reserved2' : '';
      return (
        <div className="col-3">
         <>
          <div
            key={time}
            onClick={() =>{isReserved ?giveme(time,selectedDate):reserve(time)} }
            className={`h6 d-flex justify-content-center bordering   ${className}`}
            data-bs-toggle="modal"
            data-bs-target={isReserved ?"":"#exampleModal2"} 
          >
            {time}
          </div>
          <a href={`http://localhost:4002/reservation/api/pdf/${numero}.pdf`} id='rrr' className='d-none' target="_blank"></a>

          </>
          
        </div>
      );
    });
  })}   




        </div>
        <hr/>
        <div className='d-flex justify-content-center mt-3'>
<img src={elipse2} alt="elipse2" width="25" height="25"/><span className="h5 ms-2">Available</span>        
        <div className=' ms-3'>
<img src={elipse1} alt="elipse1" width="25" height="25" /> <span className="h5 ms-2">Unavailable</span>        </div>
   
        </div>
        </div>
       
       

        <div className="modal fade "  id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2 " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center "  style={{fontSize:'18px'}} id="exampleModalLabel"><span ><RiQuestionnaireFill size={35} className='position-relative' style={{bottom:'2px'}}/></span>
<span className="ms-2"> Are you sure to reserve Stadium {data.name}  on {selected} From {time} to {endtime} ?</span></div></div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center " >
            <button className='btn-15'  data-bs-toggle="modal" data-bs-target="#exampleModal20">Yes</button>
            <button className='btn-16 ms-2'  data-bs-toggle="modal" data-bs-target="#exampleModal1">No</button>
            
            </div></div>
        </div>
       

       
        </div>
        </div>
        </div>
<div className="modal fade "  id="exampleModal20" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2 " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
   <label htmlFor="" className='h6 text-nowrap mt-2 me-3'>Name of user :</label>
   <input type='text' className='form-control' onChange={(e)=>{setusername(e.target.value)}} />
   </div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center " >
            <button className='btn-15'  data-bs-toggle="modal" onClick={sendreservation} data-bs-target="#exampleModal1">Yes</button>
            <button className='btn-16 ms-2'  data-bs-toggle="modal" data-bs-target="#exampleModal1">No</button>
            
            </div></div>
        </div>
       

       
        </div>
        </div>
        </div>

</div>
</div>
</div>
</div>
</div>

</>
  )
}

export default DD
