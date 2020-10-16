import React, {useState,useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom';
import {getFirestore} from '../../firebase/firebase'

const ItemDetailContainer = (props) => {
    let {itemId} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);

   
      const db=getFirestore();
      const item = db.collection('items').doc(itemId);

      item.get()
      .then((querySnapshot) => {
          let res=null;
          res={id:itemId,
              data:querySnapshot.data(),
          };
          setData(res);
      })
      .catch((error)=>{
          console.log("An error occurred fetching items.",error);
      })
      .finally(()=>{
        setLoading(false);
      });

    }, [itemId]);
  
    if(loading) {
      return <div>Cargando Item...</div>
    }
    else {
      //console.log(data)
      return (
        <ItemDetail item={data} />
      );
    }
}

export default ItemDetailContainer;