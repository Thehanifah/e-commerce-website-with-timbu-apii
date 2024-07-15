import React from 'react';
import Hero from './Hero';
import Heading from './Heading';
import Footer from './Footer';
import ProductList from './ProductList';
import Newproducts from './Newproducts';

function Homepage({ products, isSearching, filteredProducts}) {
    return (
      <div className="App">
        {!isSearching && <Hero />}
        <Heading />
        {/* <Newproducts/> */}
        <ProductList  products={products} filteredProducts={filteredProducts}/>
        <Footer />
      </div>
    );
  }
  

export default Homepage;







// import React from 'react'
// import Navbar from './Navbar files/Navbar';
// import Hero from './Hero'
// import Heading from './Heading';
// import Footer from './Footer';
// import ProductList from './ProductList';
// import Shop from './Shop';

// function Homepage() {
//   return (
//     <div className="App">
//      <Navbar/>
//      <Hero/>
//      <Heading/>
//      <ProductList/>
//      <Footer/>
//     </div>
//   )
// }

// export default Homepage

