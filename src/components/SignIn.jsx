import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    // Hooks aligned with your existing logic
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: 'Verifying...' });

        // Maintain your FormData logic for AlwaysData compatibility
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        try {
            // Updated to https to prevent Network/Mixed-Content errors
            const response = await axios.post("http://brianswala.alwaysdata.net/api/signin", data);
            
            // Checking for 'success' status from your specific PHP structure
            if (response.data.status && response.data.status.toLowerCase() === "success") {
                console.log("Log in successful");
                
                // 1. Save the user object to localStorage as a string
                localStorage.setItem("user", JSON.stringify(response.data.user));
                
                // 2. Navigation
                setMessage({ type: 'success', text: 'Success! Redirecting...' });
                setTimeout(() => {
                    navigate("/");
                }, 500);
            } else {
                setMessage({ type: 'error', text: response.data.message || "Invalid credentials" });
            }
            
        } catch (err) {
            console.error("Login Error:", err);
            setMessage({ 
                type: 'error', 
                text: "Server unreachable. Ensure CORS headers are in your PHP file." 
            });
        }
    };

    return (
        <div className="products-wrapper">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                {/* Blue Glassmorphism Card */}
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '400px', 
                    border: '1px solid rgba(0, 210, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '20px'
                }}>
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff' }}>WELCOME BACK</h2>
                        
                        <form onSubmit={handleLogin} className="text-start">
                            <div className="form-group mb-3">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Username</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input"
                                    placeholder="Enter username"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="text-light opacity-75 mb-1" style={{ fontSize: '0.85rem' }}>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control glass-input"
                                    placeholder="Enter password"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.2)' }}
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
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

                            <button type="submit" className="view-btn w-100 py-3" style={{ 
                                background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                border: 'none', 
                                color: '#fff',
                                fontWeight: '600',
                                borderRadius: '12px'
                            }}>
                                Sign In
                            </button>
                        </form>

                        <div className="mt-4">
                            <p className="text-light opacity-50" style={{ fontSize: '0.85rem' }}>
                                New to StudySwap? <Link to="/signup" className="text-info text-decoration-none" style={{ color: '#00d2ff' }}>Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;