import React, { useState } from 'react';
import axios from 'axios';
import css from '../styles/orderTracking.css';

const API_URL = 'https://the-hive-backend.onrender.com/api';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_URL}/trackOrder/${orderId}`);
            setOrderDetails(response.data);
            setError(null);
        } catch (error) {
            setOrderDetails(null);
            setError("Order not found. Please check the order ID.");
        }
    };

    return (
        <div className="tracking-container">
            <h1>Track Your Order</h1>
            <form onSubmit={handleTrackOrder} className="tracking-form">
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <button type="submit">Track Order</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {orderDetails && (
                <div className="order-details">
                    <h2>Order ID: {orderDetails.id}</h2>
                    <p>Status: {orderDetails.status}</p>
                    <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>
                    <h3>Items:</h3>
                    <ul>
                        {orderDetails.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
