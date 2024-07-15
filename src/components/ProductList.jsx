import React, { useState } from 'react';
import ProductCard from './Productcards';
import './Productlists.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ProductList = ({ products, filteredProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Ensure filteredProducts is defined and an array before using it
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts && Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-box">
      <div className="grid-container">
        {currentProducts.map(product => (
          <div className="grid-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              <FaArrowLeft className='arrow ' id='arrow2' />Previous
            </button>
          </li>
          {[...Array(Math.ceil((filteredProducts ? filteredProducts.length : 0) / productsPerPage)).keys()].map(number => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil((filteredProducts ? filteredProducts.length : 0) / productsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next <FaArrowRight className='arrow' id='arrow1' />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
