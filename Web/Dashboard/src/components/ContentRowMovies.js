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
          
           setData({count: jsonResponse.count});
        } catch (error) {
          console.error(error);
        }
      }

      
      
      fetchData();
    }, []);

    console.log(data)

    const [cards, setCards] = useState(null);
     setCards([{
        title: 'Total de productos',
        color: 'primary', 
        cuantity: data.count,
        icon: 'fa-clipboard-list'
    },
    {
        title:' Total awards', 
        color:'primary', 
        cuantity: '79',
        icon:'fa-award'
    },
    {
        title:'Actors quantity' ,
        color:'primary',
        cuantity:'49',
        icon:'fa-user-check'
    }
]);





    return (
        <div className="row">
            <div>{JSON.stringify(data)}</div>
            {cards.map( (movie, i) => {
                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;