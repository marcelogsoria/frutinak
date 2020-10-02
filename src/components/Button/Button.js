import React from 'react';


const Button = (props) => {
  return (
    <div>
        <button className="btn btn-dark btn-sm" onClick={props.onClick}><span className="material-icons">{props.etiqueta}</span></button>
    </div>

  );
}

export default Button;