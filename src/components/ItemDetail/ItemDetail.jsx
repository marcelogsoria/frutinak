import React, {useState,useContext} from 'react';
import ItemCount from '../ItemCount/ItemCount';
import {CartContext} from '../../context/cartContext';

const ItemDetail = (props) => {
    const [cantidadAComprar,setCantidadAComprar]=useState(1);
    const [cart,setCart]=useContext(CartContext);

    const addToCart=(item,cantidadAComprar)=> {
        setCart(currentCart=>[...currentCart,{cantidad:cantidadAComprar,item:item}])
    }

    return (
        <div style={{
            "display": "flex",
            "flexDirection": "column", 
            "flexWrap": "wrap", 
            "justifyContent": "center", 
            "alignItems": "center"
        }}>
        <div>
            <h4>{props.item.data.title}</h4>
            <img
            alt="Item"
            src={props.item.data.image} 
            style={{"width": "300px"}}
                />
            <h2>$ {props.item.data.price}</h2>
            <ItemCount initial="1" min="1" max="50" onChange={setCantidadAComprar}/>
            <div className="input-group mb-3 justify-content-md-center">
            <button className="btn btn-dark btn-sm" id="plus-btn" onClick={()=>addToCart(props.item,cantidadAComprar)}><span>Comprar {cantidadAComprar>1?cantidadAComprar:''}</span></button>
            </div>
        </div>
            

        </div>);
}
export default ItemDetail;