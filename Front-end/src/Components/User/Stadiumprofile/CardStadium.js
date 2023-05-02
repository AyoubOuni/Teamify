
import React,{useState,useEffect} from 'react'
import './Stadiumprofile.css'
import Calendar from 'react-calendar';
import {RxDimensions,} from 'react-icons/rx'
import {RiTeamFill,RiQuestionnaireFill} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import {GiLightBulb} from 'react-icons/gi'
import {GiDuration} from 'react-icons/gi'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {IoCalendarOutline} from 'react-icons/io5'
import {useNavigate} from 'react-router-dom'
import stadium from './../../../Assets/images/stadiumlogo.png'
import elipse1 from './../../../Assets/images/elispe1.png'
import elipse2 from './../../../Assets/images/elipse2.png'
import elipse3 from './../../../Assets/images/elipse3.png'
import teamify from './../../../Assets/images/Teamify.png'
import 'react-calendar/dist/Calendar.css';
import jsPDF from 'jspdf';
import axios from 'axios';

function CardStadium(props) {  

        const [calender, setcalender] = useState([]);
        const [my, setmy] = useState([]);
        const [time, settime] = useState('');
        const [endtime, setendtime] = useState('');

        useEffect(()=>{ 
          get2();

        },[])
          
       
        const get2=async() =>{
        await   fetch('http://localhost:4002/reservation/getbystadium', {
           method: 'POST',
           body: JSON.stringify({
               id:props.id,
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

        const get3=async(a) =>{

          await fetch('http://localhost:4002/reservation/getbystadium', {
           method: 'POST',
           body: JSON.stringify({
               id:a,
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
          
         });
        await   fetch('http://localhost:4002/reservation/getbyuserandstade', {
           method: 'POST',
           body: JSON.stringify({
               id:props.id_user,
               id_stadium:props.id
            }),
            headers: {
              "Content-Type":"application/json"
            },
            
          
        })
        .  then(function(response){
           return response.json();
         })
         .then(async function(myJson) {
          // console.log(myJson[0]);
         await setmy(myJson);
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
        const sendreservation=async() =>{
                var id_reserv=Math.floor(Math.random() * (100000000000 - 1000000 + 1)) + 1000000;
                fetch('http://localhost:4002/reservation/add', {
                        method: 'POST',
                        body: JSON.stringify({
                          id:id_reserv ,
                          id_company: props.id_company,
                          id_stadium: props.id,
                          name_stadium: props.nom,
                          name_company: props.company,
                          id_user: props.id_user,
                          name_user: props.user_name,
                          pdf:`pdf/${id_reserv}/${id_reserv}.pdf`,
                          date:selectedDate,
                          hour:time,
                        }),
                        headers: {
                          'Content-Type': 'application/json'
                        },
                      })
                        .then(async() => {
                                generatePDF(id_reserv,props.company,props.nom,props.user_name,props.id_user)
                           get2();
                           get3();
                        })
                        .catch(err => console.error(err));
                    
      
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
        
      f=await my.filter((e)=>{return e.hour==a && e.date==b})
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
      const checkTimes = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
     const t=formatTime(timeString);
     console.log(t);
        return props.times.map((timeObj) => {
          const { times } = timeObj;
          return times.filter((time) => compareTime(time, t) === -1);
        });
      };
      
      var overs=checkTimes();
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
  return (
      <div className="card  mt-5 bg-card pt-5" style={{width:'93%'}}>
<div className="d-flex justify-content-center   ">
 

<span className='h5 pt-4'>{props.nom}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<img src={stadium} alt="company" width="360" height="200" className=''/></div>
<div className="d-flex justify-content-center mt-3  ">

<RxDimensions size={26} /><span className="ms-1 h6 mt-1  ">Dimension : {props.dimension} m</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiTeamFill size={24} className='' /><span className="ms-1 h6 mt-1  ">Number of players per team : {props.number} </span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<MdFilterAlt size={26} /><span className="ms-1 h6 mt-1  ">Generation of synthetic turf : {props.generation}{(props.generation==1)?'st':(props.generation==2)?'nd':(props.generation==3)?'rd':'th'} generation</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiLightBulb size={24} /><span className="ms-1 h6 mt-1  ">Led lighting : {(props.led)?'YES':'NO'}</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<RiMoneyDollarCircleFill style={{position:'relative',top:'3px'}} size={24} /><span className="ms-1 h6 mt-1  ">Price : {props.price} DT</span>
</div>
<div className="d-flex justify-content-center mt-3  ">

<GiDuration size={24} style={{position:'relative',top:'3px'}} /><span className="ms-1 h6 mt-1  ">Duration : {props.duration} minutes</span>
</div>
<div className="d-flex justify-content-center mt-3 mb-4  ">

<button className="btn-12 text-white px-5 pt-1" onClick={()=>{get3(props.id)}} data-bs-toggle="modal" data-bs-target="#exampleModal1"><IoCalendarOutline size={20} className='position-relative'  style={{bottom:'3px'}}/><span className="ms-1 h6  ">Show Calendar</span></button>
</div>
<div className="modal fade"  id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn-close bordering2 " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className='d-flex justify-content-center'>
        <div className=" d-flex justify-content-center "  style={{fontSize:'22px'}} id="exampleModalLabel">Calendar</div></div>
        </div>
        <div className="modal-body">
        <div className='d-flex justify-content-center'>
        <Calendar minDate={new Date()} onChange={handleDateChange}  />

        </div>
        </div>
        <div className="modal-footer">
        <div className='d-flex justify-content-center'>
<div className="h5">Times</div>
        </div>
        <div className='d-flex justify-content-center row'>
                {/* {props.times.map((e,i)=>calender.map((ti,ind)=>{return(

((ti.date==selectedDate)&&(e==ti.hour))?
<div className="h6 bordering mx-2 reserved"   data-bs-toggle="modal" data-bs-target="#exampleModal2">{e}</div>
:
<div className="h6 bordering mx-2 "  data-bs-toggle="modal" data-bs-target="#exampleModal2">{e}</div>
                )

})

                )} */}

{props.times
  .filter((timeSlot) => timeSlot.id == inweek)
  .map((timeSlot) => {
    return timeSlot.times.map((time) => {
      const isReserved = calender.some((reservation) => {
        return (
          (overs.some((over) => over.includes(time)) && selectedDate === today) ||
          (reservation.date === selectedDate && reservation.hour === time)
        );
      });

      const isMine = my.some((reservation2) => {
        return reservation2.date == selectedDate && reservation2.hour == time && reservation2.id_stadium == props.id ;
      });
  
      const className = isReserved || (overs.includes(time) && selectedDate === today) ? 'reserved' : '';
      const className2 = isMine ? 'mine' : '';
      return (
        <div className="col-2">
         { (isMine)?  <>  <div
            key={time}
            onClick={() =>{giveme(time,selectedDate)} }
            className={`h6 d-flex justify-content-center bordering  ${className2} `}
          
          >
            {time}
          </div>
          
          <a href={`http://localhost:4002/reservation/api/pdf/${numero}.pdf`} id='rrr' className='d-none' target="_blank"></a>
          </>
          :
          <div
            key={time}
            onClick={() =>{reserve(time)} }
            className={`h6 d-flex justify-content-center bordering   ${className}`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            {time}
          </div>}
        </div>
      );
    });
  })}



        </div>
        <hr/>
        <div className='d-flex justify-content-start mt-3'>
<img src={elipse2} alt="elipse2" width="25" height="25"/><span className="h5 ms-2">Available</span>        </div>
        <div className='d-flex justify-content-start mt-3'>
<img src={elipse1} alt="elipse1" width="25" height="25" /> <span className="h5 ms-2">Unavailable</span>        </div>
        <div className='d-flex justify-content-start mt-3'>
<img src={elipse3} alt="elipse1" width="25" height="25" /> <span className="h5 ms-2">My Reservation</span>        </div>
        </div>
       
        </div>
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
<span className="ms-2"> Are you sure to reserve {props.nom} ({props.company}) on {selected} From {time} to {endtime} ?</span></div></div>
        <div className='d-flex justify-content-center mt-4 pt-2'>
        <div className=" d-flex justify-content-center " >
            <button className='btn-15' onClick={sendreservation} data-bs-toggle="modal" data-bs-target="#exampleModal1">Yes</button>
            <button className='btn-16 ms-2'  data-bs-toggle="modal" data-bs-target="#exampleModal1">No</button>
            
            </div></div>
        </div>
       

       
        </div>
        </div>
        </div>

</div>
  )
}

export default CardStadium
