import React, { useEffect, useState } from 'react';
import './ShopShelf.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

const ShopShelf: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>('https://localhost:7295/api/products'); 
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.'); 
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (productId: number) => {
        setIsAdding(true);
        setSelectedProduct(productId);

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
                    <Link to="/cart" className="cart-link">
                        <svg className="cart-icon" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                        View Cart
                    </Link>
                </div>
                {error && <div className="error-message">{error}</div>} {/* Отображение сообщения об ошибке */}
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
