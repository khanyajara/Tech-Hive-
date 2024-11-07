import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AddToCart from './AddToCart';
import logo from '../components/removed-background.png'; 
import '../styles/home.css';

const API_URL = 'https://the-hive-backend.onrender.com/api/getProducts';
const USER_API_URL = 'https://the-hive-backend.onrender.com/api/user';  

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                setProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();

        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(savedCart.length);

        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            console.log('User data from localStorage:', JSON.parse(savedUser));
            setUser(JSON.parse(savedUser)); 
        }
    }, []);

    const handleAddToCart = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(savedCart.length);
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (products.length === 0) return <div className="error">No products available.</div>;

    const featuredProducts = products.slice(0, 5);
    const categorizedProducts = products.reduce((acc, product) => {
        const deviceType = product.deviceType;
        if (!acc[deviceType]) {
            acc[deviceType] = [];
        }
        acc[deviceType].push(product);
        return acc;
    }, {});

    return (
        <div className="home-container">
            <header className="header">
                <img src={logo} alt="Logo" className="logo1" />
                <nav className="navigation">
                    <ul>
                        <li>Home</li>
                        <li onClick={() => navigate('/LoginAdmin')}>Admin</li>
                        <li>About Us</li>
                        <li onClick={() => navigate('/user')}>Profile</li>
                    </ul>
                </nav>
                <input type="text" placeholder="Search..." className="search-bar" />
                <Link to="/cart" className="cart-icon">
                    🛒
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </Link>
            </header>
            <div className="hero-section">
                <h1>Welcome to Tech-Hive Marketplace</h1>
                <button className="cta-button">Shop Now</button>
            </div>

            {user && (
                <section className="user-info">
                    <h2>Welcome, {user.firstName} {user.lastName}</h2>
                    <p>Email: {user.email}</p>
                </section>
            )}

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.Image}
                                alt={product.name}
                                className="product-image"
                                onClick={() => openProductModal(product)}
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">${product.price}</p>
                                <AddToCart product={product} onAddToCart={handleAddToCart} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {Object.keys(categorizedProducts).map((deviceType) => (
                <section key={deviceType} className="categorized-products">
                    <h2>{deviceType}</h2>
                    <div className="product-grid">
                        {categorizedProducts[deviceType].map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.Image}
                                    alt={product.name}
                                    className="product-image"
                                    onClick={() => openProductModal(product)}
                                />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <AddToCart product={product} onAddToCart={handleAddToCart} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            {showModal && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeProductModal} />
            )}

            <section className="newsletter-signup">
                <h2>Stay Updated!</h2>
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="subscribe-button">Subscribe</button>
            </section>
            <footer className="footer">
                <p>&copy; 2024 Tech-Hive. All rights reserved.</p>
            </footer>
        </div>
    );
};

const ProductModal = ({ product, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={onClose}>✖</button>
            <img src={product.Image} alt={product.name} className="modal-product-image" />
            <h3>{product.name}</h3>
            <p><strong>Specifications:</strong>{product.Specs}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p>Device-type: {product.deviceType}</p>
        </div>
    </div>
);

export default HomePage;
