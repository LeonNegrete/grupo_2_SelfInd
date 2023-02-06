import React from "react";
import { useState, useEffect } from "react";
function GenresInDb() {
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
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            ¿Quien hace los productos?
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card bg-primary text-white shadow">
                <div className="card-body">Customs:  {data? data.countByCategory.countCustom : '...'} </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card bg-primary text-white shadow">
                <div className="card-body">Oficiales:  {data? data.countByCategory.countOficial : '...'} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;
