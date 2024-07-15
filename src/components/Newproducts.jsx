import React, { useState, useEffect } from 'react';
import getProducts from '../api/api.js';

const Newproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const organizationId = 'e85c76b135534056949dbe1e331bfd70'; 
        const appId = 'IATTNAK97F6A7AO'; 
        const apiKey = '39a09a6f96aa439fb01e28aec781818220240712124513936181'; 
        const data = await getProducts(organizationId, false, 1, 10, appId, apiKey);

       
        if (data.items && Array.isArray(data.items)) {
          setProducts(data.items);
          console.log(data)
        } else {
          throw new Error('Invalid data structure');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container-box">
      <h1>New Products</h1>
      <ul>
        {products.map(product => {
          const usdPrices = product.current_price[0]?.USD;
          const firstPrice = usdPrices && usdPrices[0] !== null ? usdPrices[0] : 'N/A';
          const photoUrl = product.photos && product.photos[0]?.url;
          return (
            <li key={product.id}>
              {product.name} - ${firstPrice}
              {photoUrl && (
                <div>
                  <img src={photoUrl} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>

    
  );
};

export default Newproducts;


// <div className="container-box">
// <div className="grid-container">
//   {currentProducts.map(product => (
//     <div className="grid-item" key={product.id}>
//       <ProductCard product={product} />
//     </div>
//   ))}
// </div>
// <nav aria-label="...">
//   <ul className="pagination justify-content-center mt-4">
//     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//       <button className="page-link" onClick={() => paginate(currentPage - 1)}><FaArrowLeft className='arrow ' id='arrow2'/>Previous</button>
//     </li>
//     {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
//       <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
//         <button className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</button>
//       </li>
//     ))}
//     <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? 'disabled' : ''}`}>
//       <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next <FaArrowRight className='arrow' id='arrow1' /></button>
//     </li>
//   </ul>
// </nav>
// </div>