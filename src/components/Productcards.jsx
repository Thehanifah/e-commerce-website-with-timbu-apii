import React from 'react';
import './Productcard.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';

const ProductCards = ({ product }) => {
  const navigate = useNavigate();



  const handleQuickLook = () => {
    console.log('Navigating to product:', product.id);
    navigate(`/product/${product.id}`);
  };

  return (
    <>
    <div className="cards" onClick={handleQuickLook}>
      <div className='product-img-container'>
        <img src={product.photoUrl} className="card-img" alt={product.name} />
      </div>
      
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.current_price}</p>
      </div>
      
      <button className="quick-look" onClick={handleQuickLook}>
        Quick Look
      </button>
    </div>
    </>
  );
};

export default ProductCards;






// import React from 'react';
// import './Productcard.css';

// const ProductCards = ({ product }) => {
//   return (
//     <div className="card">
//       <img src={product.image} className="card-img-top" alt={product.title} />
//       <div className="card-body">
//         <h5 className="card-title">{product.title}</h5>
//         <p className="card-text">${product.price}</p>
//         <button><a href="">Add to cart</a></button>
//       </div>
//     </div>
//   );
// };

// export default ProductCards;
