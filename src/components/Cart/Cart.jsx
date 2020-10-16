import React,{useState,useContext} from 'react';
import CartItem from '../CartItem/CartItem'
import {CartContext} from '../../context/cartContext'
import {
    NavLink
  } from "react-router-dom";
import ModalDialog from '../ModalDialog/ModalDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getFirestore,getFirebase} from '../../firebase/firebase'

const Cart = (props) => {
    const [cart,setCart]=useContext(CartContext);
    const [guardandoCompra, setGuardandoCompra]=useState(true);
    const [openDialog, setOpenDialog]=useState(false);
    const [orderId, setOrderId] = useState(null);

    const finishBuy = () => {
        setOpenDialog(true);
        setGuardandoCompra(true);

        const db=getFirestore();
        const orders=db.collection("orders");
        const fb=getFirebase();
        let orderItems=[];
        orderItems=cart.map( (item) => {
            return {
                id:item.item.id,
                price: item.item.data.price,
                quantity: item.cantidad,
                title: item.item.data.title,
            };
        });
        const newOrder= {
            buyer:{phone:"011 3542251",
                   name:"Marcelo Soria",
                   email:"msoria@ciensis.com"},
            items:orderItems,
            // date:fb.firestore.Timestamp.fromDate(new Date()),
            total:totalCart(cart),
        };

        orders.add(newOrder).then( ({id}) => {
            setOrderId(id);            
        }).catch(err => {
            console.log(err);
        }).finally( () => {
            setTimeout(function(){
                setGuardandoCompra(false);
            }, 2000);//wait 2 seconds
        });

      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    const totalCart = (cartToSum)=> {
        return cartToSum.reduce(
            (valorAnterior,elementoActual) => {
                return valorAnterior+ elementoActual.cantidad *  parseFloat(elementoActual.item.data.price);
            }
            , 0
        )
    }

    const contenidoModal= () => {
        if (guardandoCompra) {
            return ( <>
                    <p id="simple-modal-description">
                        Espere mientras generamos su orden de compra.
                    </p>
                    <p>
                        <CircularProgress />
                    </p>
                    </>
                );
        }
        else {
            return (<>
                <p id="simple-modal-description">
                    Los datos de tu compra:
                </p>
                <p>
                    Nro de compra: {orderId}
                </p>
                <p>
                    {cart.map( (item) => {
                        return <>
                            <span>
                            {item.cantidad}x
                            {item.item.data.title} $
                            {item.item.data.price} 
                            </span><br />
                            </>;
                    })}
                </p>
                <p>
                    Total $ {totalCart(cart)}
                </p>
                </>
            );
        }
    }
    if (0<cart.length) {
        return (
            <div className="list-group">
                {cart.map
                    (
                        i => <CartItem id={i.item.id} key={i.item.id} name={i.item.data.title} price={i.item.data.price} image={i.item.data.image} quantity={i.cantidad}/>
                            
                    )
                }
                <span>Artículos a comprar: {cart.length} Total a pagar $: {totalCart(cart)}</span>
                <div>
                    <button className="btn btn-dark btn-sm" onClick={finishBuy}><span className="material-icons">done_outline</span>Finalizar Compra</button>
                    <ModalDialog open={openDialog} handleClose={handleCloseDialog} >
                        {contenidoModal()}
                    </ModalDialog>
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