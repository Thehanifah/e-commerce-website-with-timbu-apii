import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';
import Footer from './Footer';
import { CartContext } from './Cartcontext';

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce((acc, item) => acc + item.current_price * item.quantity, 0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    totalPrice: totalPrice 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-summary', { state: { formData } });
  };

  return (
    <>
      <div className="checkout-form">
        <h1 className='checkoutheader'>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required />
          <button type="submit" className='Continue'>Continue</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;
