import React from 'react';


const Input = (props) => {
  return (
        <input type="number" className="form-control form-control-sm" onChange={props.onChange} value={props.value} 
          min={props.min} max={props.max} />


  );
}

export default Input;