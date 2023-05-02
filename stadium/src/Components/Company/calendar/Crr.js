
import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar';
import {RxDimensions,} from 'react-icons/rx'
import {RiTeamFill,RiQuestionnaireFill} from 'react-icons/ri'
import {MdFilterAlt} from 'react-icons/md'
import {GiLightBulb} from 'react-icons/gi'
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

function Crr(props) {  

        const [calender, setcalender] = useState([]);
        const [my, setmy] = useState([]);
        const [time, settime] = useState('');
        const [endtime, setendtime] = useState('');
        const [user_name, setusername] = useState('');

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
                          name_user:user_name,
                          pdf:`pdf/${id_reserv}/${id_reserv}.pdf`,
                          date:selectedDate,
                          hour:time,
                        }),
                        headers: {
                          'Content-Type': 'application/json'
                        },
                      })
                        .then(async() => {
                                generatePDF(id_reserv,props.company,props.nom,user_name,props.id_user)
                           get2();
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
      <div className="  " >



    <div >
      
        <div >
        <div className='d-flex justify-content-center'>
        <Calendar className='p-3'  onChange={handleDateChange}  />

        </div>
        </div>
        <div className="modal-footer bg-card">
        <div className='d-flex justify-content-center'>
<div className="h5">Times</div>
        </div>
        <div className='d-flex justify-content-center row'>
             

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
          <a href={`http://localhost:4002/reservation/api/pdf/${numero}.pdf`} id='rrr' className='d-none' target="blank"></a>

          </>
          
        </div>
      );
    });
  })}



        </div>
        <hr/>

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
<span className="ms-2"> Are you sure to reserve {props.nom}  on {selected} From {time} to {endtime} ?</span></div></div>
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
  )
}

export default Crr
