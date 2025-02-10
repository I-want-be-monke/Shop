import React, { useState } from 'react';
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

   
    const products: Product[] = [
        {
            id: 1,
            name: 'Sensual Massage Oil',
            price: 29.99,
            description: 'Premium organic massage oil with aromatic vanilla notes',
            image: 'https://i.pinimg.com/736x/20/c8/a5/20c8a59bf16ddc2bf767b2ab17965f31.jpg',
            category: 'Wellness'
        },
        {
            id: 2,
            name: 'Silk Sleep Mask',
            price: 45.50,
            description: 'Luxurious silk blindfold with adjustable strap',
            image: 'https://www.letu.ru/common/img/marketplace/f1ba3d07-7dfb-4417-afe6-21783923614d.jpg',
            category: 'Accessories'
        },
        {
            id: 3,
            name: 'Deluxe Bondage Set',
            price: 89.99,
            description: 'Premium leather restraint set with silk lining',
            image: 'https://m.media-amazon.com/images/I/61HwS4qEpPS._AC_SL1500_.jpg',
            category: 'BDSM'
        },
        {
            id: 4,
            name: 'Aphrodisiac Candles',
            price: 34.99,
            description: 'Set of 3 long-burning scented candles',
            image: 'https://i.etsystatic.com/18942962/r/il/6cd3b0/3386186702/il_fullxfull.3386186702_p0ur.jpg',
            category: 'Atmosphere'
        },
        {
            id: 5,
            name: 'butt plug',
            price: 129.99,
            description: 'Waterproof 10-speed vibrator with app control',
            image: 'https://www.dhresource.com/webp/m/0x0/f2/albu/g19/M01/4E/E7/rBVapmBYtFWAQkGJAAQrHj7UDtc08.jpeg',
            category: 'Toys'
        },
        {
            id: 6,
            name: 'Silk Restraint Kit',
            price: 65.00,
            description: 'Adjustable silk restraints with padded cuffs',
            image: 'https://avatars.mds.yandex.net/get-mpic/4393885/img_id7655031031452512041.jpeg/9hq',
            category: 'BDSM'
        },
        {
            id: 7,
            name: 'Vibrator',
            price: 49.99,
            description: 'LED mood diffuser with essential oils set',
            image: 'https://cdn.svetuzitka.com/media/catalog/product/cache/all/thumbnail/660x/9df78eab33525d08d6e5fb8d27136e95/e/3/e31211_1.jpg',
            category: 'Atmosphere'
        },
        {
            id: 8,
            name: 'Lace Body Set',
            price: 75.00,
            description: 'French lace lingerie set with garter belt',
            image: 'https://i.pinimg.com/originals/d5/82/13/d58213052362fcab7bde0bf9b135e5b7.jpg',
            category: 'Lingerie'
        },
        {
            id: 9,
            name: 'Strap-on',
            price: 39.99,
            description: 'Romantic truth or dare card game for couples',
            image: 'https://m.media-amazon.com/images/I/81J87oBsQzS._AC_UL960_QL65_.jpg',
            category: 'Games'
        },
        {
            id: 10,
            name: 'Sensual Wax Play',
            price: 54.95,
            description: 'Low-temperature massage candles set',
            image: 'https://thumbs.dreamstime.com/b/woman-body-care-long-female-tanned-legs-drips-acrylic-paint-melted-wax-perfect-smooth-soft-skin-pedicure-healthy-nails-206999712.jpg',
            category: 'Wellness'
        },
        {
            id: 11,
            name: 'Silk Robe',
            price: 89.95,
            description: 'Luxury kimono-style silk robe',
            image: 'https://cdn1.ozone.ru/s3/multimedia-n/6233897171.jpg',
            category: 'Lingerie'
        },
        {
            id: 12,
            name: 'Kama Sutra Dice',
            price: 24.99,
            description: 'Erotic position dice game for couples',
            image: 'https://ohoney.eu/img/cache/product/487948/639580_large.webp',
            category: 'Games'
        }
    ];

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