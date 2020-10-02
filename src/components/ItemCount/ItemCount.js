import React, {useState} from 'react';
import './ItemCount.css';
import Button from '../Button/Button'
import Input from '../Input/Input'

function ItemCount(props) {
    /*    this.state = {
          cantidadAComprar: props.initial,
          onAdd: props.onAdd,
          min: props.min,
          max: props.max
        };
      }*/
    const [cantidadAComprar,setCantidadAComprar] = useState(props.initial);

    function handleChange(e) {
        setCantidadAComprar(e.target.value);
        props.onChange(e.target.value);
    }

    function onClickPlusButton(e){
        let cantidadActual=parseInt(cantidadAComprar);
        if (cantidadActual<props.max) {
            setCantidadAComprar(cantidadActual+1);
            props.onChange(cantidadActual+1);
        }
       
    }

    function onClickMinusButton(e){
        let cantidadActual=parseInt(cantidadAComprar);
        if (cantidadActual>props.min) {
            setCantidadAComprar(cantidadActual-1);
            props.onChange(cantidadActual-1);
        }
    }

    return (
        <div className="row justify-content-md-center">
            <div className="col-sm-6 col-sm-offset-6">
                <div className="input-group mb-3">
                        <Button etiqueta="remove" onClick={onClickMinusButton}/>
                        <Input onChange={handleChange} value={cantidadAComprar} min={props.min} max={props.max}  />
                        <Button etiqueta="add" onClick={onClickPlusButton}/>
                </div>
            </div>
        </div>
    );


}

export default ItemCount;