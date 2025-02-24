import React, { useState, useEffect } from 'react';
import './ShopShelf.css';
import { Link } from 'react-router-dom';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

const ShopShelf: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId: number) => {
        setIsAdding(true);
        setSelectedProduct(productId);

        // Здесь можно добавить логику для отправки запроса на добавление товара в корзину

        setTimeout(() => {
            setIsAdding(false);
            setSelectedProduct(null);
        }, 1500);
    };

    return (
        <div className="shop-container">
            <div className="glass-card">
                <h1 className="title">
                    Luxury <span>Collection</span>
                </h1>
                <div className="shop-header">
                    <h1 className="title">
                        Passion <span>Collection</span>
                    </h1>
                    <div className="header-controls">
                        <Link to="/settings" className="settings-link">
                            <svg className="gear-icon" viewBox="0 0 24 24">
                                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                            </svg>
                            Settings
                        </Link>
                    </div>
                    <Link to="/cart" className="cart-link">
                        <svg className="cart-icon" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        View Cart
                    </Link>
                </div>
                <div className="products-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            data-category={product.category}
                        >
                            <div className="product-image-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Image+Coming+Soon';
                                    }}
                                />
                                <div className="product-overlay">
                                    <button
                                        className={`add-to-cart ${selectedProduct === product.id && isAdding ? 'adding' : ''}`}
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        {isAdding && selectedProduct === product.id ? (
                                            <div className="loader"></div>
                                        ) : (
                                            <>
                                                <svg className="cart-icon" viewBox="0 0 24 24">
                                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                                </svg>
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="product-info">
                                <div className="product-category">{product.category}</div>
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-price">${product.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopShelf;
