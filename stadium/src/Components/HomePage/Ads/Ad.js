import React from 'react';

function Ad(props) {
    return (
        <div className='ad' >
           <h1>{props.title}</h1>
           <p>{props.body}</p> 
        </div>
    );
}

export default Ad;<h1>props.title</h1>