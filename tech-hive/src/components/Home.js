// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AddToCart from './AddToCart';
import logo from '../components/removed-background.png'; 
import '../styles/home.css';

const API_URL = 'http://localhost:5000/api/getProducts';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
    }, []);

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
                        <li>Shop</li>
                        <li>About Us</li>
                        <li>Contact</li>
                    </ul>
                </nav>
                <input type="text" placeholder="Search..." className="search-bar" />
                <Link to="/cart" className="cart-icon">🛒</Link>
            </header>
            <div className="hero-section">
                <h1>Welcome to Tech-Hive Marketplace</h1>
                <button className="cta-button">Shop Now</button>
            </div>

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                            <img src={product.Image} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">${product.price}</p>
                                <AddToCart product={product} />
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
                            <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                                <img src={product.Image} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <AddToCart product={product} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

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

export default HomePage;
