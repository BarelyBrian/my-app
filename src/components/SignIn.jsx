import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    // Logic Hooks
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // Feedback Hooks
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading("Verifying Credentials...");
        setError("");
        setSuccess("");

        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        try {
            // Using https for AlwaysData stability
            const response = await axios.post("https://brianswala.alwaysdata.net/api/signin", data);
            
            setLoading("");
            
            if (response.data.user) {
                setSuccess(response.data.message || "Login Successful!");
                
                // Save user object to local storage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                // Redirect to Home Hub
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                setError(response.data.message || "Invalid username or password.");
            }

            // Clear fields
            setUsername("");
            setPassword("");

        } catch (err) {
            setLoading("");
            setError(err.message || "Connection error. Hub unreachable.");
        }
    };

    return (
        <div className="products-wrapper">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                
                {/* High-Fidelity Glass Card */}
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '400px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(0, 210, 255, 0.3)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
                }}>
                    
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff', letterSpacing: '3px', fontWeight: '800' }}>
                            STUDYSWAP HUB
                        </h2>

                        <form onSubmit={submit} className="text-start">
                            {/* Username Input */}
                            <div className="form-group mb-3">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Username</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input"
                                    placeholder="Enter username"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={username} onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group mb-4">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control glass-input"
                                    placeholder="Enter password"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={password} onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>

                            {/* Dynamic Feedback UI */}
                            {loading && <div className="mb-3 text-info small text-center glow-text-blue">{loading}</div>}
                            {error && <div className="mb-3 p-2 text-center rounded" style={{ background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', fontSize: '0.85rem' }}>{error}</div>}
                            {success && <div className="mb-3 p-2 text-center rounded" style={{ background: 'rgba(0, 210, 255, 0.1)', color: '#00d2ff', border: '1px solid #00d2ff', fontSize: '0.85rem' }}>{success}</div>}

                            <button 
                                type="submit" 
                                disabled={loading !== ""}
                                className="w-100 py-3 d-flex align-items-center justify-content-center gap-2" 
                                style={{ 
                                    background: loading ? 'rgba(0, 210, 255, 0.1)' : 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                    border: 'none', 
                                    color: loading ? '#00d2ff' : '#000',
                                    fontWeight: '700',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease'
                                }}>
                                {loading ? "AUTHORIZING..." : "SIGN IN"}
                            </button>
                        </form>

                        <div className="mt-4">
                            <p className="text-light opacity-50" style={{ fontSize: '0.85rem' }}>
                                Don't have an account? <Link to="/signup" className="text-decoration-none" style={{ color: '#00d2ff', fontWeight: '600' }}>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;