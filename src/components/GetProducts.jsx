import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Synchronized with your AlwaysData www/static/images path
    const img_url = "https://brianswala.alwaysdata.net/static/images/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetching from your AlwaysData API endpoint
                const response = await axios.get("http://brianswala.alwaysdata.net/api/get_product_details");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
    if (selectedProduct) {
        // Lock the background scroll
        document.body.style.overflow = 'hidden';
    } else {
        // Unlock when closed
        document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProduct]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner" style={{ borderTopColor: '#00d2ff' }}></div>
                <p className="text-light">Syncing StudySwap Hub...</p>
            </div>
        );
    }

    return (
        <div className="products-wrapper">
            <div className="container">
                <header className="hub-header text-center mb-5">
                    <h1 className="glow-text" style={{ color: '#00d2ff', textShadow: '0 0 15px rgba(0,210,255,0.6)' }}>
                        StudySwap
                    </h1>
                    <p className="text-light opacity-75">Premium Student Marketplace</p>
                </header>

                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div key={item.id} className="glass-card" style={{ border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                                <div className="image-box">
                                    <img
                                        // Auto-append .jpg if missing, matching your WebDAV files
                                        src={item.product_photo && item.product_photo.includes('.') 
                                            ? `${img_url}${item.product_photo}` 
                                            : `${img_url}${item.product_photo}.jpg`}
                                        alt={item.product_name} 
                                        onError={(e) => {
                                            if (!e.target.src.includes('.png')) {
                                                e.target.src = `${img_url}${item.product_photo}.png`;
                                            } else {
                                                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
                                            }
                                        }}
                                    />
                                </div>
                                <div className="card-details">
                                    <h3 className="text-light">{item.product_name}</h3>
                                    <p className="description text-light opacity-50">{item.product_description}</p>
                                    <div className="card-footer">
                                        <span className="price-tag" style={{ color: '#00d2ff' }}>
                                            KES {item.product_cost}
                                        </span>
                                        <button
                                            className="view-btn"
                                            style={{ background: 'rgba(0, 210, 255, 0.2)', color: '#00d2ff', border: '1px solid #00d2ff' }}
                                            onClick={() => setSelectedProduct(item)}
                                        >
                                            View Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100 p-5">
                            <p className="text-light opacity-50">No items found in the marketplace.</p>
                        </div>
                    )}
                </div>

                {/* Sell Section with Blue Glass styling */}
                <div className="no-products text-center mt-5 p-4 glass-card" style={{ borderStyle: 'dashed', borderColor: 'rgba(0, 210, 255, 0.3)' }}>
                    <h3 className="text-light">Got something to swap?</h3>
                    <Link to="/add-product">
                        <button className='btn btn-info mt-2 px-4' style={{ background: '#00d2ff', border: 'none' }}>
                            Post an Item
                        </button>
                    </Link>
                </div>
            </div>

            {/* --- MODAL --- */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="expanded-card" style={{ background: 'rgba(15, 25, 35, 0.9)', backdropFilter: 'blur(20px)' }} onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img 
                                    src={selectedProduct.product_photo.includes('.') 
                                        ? `${img_url}${selectedProduct.product_photo}` 
                                        : `${img_url}${selectedProduct.product_photo}.jpg`} 
                                    alt={selectedProduct.product_name} 
                                />
                            </div>
                            <div className="modal-info">
                                <h2 className="text-light" style={{ color: '#00d2ff' }}>{selectedProduct.product_name}</h2>
                                <p className="modal-price text-info">KES {selectedProduct.product_cost}</p>
                                <div className="modal-desc-scroll">
                                    <p className='text-light opacity-75'>{selectedProduct.product_description}</p>
                                </div>
                                <Link to="/mpesa-payment" state={{ product: selectedProduct }}>
                                    <button className="buy-btn btn btn-info w-100 mt-3" style={{ background: '#00d2ff' }}>
                                        Buy Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetProducts;