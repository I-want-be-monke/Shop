import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

type CartItem = {
    productId: number;
    quantity: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('https://localhost:7295/api/cart');
                console.log('Fetched cart items:', response.data); // Logging fetched data

                if (response.data && Array.isArray(response.data.items)) {
                    setCartItems(response.data.items); // Устанавливаем массив items
                } else {
                    setError('The fetched data is not an array.');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Failed to load cart items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productRequests = cartItems.map(item =>
                    axios.get(`https://localhost:7295/api/products/${item.productId}`)
                );
                const responses = await Promise.all(productRequests);
                const fetchedProducts = responses.map(response => response.data);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to load product details. Please try again later.');
            }
        };

        if (cartItems.length > 0) {
            fetchProducts();
        }
    }, [cartItems]);

    const handleRemoveItem = async (productId: number) => {
        try {
            await axios.delete(`https://localhost:7295/api/cart/remove/${productId}`);
            setCartItems(prevItems => prevItems.filter(item => item.productId !== productId)); // Using previous state
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId)); // Удаляем товар из списка продуктов
        } catch (error) {
            console.error('Error removing item:', error);
            setError('Failed to remove item. Please try again later.');
        }
    };

    const totalPrice = products.reduce((sum, product) => {
        const cartItem = cartItems.find(item => item.productId === product.id);
        return sum + (cartItem ? product.price * cartItem.quantity : 0);
    }, 0);

    if (loading) {
        return <div>Loading...</div>; // Loading indicator
    }

    return (
        <div className="cart-container">
            <div className="glass-card">
                <h1 className="title">
                    Your <span>Cart</span>
                </h1>

                {error && <div className="error-message">{error}</div>} {/* Display error message */}

                {products.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-
                                .62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </div>
                        <p>Your cart is empty...</p>
                        <Link to="/shop" className="link-button">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {products.map((product) => {
                                const cartItem = cartItems.find(item => item.productId === product.id);
                                return (
                                    <div key={product.id} className="cart-item" data-aos="fade-up">
                                        <div className="item-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>

                                        <div className="item-details">
                                            <h3 className="item-title">{product.name}</h3>
                                            <div className="price-quantity">
                                                <span className="item-price">${product.price.toFixed(2)}</span>
                                                <div className="quantity-control">
                                                    <button className="quantity-btn">-</button>
                                                    <span className="quantity">{cartItem?.quantity}</span>
                                                    <button className="quantity-btn">+</button>
                                                </div>
                                            </div>
                                            <div className="item-subtotal">
                                                Subtotal: ${(product.price * (cartItem?.quantity || 0)).toFixed(2)}
                                            </div>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveItem(product.id)}
                                        >
                                            <svg viewBox="0 0 24 24">
                                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
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
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
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
