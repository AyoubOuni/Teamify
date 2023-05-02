import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './pictures.css'

function Slides(props) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Advance to the next slide every 5 seconds


  return (
    <div className='ms-5'>
      <div className="row g-2 px-2 ms-2 d-flex justify-content-center">

        {props.images.map((image, index) => {
          if (image) {
            return (
              <div className="col-4 ">
              <img
                key={index}
                src={image}
                className="me-5"
                width={300}
                height={220}
              />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      
    </div>
  );
}

export default Slides;
