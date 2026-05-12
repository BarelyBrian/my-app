import axios from "axios";
import { useState } from "react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

const MpesaPayement = () => {
    const location = useLocation();
    const { product } = location.state || {};
    
    const img_url = "https://brianswala.alwaysdata.net/static/images/";
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoading("please wait...");
        try {
            const data = new FormData();
            data.append('phone', phone);
            data.append('amount', product.product_cost);
            
            // Post to your AlwaysData backend
            const response = await axios.post('https://brianswala.alwaysdata.net/api/mpesa_payment', data);
            setLoading(response.data.message);
        } catch (error) {
            setLoading(error.message);
        }
    }

    if (!product) return (
        <div className="loader-container">
            <h3 className="text-light">Session expired.</h3>
            <Link to="/" className="btn btn-info mt-3">Return to Marketplace</Link>
        </div>
    );

    return (
        <div className="products-wrapper">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                {/* Main Glass Card with Blue tint */}
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '450px', 
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(0, 150, 255, 0.2)' 
                }}>
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff', textShadow: '0 0 10px rgba(0,210,255,0.5)' }}>
                            LIPA NA MPESA
                        </h2>
                        
                        {/* Product Summary Section */}
                        <div className="payment-image-preview mb-4">
                            <div className="image-box mx-auto" style={{ width: '120px', height: '120px', border: '2px solid rgba(0,210,255,0.3)' }}>
                                <img 
                                    src={product.product_photo.includes('.') 
                                        ? img_url + product.product_photo 
                                        : `${img_url}${product.product_photo}.jpg`} 
                                    alt="checkout item" 
                                    className="img-fluid rounded-circle" 
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Item'; }}
                                />
                            </div>
                            <div className="mt-3">
                                <h5 className="text-light mb-0">{product.product_name}</h5>
                                <p className="text-info font-weight-bold" style={{ color: '#00d2ff !important' }}>
                                    KES {product.product_cost}
                                </p>
                            </div>
                        </div>

                        {/* M-Pesa Form */}
                        <form onSubmit={submit} className="text-start">
                            <div className="form-group mb-4">
                                <label className="text-light mb-2 opacity-75" style={{ fontSize: '0.85rem' }}>
                                    M-Pesa Phone Number
                                </label>
                                <input 
                                    type="text"
                                    placeholder="2547XXXXXXXX"
                                    className="form-control glass-input"
                                    value={phone}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(0, 210, 255, 0.2)',
                                        color: 'white',
                                        padding: '12px'
                                    }}
                                />
                            </div>
                            
                            <button type="submit" className="view-btn w-100 py-3" style={{ 
                                background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                border: 'none',
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: '600'
                            }}>
                                {loading === "please wait..." ? "Processing..." : "Authorize Payment"}
                            </button>
                        </form>

                        {/* Status Message */}
                        {loading && (
                            <div className="mt-4 p-2 rounded" style={{ background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                                <p className="text-info mb-0" style={{ fontSize: '0.9rem', color: '#00d2ff' }}>{loading}</p>
                            </div>
                        )}
                        
                        <div className="mt-4">
                            <Link to="/products" className="text-light opacity-50 text-decoration-none" style={{ fontSize: '0.8rem' }}>
                                ← Cancel and Return
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MpesaPayement;