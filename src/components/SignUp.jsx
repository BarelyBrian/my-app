import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    // Hooks for state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // Added back for M-Pesa compatibility
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    // handleSignUp aligned with original logic
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading("Creating your account...");

        try {
            // Logic must use FormData to be compatible with the PHP $_POST superglobal
            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('phone', phone); 
            data.append('password', password);

            // POST request to your AlwaysData API
            const response = await axios.post(
                "http://brianswala.alwaysdata.net/api/signup", 
                data
            );

            // Original logic: The backend must return {"message": "success"}
            if (response.data.message === "success") {
                setLoading("Registration successful! Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                // Displays the specific error from the PHP script (e.g., "Email already exists")
                setLoading(response.data.message || "Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setLoading("Network error: Check your connection.");
        }
    };

    return (
        <div className="products-wrapper">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                {/* Blue Glassmorphism Container */}
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '450px', 
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff' }}>JOIN STUDY SWAP</h2>
                        
                        <form onSubmit={handleSignUp} className="text-start">
                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input" 
                                    placeholder="Enter your name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control glass-input" 
                                    placeholder="student@campus.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                />
                            </div>

                            {/* Re-integrated Phone Field */}
                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Phone (M-Pesa)</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input" 
                                    placeholder="2547XXXXXXXX"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Create Password</label>
                                <input 
                                    type="password" 
                                    className="form-control glass-input" 
                                    placeholder="Min. 6 characters"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                />
                            </div>

                            <button type="submit" className="view-btn w-100 py-3" style={{ 
                                background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                border: 'none', 
                                color: '#fff',
                                borderRadius: '12px',
                                fontWeight: '600'
                            }}>
                                {loading.includes("Creating") ? "Syncing..." : "Create Account"}
                            </button>
                        </form>

                        {/* Visual Feedback Area */}
                        {loading && (
                            <div className="mt-3 p-2 rounded" style={{ background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                                <p className="text-info mb-0" style={{ fontSize: '0.9rem', color: '#00d2ff' }}>{loading}</p>
                            </div>
                        )}

                        <div className="mt-4">
                            <p className="text-light opacity-50" style={{ fontSize: '0.85rem' }}>
                                Already a member? <Link to="/login" className="text-info text-decoration-none" style={{ color: '#00d2ff' }}>Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;