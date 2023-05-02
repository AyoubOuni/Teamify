import React from 'react';

function Upload(props) {
    const upload=()=>{
document.getElementById('e').click()
    }
    return (
        <div>
            <input type='file' className='d-none' id='e'/>
            <button className='btn btn-secondary w-100 text-center h-100 text-nowrap' onClick={upload}>Upload image</button>
        </div>
    );
}

export default Upload;<p>Upload page</p>