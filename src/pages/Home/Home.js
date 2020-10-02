import React from 'react';
import './Home.css';


const Home = (props) => {

  return (
    <div className="container">
        <p>
        Hola {props.nombre} !
        </p>
        {props.children}
    </div>

  );
}

export default Home;
