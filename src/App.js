import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import Shop from './components/Shop';
import Navbar from './components/Navbar files/Navbar';
import Cart from './components/Cart';
import CartProvider from './components/Cartcontext';
import ProductDetail from './components/ProductDetail';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import PaymentPage from './components/PaymentPage';


function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

    const organizationId = process.env.REACT_APP_ORGANISATION_ID;
        const appId = process.env.REACT_APP_APP_ID;
        const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      
        
        const url = `https://timbu-get-all-products.reavdev.workers.dev/?organization_id=${organizationId}&reverse_sort=false&page=1&size=36&Appid=${appId}&Apikey=${apiKey}`;
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json'
          }
        });
  
        console.log('API Response:', response);
  
        if (!response.data || !response.data.items) {
          throw new Error('No data or items found in API response');
        }
        
        console.log(response);
        
      
        const data = response.data.items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          Qty: item.available_quantity,
          current_price: item.current_price && item.current_price[0] && item.current_price[0].USD && item.current_price[0].USD[0] !== null ? item.current_price[0].USD[0] : 'N/A',
          photoUrl: item.photos && item.photos[0] ? `https://api.timbu.cloud/images/${item.photos[0].url}` : '',
          categories: item.categories.map(category => category.name),
        }));

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const handleSearch = (searchInput) => {
    const searchString = String(searchInput).trim();
    console.log('Search input:', searchInput);
   
  if (searchString) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchString)
    );
    console.log('Filtered products:', filteredProducts);
    setFilteredProducts(searchInput); 
    setIsSearching(true);
  } else {
    setFilteredProducts([]);
    setIsSearching(false);
  }
};



//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const organizationId = process.env.REACT_APP_ORGANISATION_ID; 
//         const appId = process.env.REACT_APP_APP_ID; 
//         const apiKey =process.env.REACT_APP_API_KEY; 
//         const response = await axios.get('/api/products', {
//           params: {
//             organization_id: organizationId,
//             reverse_sort: false,
//             page: 1,
//             size: 36,
//             Appid: appId,
//             Apikey: apiKey
//           }
//         });
//         console.log(response)
//         const data = response.data.items.map(item => ({
//           id: item.id,
//           name: item.name,
//           description: item.description,
//           Qty: item.available_quantity,
//           current_price: item.current_price && item.current_price[0] && item.current_price[0].USD && item.current_price[0].USD[0] !== null ? item.current_price[0].USD[0] : 'N/A',
//           photoUrl: item.photos && item.photos[0] ? `https://api.timbu.cloud/images/${item.photos[0].url}` : '',
//           categories: item.categories.map(category => category.name),
         
//         }));
//         setProducts(data);
//         console.log(data)
//         setFilteredProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSearch = (searchInput) => {
//     const searchString = String(searchInput).trim();
//     console.log('Search input:', searchInput);
   
//   if (searchString) {
//     const filteredProducts = products.filter(product =>
//       product.name.toLowerCase().includes(searchString)
//     );
//     console.log('Filtered products:', filteredProducts);
//     setFilteredProducts(searchInput); 
//     setIsSearching(true);
//   } else {
//     setFilteredProducts([]);
//     setIsSearching(false);
//   }
// };
  

  return (
      <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar products={products} onSearchStateChange={setIsSearching} onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Homepage products={products} isSearching={isSearching} filteredProducts={filteredProducts} setFilteredProducts ={setFilteredProducts} />} />
            <Route path="/shop" element={<Shop products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/order-summary" element={<OrderSummary/>} />
            <Route path="/payment" element={<PaymentPage/>} />
            <Route path="/product/:productId" element={<ProductDetail products={products} />} />
          </Routes>
        </div>
      </BrowserRouter>
      </CartProvider>
   
  );
}

export default App;
