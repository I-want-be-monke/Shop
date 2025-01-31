import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const CartPage: React.FC = () => {
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Sensual Massage Oil',
      price: 29.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1615485925502-b0f5a5c0a9f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      name: 'Silk Blindfold',
      price: 45.5,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1615485925502-b0f5a5c0a9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];

  const handleRemoveItem = (itemId: number) => {
    console.log(`Removed item with ID: ${itemId}`);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="glass-card">
        <h1 className="title">
          Your <span>Passion</span> Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
            <p>Your cart feels lonely...</p>
            <Link to="/shop" className="link-button">
              Explore Collections
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item" data-aos="fade-up">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-title">{item.name}</h3>
                    
                    <div className="price-quantity">
                      <span className="item-price">${item.price.toFixed(2)}</span>
                      <div className="quantity-control">
                        <button className="quantity-btn">?</button>
                        <span className="quantity">{item.quantity}</span>
                        <button className="quantity-btn">+</button>
                      </div>
                    </div>
                    
                    <div className="item-subtotal">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-section">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <Link to="/" className="continue-shopping">
                  Continue Shopping
                </Link>
                <button className="checkout-btn">
                  Secure Checkout
                  <svg viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;