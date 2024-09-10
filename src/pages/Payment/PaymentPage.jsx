import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';
import Footer from '../../components/Footer/Footer';

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment successful!');
    navigate('/');
  };

  return (

    <>
    <div className="payment-page">
      <form onSubmit={handlePayment}>
        <input type="text" name="cardNumber" placeholder="Card Number" value={paymentData.cardNumber} onChange={handleChange} required />
        <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={paymentData.expiryDate} onChange={handleChange} required />
        <input type="text" name="cvv" placeholder="CVV" value={paymentData.cvv} onChange={handleChange} required />
        <button type="submit" className='pay'>Pay ${((formData.totalPrice + 10) * 1.07).toFixed(2)}</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default PaymentPage;
