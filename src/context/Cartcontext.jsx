import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity;
        if (newQuantity > product.Qty) {
          // Show availability message
          alert(`Availability: We have ${product.Qty} in stock`);
          return prevCart; // No change to the cart
        }
  
        return prevCart.map(item =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > product.Qty) {
          // Show availability message
          alert(`Availability: We have only ${product.Qty} in stock`);
          return prevCart; // No change to the cart
        }
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
