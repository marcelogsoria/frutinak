import React,{useContext} from 'react';
import CartItem from '../CartItem/CartItem'
import {CartContext} from '../../context/cartContext'
import {
    NavLink
  } from "react-router-dom";

const Cart = (props) => {
    const [cart,setCart]=useContext(CartContext);
    const totalCart = (cartToSum)=> {
        return cartToSum.reduce(
            (valorAnterior,elementoActual) => {
                return valorAnterior+ elementoActual.cantidad *  parseFloat(elementoActual.item.price);
            }
            , 0
        )
    }
    const finishBuy= () => {
        alert("hola");
    }
    if (0<cart.length) {
        return (
            <div className="list-group">
                {cart.map
                    (
                        i => <CartItem id={i.item.id} key={i.item.id} name={i.item.title} price={i.item.price} image={i.item.thumbnail} quantity={i.cantidad}/>
                            
                    )
                }
                <span>Artículos a comprar: {cart.length} Total a pagar $: {totalCart(cart)}</span>
                <div>
                    <button className="btn btn-dark btn-sm" onClick={finishBuy}><span className="material-icons">done_outline</span>Finalizar Compra</button>
                </div>
            </div>
        );
    }
    else {
        return (<div>
                ¡El carrito está vacío!.
                <br />
                <NavLink to="/">Home</NavLink>
            </div>
        );
    }
}

export default Cart;