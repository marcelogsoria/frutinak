import React from 'react';
import {Link} from 'react-router-dom'

const CartItem = (props) => {
  return (
    <Link to={`/item/${props.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <h4>
            {props.quantity} X 
        </h4>
        <img
          src={props.image} 
          style={{"width": "100px"}}
       />
        {props.name}
        <span className="badge badge-primary badge-pill">Precio: {props.price}</span>
    </Link>
  );
}

export default CartItem;