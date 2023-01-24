import React from 'react';
import { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */





function ContentRowMovies(){
    const [data, setData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:3030/api/products');
          
          const jsonResponse = await response.json();
          
           setData(JSON.stringify(jsonResponse));
        } catch (error) {
          console.error(error);
        }
      }

      
      
      fetchData();
    }, []);

    console.log(data)
    let moviesInDB = {
        title: 'Total de productos',
        color: 'primary', 
        icon: 'fa-clipboard-list'
    }
    moviesInDB.cuantity = data
    let totalAwards = {
        title:' Total awards', 
        color:'primary', 
        cuantity: '79',
        icon:'fa-award'
    }
    let actorsQuantity = {
        title:'Actors quantity' ,
        color:'primary',
        cuantity:'49',
        icon:'fa-user-check'
    }
    
    let cartProps = [moviesInDB, totalAwards, actorsQuantity];




    return (
        <div className="row">
            <div>{JSON.stringify(data)}</div>
            {cartProps.map( (movie, i) => {
                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;