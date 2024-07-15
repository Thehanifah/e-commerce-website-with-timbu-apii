import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import './ProductDetail.css';
import { CartContext } from './Cartcontext'; // Import CartContext

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);

  const [quantity, setQuantity] = useState(1); 
  const [selectedSize, setSelectedSize] = useState('S'); 
  const { addToCart } = useContext(CartContext); 
  const [showNotification, setShowNotification] = useState(false); 



  const increaseQuantity = () => {
    if (quantity < product.Qty) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize }, quantity); 
    setShowNotification(true); 
    setTimeout(() => setShowNotification(false), 3000); 
  };

  if (!product) {
    return <div className='product-details'>...Getting product details</div>;
  }

  return (
    <>
    <div className='product-detail-container'>
      <div className='Productdesc'>
        <div className='image-detail'>
          <img className='productview' src={product.photoUrl} alt={product.name} />
        </div>

        <div className='details'>
          <h1 className='Productname'>{product.name}</h1>
          <h3 className='price'>  ${product.current_price}</h3>
          <p className='product-description'>{product.description}</p>
          <p className='instock'>Availability: We have <span>{(product.Qty)} </span> in stock </p>
          
          {product.categories !== 'jewelries' && (
            <div className='size-selector'>
              <label htmlFor='size'>Size:</label>
              <select
                id='size'
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
                <option value='XL'>XL</option>
                <option value='XXL'>XXL</option>
              </select>
            </div>
          )}
          
          <div className='quantity-selector'>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          <button 
            className='add-to-cart' 
            onClick={handleAddToCart}
            disabled={product.Qty === 0} 
          >
            Add to Cart
          </button>
        </div>

          {showNotification && (
            <div className="notification">
              Product added to cart!
            </div>
          )}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
