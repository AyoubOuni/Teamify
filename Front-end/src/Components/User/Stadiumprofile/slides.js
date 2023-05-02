import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './this.css'

function Slides(props) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Advance to the next slide every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex(currentSlideIndex => (currentSlideIndex + 1) % props.images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [props.images]);

  const nextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex => (currentSlideIndex + 1) % props.images.length);
  };

  const previousSlide = () => {
    setCurrentSlideIndex(currentSlideIndex => (currentSlideIndex + props.images.length - 1) % props.images.length);
  };

  return (
    <div className=''>
      <div className="slides-container">
        <FaChevronLeft className="arrow arrow-left" onClick={previousSlide} />
        <FaChevronRight className="arrow arrow-right" onClick={nextSlide} />
        {props.images.map((image, index) => {
          if (image) {
            return (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={index === currentSlideIndex ? "active" : ""}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Slides;
