

import React, { useState, useEffect } from 'react';

const AddToCart = ({ product }) => {
    const [cart, setCart] = useState(() => {
        
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleAddToCart = () => {
       
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
};

export default AddToCart;
