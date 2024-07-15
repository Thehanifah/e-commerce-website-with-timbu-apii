import React, { useContext } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import './OrderSummary.css';
import { CartContext } from './Cartcontext'; 

const OrderSummary = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const { cart } = useContext(CartContext); 
  const navigate = useNavigate();

  if (!formData) {
    return <p>No order information available. Please go back to the checkout page.</p>;
  }

  const handlePayment = () => {
    navigate('/payment', { state: { formData, cart, totalAmount } });
  };

  const deliveryCharge = 10.0;
  const subtotal = cart.reduce((acc, item) => acc + item.current_price * item.quantity, 0);
  const totalWithTax = subtotal * 1.07; // Adding 7% tax
  const totalAmount = totalWithTax + deliveryCharge;

  return (
    <>
      <div className="order-summary">
        <h1 className='summary'>Order Summary</h1>
        {cart.map((item, index) => (
          <div className='products1' id='products'>
          <div key={index} className="product-info" id='productinfo'>
           <div className='imagediv' id='imgdiv'><img src={item.photoUrl} alt={item.name} className="image-p" id='imageprofile'/></div> 
            <div className="cart-item-details" id='item-details'>
              <h5 className="card-title-cart" id='title-cart'>{item.name}</h5>
              <p className="card-text-cart" id='text-cart'> ${item.current_price}</p>
              <p className="card-title-cart1" id='title-cart-1'>
                {item.description.length > 30 ? `${item.description.slice(0, 40)}...` : item.description}
              </p>             
            </div>
          </div>
          <div className='quantity-total'>
              <p><strong>Qty:</strong> {item.quantity}</p>
              <p><strong>Total:</strong> ${(item.current_price * item.quantity).toFixed(2)}</p>
              </div>
          </div>
        ))}
        <div className="total" id='totals'>
          <p className="p1">Sub Total:</p>
          <p className="p2">${subtotal.toFixed(2)}</p>
        </div>
        <div className="total" id='totals'>
          <p className="p1">Estimated Tax:</p>
          <p className="p2">7%</p>
        </div>
        <div className="total" id='totals'>
          <p className="p1">Total: (including tax)</p>
          <p className="p2">${totalWithTax.toFixed(2)}</p>
        </div>
        <div className="total" id='totals'>
          <p className="p1">Delivery Charge:</p>
          <p className="p2">${deliveryCharge.toFixed(2)}</p>
        </div>
        <div className="total" id='totals'>
          <p className="p1">Total Amount:</p>
          <p className="p2">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className='checkout-div'>
      <button className='proceed-btn'  onClick={handlePayment}>Pay Now</button>
    </div> 
      
      <Footer />
    </>
  );
};

export default OrderSummary;
