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
          
           setData(jsonResponse);
        } catch (error) {
          console.error(error);
        }
      }

      
      
      fetchData();
    }, []);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:3030/api/users');
          
          const jsonResponse = await response.json();
          
           setUserData(jsonResponse);
        } catch (error) {
          console.error(error);
        }
      }

      
      
      fetchData();
    }, []);





    return (

        <div className="row">
            {[{
            title: 'Total de productos',
            color: 'primary', 
            cuantity: data? data.count : 'Loading...' ,
            icon: 'fa-clipboard-list'
        },{
            title:'Total de usuarios', 
            color:'primary', 
            cuantity: userData? userData.count : 'Loading...',
            icon:'fa-award'
        },{
            title:'Hechos por usuarios' ,
            color:'primary',
            cuantity: data? data.countByCategory.countCustom : 'Loading...' ,
            icon:'fa-user-check'
        }].map( (movie, i) => {
                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;