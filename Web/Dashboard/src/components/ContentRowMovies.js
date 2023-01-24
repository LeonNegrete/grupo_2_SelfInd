import React from 'react';
import { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */



let moviesInDB = {
    title: 'Movies in Data Base',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title:' Total awards', 
    color:'primary', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title:'Actors quantity' ,
    color:'primary',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function ContentRowMovies(){
    const [data, setData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://127.0.0.1:3000/api/products');
          console.log(response)
          const jsonResponse = await response.json();
          
          setData(jsonResponse);
        } catch (error) {
          console.error(error);
        }
      }

      
      
      fetchData();
    }, []);
    return (
        
        <div className="row">
            {cartProps.map( (movie, i) => {
                
                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;