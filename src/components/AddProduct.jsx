import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const data = new FormData();
        data.append('product_name', name);
        data.append('product_cost', price);
        data.append('product_description', description);
        data.append('product_photo', image);

        try {
            const response = await axios.post("http://brianswala.alwaysdata.net/api/add_product", data);
            
            if (response.data.status && response.data.status.toLowerCase() === "success") {
                setMessage({ type: 'success', text: 'Product listed successfully!' });
                setTimeout(() => navigate("/products"), 1500);
            } else {
                setMessage({ type: 'error', text: response.data.message || "Failed to add product" });
            }
        } catch (err) {
            console.error("Upload Error:", err);
            setMessage({ type: 'error', text: "Network error. Could not reach server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="products-wrapper" style={{ minHeight: '100vh', padding: '40px 0' }}>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '550px', 
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px'
                }}>
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff', letterSpacing: '2px' }}>LIST NEW ITEM</h2>
                        
                        <form onSubmit={handleSubmit} className="text-start">
                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Product Name</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input"
                                    placeholder="e.g. Calculus Textbook"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Price (KES)</label>
                                <input 
                                    type="number" 
                                    className="form-control glass-input"
                                    placeholder="Enter cost"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Description</label>
                                <textarea 
                                    className="form-control glass-input"
                                    placeholder="Condition, details, etc."
                                    rows="3"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Product Image</label>
                                <input 
                                    type="file" 
                                    className="form-control glass-input"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    onChange={handleFileChange}
                                    required 
                                />
                            </div>

                            {message.text && (
                                <div className="mb-3 p-2 rounded text-center" style={{ 
                                    background: message.type === 'error' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 210, 255, 0.1)',
                                    border: `1px solid ${message.type === 'error' ? '#ff4d4d' : '#00d2ff'}`
                                }}>
                                    <p style={{ color: message.type === 'error' ? '#ff4d4d' : '#00d2ff', fontSize: '0.85rem', margin: 0 }}>
                                        {message.text}
                                    </p>
                                </div>
                            )}

                            <button type="submit" className="view-btn w-100 py-3" disabled={loading} style={{ 
                                background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                border: 'none', 
                                color: '#fff',
                                fontWeight: '600',
                                borderRadius: '12px'
                            }}>
                                {loading ? "Uploading..." : "List Product"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;