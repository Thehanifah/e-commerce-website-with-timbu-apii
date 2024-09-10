import React, { useContext} from 'react';
import { CartContext } from '../../context/Cartcontext';
import './Cart.css';
import Footer from '../../components/Footer/Footer';
import { IoCartOutline } from "react-icons/io5";


const Cart = () => {
  const { cart, setCart, } = useContext(CartContext);

  
  

  const totalPrice = cart.reduce((acc, item) => acc + item.current_price * item.quantity, 0);
  const totalWithAdditionalPercentage =  Math.round(totalPrice * 1.07 * 100) / 100;; 

  const handleIncreaseQuantity = (index) => {
    const newCart = [...cart];
    const productInCart = newCart[index];
    
    if(productInCart.Qty > productInCart.quantity){
       productInCart.quantity += 1;
    setCart(newCart); 
    }
   
  };

  const handleDecreaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity -= 1;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);

    
  };


  return (

    
    <div className="cart-page">
      {cart.length === 0 ? (
        <div className='emptycart-div'>
          <IoCartOutline className='emptycartlogo' />
          <p className='emptycart'>Your Cart is currently empty!</p>
          <p className='proceed'>Please proceed to shop to add some products to your cart.</p>
          <div className='btn-shop' id='go-toshop'><button className='checkout'><a href="/Shop">Return To Shop</a></button> </div>
        
        </div>
      ) : (
        <>
        
          <div className='container-box1'>
            {cart.map((item, index) => (
              <div className='products1'>
              <div key={index} className="product-info">
                <div className='imgdiv'><img src={item.photoUrl} alt={item.name} className="image-p" /></div> 
                <div className="cart-item-details">
                <h5 className="card-title-cart">{item.name}</h5>
                 <div className='prices'>
                   <p className="card-text-cart"> ${item.current_price}</p>
                   <p className="card-title-cart1">
                   {item.description.length > 30 ? `${item.description.slice(0, 40)}...` : item.description}
                   </p>
                  </div>               
                </div>
               </div>
               
                  <div className="quantity-selector" id='quantitySelector'>
                    <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                  </div>
              </div>
                  
            ))}
            <div className='btn-shop'><button className='Shop-again'><a href="/Shop">Continue Shopping</a></button> </div> 
          </div>
              <div className='total'>
      <p className='p1'>
       Sub Total
      </p>
    <p className='p2'>
     $ {totalPrice.toFixed(2)} 
    </p>
    </div>
    <div className='total'>
      <p className='p1'>
       Estimated Tax
      </p>
    <p className='p2'>
    7%
    </p>
    </div>
    <div className='total'>
      <p className='p1'>
       Total
      </p>
    <p className='p2'>
     ${totalWithAdditionalPercentage}
    </p>
    </div>

    <div className='checkout-div'>
    <button className='checkout'><a href="/checkout">Checkout</a></button>
    </div> 
        
          {/* <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button> */}
        </>
      )}
  
      <Footer/>
    </div>
  );
};

export default Cart;








