import React, { useState } from "react";
import './Stadiumprofile.css'
import {GrMap} from 'react-icons/gr'
export default function Google(props) {
  const [html, setHtml] = useState("");

  function cleanUpCode(html) {
    // Remove all style tags
    html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

    // Remove all br tags
    html = html.replace(/<br\s*\/?>/gi, "");

    // Return the cleaned up code
    return html;
  }

  const cleanedHtml = cleanUpCode(
    `${props.map}`
  );

  return (<>
    <div className="d-flex justify-content-center h5 ms-4 mb-5" >
<u style={{    textUnderlineOffset: '6.5px' }}><span><GrMap className='me-2' />Map</span></u>     </div>
    <div className="d-flex justify-content-center ms-4 mb-5" >
      <div style={{width:'1000px',height:'700px'}} dangerouslySetInnerHTML={{ __html: cleanedHtml }}></div>
    </div>
    </>
  );
}
