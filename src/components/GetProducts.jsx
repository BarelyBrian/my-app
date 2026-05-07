import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetProducts = () => {
    // --- PRODUCT STATES ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // --- CHATBOT STATES ---
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your StudySwap Assistant. Need help finding gear?", sender: "bot" }
    ]);
    const [userInput, setUserInput] = useState("");

    const img_url = "https://brianswala.alwaysdata.net/static/images/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
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

    // Filter logic
    const filteredProducts = products.filter(item =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product_description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Modal Scroll Lock
    useEffect(() => {
        document.body.style.overflow = selectedProduct ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProduct]);

    // --- CHAT LOGIC ---
    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { text: userInput, sender: "user" }];
        setMessages(newMessages);
        const query = userInput.toLowerCase();
        setUserInput("");

        setTimeout(() => {
            let botResponse = "Item requested is currently unavailable...";
            
            if (query.includes("hello") || query.includes("hi")) {
                botResponse = "Hey! Ready to swap some study gear today?";
            } else {
                const foundItems = products.filter(p => 
                    p.product_name.toLowerCase().includes(query)
                );
                if (foundItems.length > 0) {
                    botResponse = `Found ${foundItems.length} match(es) for "${query}". Take a look at the grid!`;
                }
            }
            setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
        }, 800);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner" style={{ borderTopColor: '#00d2ff' }}></div>
                <p className="text-light">Syncing StudySwap Hub...</p>
            </div>
        );
    }

    return (
        <div className="products-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="container">
                <header className="hub-header text-center mb-4">
                    <h1 className="glow-text" style={{ color: '#00d2ff', textShadow: '0 0 15px rgba(0,210,255,0.6)' }}>
                        StudySwap
                    </h1>
                    <p className="text-light opacity-75">Premium Student Marketplace</p>
                </header>

                {/* SEARCH & POST BAR */}
                <div className="d-flex justify-content-center mb-5">
                    <div className="glass-card p-4 w-100" style={{ 
                        maxWidth: '850px', 
                        background: 'rgba(255, 255, 255, 0.08)', 
                        backdropFilter: 'blur(20px)', 
                        borderRadius: '25px', 
                        border: '1px solid rgba(0, 210, 255, 0.3)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }}>
                        <div className="row align-items-end">
                            <div className="col-md-8">
                                <label className="text-light opacity-75 mb-2" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    SEARCH THE HUB
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input" 
                                    placeholder="Search by name or description..." 
                                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)', padding: '12px' }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 text-end mt-3 mt-md-0">
                                <label className="text-light opacity-75 mb-2 d-block text-md-center" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                    WANT TO POST AN ITEM?
                                </label>
                                <Link to="/add-product">
                                    <button className="view-btn py-2 px-4 w-100" style={{ background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', border: 'none', color: '#fff', borderRadius: '12px', fontWeight: 'bold', height: '50px' }}>
                                        Post Product
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div key={item.id} className="glass-card" style={{ border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                                <div className="image-box">
                                    <img src={`${img_url}${item.product_photo}${item.product_photo.includes('.') ? '' : '.jpg'}`} alt={item.product_name} />
                                </div>
                                <div className="card-details">
                                    <h3 className="text-light">{item.product_name}</h3>
                                    <p className="description text-light opacity-50">{item.product_description}</p>
                                    <div className="card-footer">
                                        <span className="price-tag" style={{ color: '#00d2ff' }}>KES {item.product_cost}</span>
                                        <button className="view-btn" style={{ background: 'rgba(0, 210, 255, 0.2)', color: '#00d2ff', border: '1px solid #00d2ff' }} onClick={() => setSelectedProduct(item)}>
                                            View Item
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100 p-5">
                            <p className="text-light opacity-50">No items matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- CYAN GLASSMOPHISM CHATBOT --- */}
            <div className="chatbot-container" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 3000 }}>
                {isChatOpen && (
                    <div className="glass-card mb-3 shadow-lg" style={{ 
                        width: '350px', height: '450px', 
                        background: 'rgba(15, 25, 35, 0.9)', 
                        backdropFilter: 'blur(25px)', 
                        border: '1px solid rgba(0, 210, 255, 0.4)', 
                        display: 'flex', flexDirection: 'column', borderRadius: '20px', overflow: 'hidden' 
                    }}>
                        <div style={{ background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', padding: '15px', color: 'white', fontWeight: 'bold' }}>
                            StudySwap Assistant
                        </div>
                        <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {messages.map((msg, index) => (
                                <div key={index} style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.sender === 'user' ? '#00d2ff' : 'rgba(255,255,255,0.1)',
                                    color: msg.sender === 'user' ? '#000' : '#fff',
                                    padding: '8px 12px', borderRadius: msg.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    maxWidth: '85%', fontSize: '0.9rem', fontWeight: msg.sender === 'user' ? '600' : '400'
                                }}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '15px', borderTop: '1px solid rgba(0, 210, 255, 0.2)' }}>
                            <div className="d-flex gap-2">
                                <input type="text" className="form-control" placeholder="Ask about an item..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0, 210, 255, 0.3)', color: 'white' }} />
                                <button onClick={handleSendMessage} className="btn" style={{ background: '#00d2ff', color: '#000', fontWeight: 'bold' }}>Send</button>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={() => setIsChatOpen(!isChatOpen)} style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                    border: 'none', color: 'white', fontSize: '24px', 
                    boxShadow: '0 0 20px rgba(0, 210, 255, 0.5)', cursor: 'pointer' 
                }}>
                    {isChatOpen ? '×' : '💬'}
                </button>
            </div>

            {/* MODAL */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="expanded-card" style={{ background: 'rgba(15, 25, 35, 0.95)', backdropFilter: 'blur(20px)' }} onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={`${img_url}${selectedProduct.product_photo}${selectedProduct.product_photo.includes('.') ? '' : '.jpg'}`} alt={selectedProduct.product_name} />
                            </div>
                            <div className="modal-info">
                                <h2 className="text-light" style={{ color: '#00d2ff' }}>{selectedProduct.product_name}</h2>
                                <p className="modal-price" style={{ color: '#00d2ff' }}>KES {selectedProduct.product_cost}</p>
                                <div className="modal-desc-scroll">
                                    <p className='text-light opacity-75'>{selectedProduct.product_description}</p>
                                </div>
                                <Link to="/mpesa-payment" state={{ product: selectedProduct }}>
                                    <button className="buy-btn btn w-100 mt-3" style={{ background: '#00d2ff', color: '#000', fontWeight: 'bold' }}>Buy Now</button>
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