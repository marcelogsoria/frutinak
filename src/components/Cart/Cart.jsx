import React,{useState,useContext} from 'react';
import CartItem from '../CartItem/CartItem'
import {CartContext} from '../../context/cartContext'
import {
    NavLink
  } from "react-router-dom";
import ModalDialog from '../ModalDialog/ModalDialog';

import CircularProgress from '@material-ui/core/CircularProgress';
import {getFirestore,getFirebase} from '../../firebase/firebase'
import ClientDataDialog from '../ClientDataDialog/ClientDataDialog';
import { Snackbar } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
  });

const Cart = (props) => {
    const [cart,setCart]=useContext(CartContext);
    const [guardandoCompra, setGuardandoCompra]=useState(true);
    const [openBuyDialog, setOpenBuyDialog]=useState(false);
    const [openClientDataDialog, setOpenClientDataDialog]=useState(false);
    const [orderId, setOrderId] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [clientEmail, setclientEmail] = useState(null);
    const [clientPhone, setclientPhone] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    
    const classes = useStyles();

    const finishBuy = () => {

        setOpenClientDataDialog(true);
    };
    
    const handleCloseBuyDialog = () => {
        setOpenBuyDialog(false);
    };

    const handleCloseClientDataDialog = ({result,name,email,phone}) => {
        setOpenClientDataDialog(false);
        

        if (result) {
            setClientName(name);
            setclientEmail(email);
            setclientPhone(phone);

            setOpenBuyDialog(true);
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
                buyer:{phone:phone,
                        name:name,
                        email:email
                    },
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
        }
        else {
            enqueueSnackbar('No se pudo completar la compra!', { variant: 'error' });
        }
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
                    <span>Nombre: {clientName}</span><br />
                    <span>Teléfono: {clientPhone}</span><br />
                    <span>Email: {clientEmail}</span><br />
                </p>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="right">Precio&nbsp;($)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cart.map( (item) => {
                        return <>
                        <TableRow key={item.id}>
                            <TableCell align="right">{item.cantidad}</TableCell>
                            <TableCell>{item.item.data.title}</TableCell>
                            <TableCell align="right">{item.item.data.price}</TableCell>
                        </TableRow>
                        </>
                    })}
                    {/* {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))} */}
                    </TableBody>
                </Table>
                <p>
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
                    <ClientDataDialog open={openClientDataDialog} 
                        handleClose={handleCloseClientDataDialog} 
                    />
                    <ModalDialog open={openBuyDialog} handleClose={handleCloseBuyDialog} >
                        {contenidoModal()}
                    </ModalDialog>
                </div>
            </div>
        );
    }
    else {
        return (<div>
                  <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <h1></h1>
                    </Grid>
                    <Grid item xs={12}>
                    <span className="material-icons">shopping_cart</span> ¡El carrito está vacío!.
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default Cart;


