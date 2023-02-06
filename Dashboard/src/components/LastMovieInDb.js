import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import { useState, useEffect } from 'react';
import path from 'path'

function LastMovieInDb(){

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
    const [product, setProduct] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const id = await data.products[data.products.length - 1].id
            const response = await fetch('http://localhost:3030/api/products/' + id );
            
            const jsonResponse = await response.json();
            
            setProduct(jsonResponse);
            
          } catch (error) {
            console.error(error);
          }
        }
        
        
        
        fetchData();
        
      }, [data]);

    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto publicado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={data? product? product.shirt_img: 'loading...' : 'loadingData...'} alt=" Loading... "/>
                    </div>
                    <p>{data? product? product.shirt_desc: 'loading...' : 'loadingData...'}</p>
                    <a className="btn btn-primary" target={data? data.products[data.products.length-1].detail : '/'} rel="follow" href={data? data.products[data.products.length-1].detail : '/'}>Ver detalle</a>
                </div>
            </div>
        </div>
    )
}

export default LastMovieInDb;
