import React from 'react'
import './reservation.css'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'
function Card(props) {

  return (
      <div className="  card  bg-card" style={{width:'145%'}}>
<div className="d-flex justify-content-start mt-4 ms-5 ">
<div className="fw-bold">Reservation N° : {props.numero}</div>
</div>
<div className="d-flex justify-content-start mt-2 ms-5 ">
<div className="fw-bold  ">Stadium : {props.nom}</div>
</div>
<div className="d-flex justify-content-start mt-2 ms-5 ">
<div className="fw-bold  ">User : {props.user}</div>
</div>
<div className="d-flex justify-content-start mt-2 ms-5 ">
<div className="fw-bold">Date : {props.date}</div>
</div>
<div className="d-flex justify-content-start mt-2 ms-5 mb-3 ">
<div className="fw-bold">Hour : {props.hour}</div>

<a href={`http://localhost:4002/reservation/api/pdf/${props.numero}.pdf`} target="blank">
<div className="fw-bold col-4 position-relative " style={{left:'209px',bottom:'129px'}}><BsFillFileEarmarkPdfFill  style={{color:'red'}} size={40}/></div>
</a>
</div>


</div>
  )
}

export default Card
