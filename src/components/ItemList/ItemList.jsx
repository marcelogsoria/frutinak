import React from 'react';
import Item from '../Item/Item'


const ItemList = (props) => {
    if (!props.items || 0===props.items.length) {
        return "Cargando  items..."
    }
    else {
        return (
            <div className="list-group">
                {props.items.map
                    (
                        i => <Item id={i.id} key={i.id} name={i.title} price={i.price} image={i.thumbnail}/>
                            
                    )
                }
            </div>
        );
    }
}

export default ItemList;