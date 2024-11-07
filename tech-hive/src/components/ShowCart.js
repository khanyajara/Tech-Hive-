import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import '../styles/showCart.css';

const ShowCart = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        const fetchUser = async () => {
            const storedUid = localStorage.getItem('uid');
            if (storedUid) {
                try {
                    const response = await axios.get(`https://the-hive-backend.onrender.com/api/user/${storedUid}`);
                    if (response.data && response.data.id) {
                        setUser(response.data);
                    } else {
                        setError('User not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Failed to fetch user data');
                }
            } else {
                setError('No user logged in');
            }
        };

        fetchUser();
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

    const handleApprove = async (data) => {
        if (!user) {
            alert('Please log in to place your order');
            return;
        }

        const orderData = {
            uid: user.id,
            products: cart.map(product => ({
                id: product.id,
                name: product.name,
                quantity: 1,
                price: product.price
            })),
            totalAmount: totalPrice,
            paymentStatus: "Paid"
        };

        try {
            const response = await axios.post('https://the-hive-backend.onrender.com/api/paidOrder', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.orderId) {
                alert('Transaction completed and order placed successfully');
                setCart([]);
                localStorage.setItem('cart', JSON.stringify([]));
            } else {
                alert('Error placing the order');
            }
        } catch (error) {
            console.error('Error creating paid order', error);
            alert('Error processing your order');
        }
    };

    if (cart.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {error && <div className="error">{error}</div>}
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
