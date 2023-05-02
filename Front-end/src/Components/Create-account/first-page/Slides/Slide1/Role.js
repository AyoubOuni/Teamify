import React from "react";
import './Role.css'

function Role(props) {

  
    return (
    <div className="radio-btns">
       <input  className='radio-btn' type='radio'  name='Role' value={'stadium'} onClick={()=>{props.setChecked(true)}} />
       <label className="ps-1"> Stadium</label>
      <span className="ms-4">
       <input className="radio-btn" type='radio' name='Role' value={'user'} onClick={()=>{props.setChecked(true)}}/>
       <label className="ps-1"> User</label></span>
    </div>
  );
}

export default Role;
