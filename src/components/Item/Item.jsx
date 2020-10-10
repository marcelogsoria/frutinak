import React from 'react';
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <Link to={`/item/${props.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <img
          src={props.image} 
          style={{"width": "100px"}}
       />
        {props.name}
        <span className="badge badge-primary badge-pill">Precio $ {props.price}</span>
    </Link>
  );
}

export default Item;