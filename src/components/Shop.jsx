import React, { useState } from 'react';
import ProductCard from './Productcards';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Shop.css';

const Shop = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('all');
  const productsPerPage = 9;

  const handleCategoryChange = (categoryName) => {
    setCategory(categoryName);
    setCurrentPage(1); // Reset pagination when category changes
  };

  const filteredProducts = category === 'all' ? products : products.filter(product =>
    product.categories.includes(category)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-box">
      <div className="category-links">
        <button
          className={`category-btns mx-2 ${category === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </button>
        <button
          className={`category-btns mx-2 ${category === 'men' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('men')}
        >
          Men
        </button>
        <button
          className={`category-btns mx-2 ${category === 'women' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('women')}
        >
          Women
        </button>
        <button
          className={`category-btns mx-2 ${category === 'jewelries' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('jewelries')}
        >
          Jewelries
        </button>
      </div>
      <div className="grid-container">
        {currentProducts.map(product => (
          <div className="grid-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}><FaArrowLeft className='arrow' id='arrow2' />Previous</button>
          </li>
          {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next <FaArrowRight className='arrow' id='arrow1' /></button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Shop;
