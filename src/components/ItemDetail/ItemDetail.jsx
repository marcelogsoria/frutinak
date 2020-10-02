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
            <h4>{props.item.title}</h4>
            <h3>id:{props.item.id}</h3>
            <img
            alt="Item"
            src={props.item.thumbnail} 
            style={{"width": "100px"}}
                />
            <p>$ {props.item.price}</p>
            <ItemCount initial="1" min="1" max="50" onChange={setCantidadAComprar}/>
            <div className="input-group mb-3 justify-content-md-center">
            <button className="btn btn-dark btn-sm" id="plus-btn" onClick={()=>addToCart(props.item,cantidadAComprar)}><span>Comprar {cantidadAComprar>1?cantidadAComprar:''}</span></button>
            </div>
        </div>
            

        </div>);
}
export default ItemDetail;