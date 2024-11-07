import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

const ViewCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);

        const total = savedCart.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }, []);

    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const viewProduct = (product) => {
        setSelectedProduct(product);
    };

    const closeProductPopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.Image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Device Type: {item.deviceType}</p>
                                    <button onClick={() => handleRemoveItem(item.id)} className="remove-item">
                                        Remove
                                    </button>
                                    <button onClick={() => viewProduct(item)} className="view-details">
                                        View Product Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Total Price: ${totalPrice}</h2>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                </div>
            )}

            {selectedProduct && (
                <div className="product-popup">
                    <div className="popup-content">
                        <span className="close-popup" onClick={closeProductPopup}>&times;</span>
                        <img src={selectedProduct.Image} alt={selectedProduct.name} className="popup-image" />
                        <h3>{selectedProduct.name}</h3>
                        <p>Price: ${selectedProduct.price}</p>
                        <p>Quantity: {selectedProduct.quantity}</p>
                        <p>Device Type: {selectedProduct.deviceType}</p>
                        <Link to={`/product/${selectedProduct.id}`} className="go-to-product-page">
                            Go to Product Page
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCart;
