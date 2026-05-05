import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const img_url= "http://brianswala.alwaysdata.net/api/static/images/"
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Using your new AlwaysData link
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

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading StudySwap...</p>
            </div>
        );
    }

    return (
        <div className="products-wrapper">
            <div className="container">
                <header className="hub-header">
                    <h1 className="glow-text">StudySwap</h1>
                    <p>Exclusive deals for students, by students.</p>
                </header>

                <div className="products-grid">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div key={item.id} className="glass-card">
                                <div className="image-box">
                                    <img
                                        src={item.product_photo ? `${img_url}${item.product_photo}` : 'https://via.placeholder.com/300'}
                                        alt={item.product_name}
                                    />
                                </div>
                                <div className="card-details">
                                    <h3>{item.product_name}</h3>
                                    <p className="description">{item.product_description}</p>
                                    <div className="card-footer">
                                        <button
                                            className="view-btn"
                                            onClick={() => setSelectedProduct(item)}
                                        >
                                            View Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
                <div className="no-products">
                    <h3>Have anything you want to sell?</h3>
                    <Link to="/add-product" className="post-item-btn">
                        <button className='btn btn-info '> Post an Item</button>
                    </Link>
                </div>

            </div>
            {/* --- EXPANDED VIEW MODAL --- */}
{selectedProduct && (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
        <div className="expanded-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
            
            <div className="modal-content">
                <div className="modal-image">
                    <img 
                        src={img_url + selectedProduct.product_photo}
                        alt={selectedProduct.product_name} 
                    />
                </div>
                <div className="modal-info">
                    <h2 className="glow-text-small text-light">{selectedProduct.product_name}</h2>
                    <p className="modal-price text-light">KES {selectedProduct.product_cost}</p>
                    <div className="modal-desc-scroll">
                        <p className='text-light'>{selectedProduct.product_description}</p>
                    </div>
                    <Link to="/mpesa-payment" state={{ product: selectedProduct }}>
                        <button className="buy-btn btn btn-info">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)}
        </div>

    )
};

export default GetProducts;