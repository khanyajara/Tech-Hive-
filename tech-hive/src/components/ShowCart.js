import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import '../styles/showCart.css';

const ShowCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((total, product) => {
        const price = parseFloat(product.price);
        return total + (isNaN(price) ? 0 : price);
    }, 0);

    const handleApprove = (data) => {
        alert('Transaction completed');
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    if (cart.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cart.map((product) => (
                    <div key={product.id} className="cart-item">
                        <img src={product.Image} alt={product.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h2 className="cart-item-name">{product.name}</h2>
                            <p className="cart-item-price">${product.price}</p>
                            <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
            </div>
            <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID", "currency": "USD" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: totalPrice.toFixed(2),
                                },
                            }],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        await actions.order.capture();
                        handleApprove(data);
                    }}
                    onError={(err) => {
                        console.error(err);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default ShowCart;
