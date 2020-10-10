import React from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import NavBar from './components/NavBar/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {getFirestore} from './firebase/firebase';

//Components
import ItemList from './components/ItemList/ItemList';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'

///Pages
import Home from './pages/Home/Home'

//Contexts
import { CartProvider } from './context/cartContext';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      itemsDisponibles: [],
      itemSeleccionado: null,
    };
  }
  render() {
    return(
      <CartProvider>
        <div className="App">
          <Router>
            <NavBar /> 
            <div>
              <Switch>
                <Route path="/item/:itemId" >
                  <ItemDetailContainer />
                </Route>
                <Route path="/cart">
                  <Cart></Cart>
                </Route>
                <Route path="/category/:categoryId">
                  <Home nombre="Juancito" />
                  <ItemList />
                </Route>
                <Route exact path="/">
                  <Home nombre="Juancito" />
                  <ItemList />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </CartProvider>
    );
  };

  componentDidMount() {

    // const db=getFirestore();
    // const itemCollection = db.collection("items");

    // itemCollection.get()
    //   .then((querySnapshot) => {
    //       if (0===querySnapshot.size) {
    //           console.log("No results");
    //       }
    //       else {
    //           let res=[];
    //           res=querySnapshot.docs.map((doc)=>{ return {id:doc.id, data: doc.data()} });
    //           this.setState({itemsDisponibles:res})
    //       }
    //   })
    //   .catch((error)=>{
    //       console.log("An error occurred fetching items.",error);
    //   })
    //   .finally(()=>{
    //   });


    /*fetch('https://api.mercadolibre.com/sites/MLA/search?q=celular')
    .then(response => {
      return response.json();
    })
    .then(res => {
      this.setState({itemsDisponibles:res.results})
      this.setState({itemSeleccionado:res.results[0]})
    });*/
  }
}

export default App;
