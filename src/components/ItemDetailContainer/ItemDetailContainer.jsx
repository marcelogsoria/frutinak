import React, {useState,useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom';

const ItemDetailContainer = (props) => {
    let {itemId} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
//      console.log("pidiendo a ML.. con itemID "+itemId);
      fetch('https://api.mercadolibre.com/items?ids='+itemId)
      .then(response => {
        return response.json();
      })
      .then(res => {
//        console.log("recibido de ML..");
        setData(res[0].body);
        setLoading(false);
      })
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