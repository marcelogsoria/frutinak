import React, {useState,useEffect} from 'react';
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom';
import {getFirestore} from '../../firebase/firebase'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const ItemDetailContainer = (props) => {
    let {itemId} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const classes = useStyles();

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
      return (
        <Backdrop className={classes.backdrop} open={loading} /*onClick={handleClose}*/>
            <CircularProgress color="inherit" />
        </Backdrop>
      );
    }
    else {
      //console.log(data)
      return (
        <ItemDetail item={data} />
      );
    }
}

export default ItemDetailContainer;