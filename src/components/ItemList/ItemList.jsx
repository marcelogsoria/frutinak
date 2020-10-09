import React,{useEffect} from 'react';
import Item from '../Item/Item'
import {getFirestore} from '../../firebase';

const ItemList = (props) => {

    useEffect(()=>{
    
    const db=getFirestore();
    const itemCollection = db.collection("items");

    itemCollection.get().then((querySnapshot) => {
        if (0===querySnapshot.size) {
            console.log("No results");
        }
        else {
            console.log(querySnapshot.docs.map(doc=>doc.data()));
        }
    }).catch((error)=>{
        console.log("An error occurred fetching items.",error);
    }).finally(()=>{
  
    });
    },[]);
    
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