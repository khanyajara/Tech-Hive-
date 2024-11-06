import React, { useState } from 'react';

const AddToCart = ({ product, onAddToCart }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        onAddToCart(); 
    };

    return (
        <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
};

export default AddToCart;
