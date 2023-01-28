import React from 'react';
import ChartRow from './ChartRow';
import { useState,useEffect } from 'react';



function Chart (){
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
    return (
        /* <!-- DataTales Example --> */
        
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Creado por</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            data? data.products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            }):'Loading...'
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;