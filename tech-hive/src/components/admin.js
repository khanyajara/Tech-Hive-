import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from '../styles/admin.css';

const API_URL = 'http://localhost:5000/api';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [specs, setSpecs] = useState('');
    const [image, setImage] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [updateId, setUpdateId] = useState(null);
    const [ hide,setHide]=useState(false);
    const [hideProduct, setHideProduct]=useState(false)
    const [showProduct, setShowProduct]=useState(true)
    const [product,  setProduct] = useState({});


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/getProducts`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const AddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/addProduct`, {
                name,
                price,
                quantity,
                Specs: specs,
                Image: image,
                deviceType
            });
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const DeleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/deleteProduct/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    const resetForm = () => {
        setName('');
        setPrice('');
        setQuantity('');
        setSpecs('');
        setImage('');
        setDeviceType('');
        setUpdateId(null);
    };


    const HideProduct = (id) => {
        setHideProduct(id);
        setShowProduct(false)

    }

    return (
        <div className="admin-container">
            <div className="header">
                <h1>Admin Panel</h1>
                <button onClick={resetForm}>{updateId ? "Cancel Edit" : "Clear Form"}</button>
            </div>
            <form onSubmit={AddProduct} className="product-form">
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                <input type="text" placeholder="Specs" value={specs} onChange={(e) => setSpecs(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                <input type="text" placeholder="Device Type" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required />
                <button type="submit" className="submit-button">{updateId ? "Update Product" : "Add Product"}</button>
            </form>
            <h2>Product List</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <span className="product-info">{product.name} - ${product.price}</span>
                        <div className="product-actions">
                            <button className="edit-button" onClick={() => {
                                setName(product.name);
                                setPrice(product.price);
                                setQuantity(product.quantity);
                                setSpecs(product.Specs);
                                setImage(product.Image);
                                setDeviceType(product.deviceType);
                                setUpdateId(product.id);
                            }}>Edit</button>
                            <button className="delete-button" onClick={() => DeleteProduct(product.id)}>Delete</button>
                            <button className='Hide-button' onClick={()=>HideProduct(product.id)}>Hide</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
