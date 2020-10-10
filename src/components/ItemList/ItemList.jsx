import React from 'react';
import Item from '../Item/Item'
import { useParams } from 'react-router-dom';
import {getFirestore} from '../../firebase/firebase'
import { useState,useEffect } from 'react';

const ItemList = (props) => {
    const {categoryId}=useParams();
    const [items,setItems]=useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        const db=getFirestore();
        let itemCollection = null;

        if (categoryId) {
            const categoryDocRef = db.collection('categories')
                .doc(categoryId);

            itemCollection = db.collection('items')
                .where('categoryId', '==', categoryDocRef);

        }
        else {
            itemCollection=db.collection("items");
        }
    
        itemCollection.get()
          .then((querySnapshot) => {
              if (0===querySnapshot.size) {
                  console.log("No results");
              }
              else {
                  let res=[];
                  res=querySnapshot.docs.map((doc)=>{ return {id:doc.id, data: doc.data()} });
                  setItems(res);
              }
          })
          .catch((error)=>{
              console.log("An error occurred fetching items.",error);
          })
          .finally(()=>{
            setLoading(false);
          });
    
    
      }, [categoryId]);

    if (loading) {
        return "Cargando  items..."
    }
    else {
        return (
            <div className="list-group">
                {items.map
                    (
                        i => <Item id={i.id} key={i.id} name={i.data.title} price={i.data.price} image={i.data.image}/>
                            
                    )
                }
            </div>
        );
    }
}

export default ItemList;