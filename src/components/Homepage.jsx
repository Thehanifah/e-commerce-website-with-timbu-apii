import React from 'react';
import Hero from './Hero/Hero';
import Heading from './Header/Heading';
import Footer from './Footer/Footer';
import ProductList from '../pages/ProductList/ProductList';


function Homepage({ products, isSearching, filteredProducts}) {
    return (
      <div className="App">
        {!isSearching && <Hero />}
        <Heading />
            <ProductList  products={products} filteredProducts={filteredProducts}/>
        <Footer />
      </div>
    );
  }
  

export default Homepage;






