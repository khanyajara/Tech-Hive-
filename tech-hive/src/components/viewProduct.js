import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from '../styles/product.css'

const ViewProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://the-hive-backend.onrender.com/api/getProducts/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="view-product-container">
            <h1>{product.name}</h1>
            <img src={product.Image} alt={product.name} />
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Specifications: {product.Specs}</p>
            <p>Device Type: {product.deviceType}</p>
        </div>
    );
};

export default ViewProduct;
