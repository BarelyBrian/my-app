// working sign up?
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    // Logic Hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // Feedback Hooks
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const data = new FormData();
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('phone', phone);

        try {
            // Using https to match AlwaysData security
            const response = await axios.post("https://brianswala.alwaysdata.net/api/signup", data);
            
            setLoading(false);
            setSuccess("Account created successfully! Redirecting to login...");
            
            // Clear fields
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

            // Redirect to Sign In after success so they can log in
            setTimeout(() => {
                navigate("/signin");
            }, 2000);

        } catch (err) {
            setLoading(false);
            setError(err.message || "An error occurred during sign up.");
        }
    }

    return (
        <div className="products-wrapper">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '95vh' }}>
                
                {/* Cyan Glassmorphism Card */}
                <div className="glass-card-auth p-4 w-100" style={{ 
                    maxWidth: '450px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(0, 210, 255, 0.3)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.7)',
                }}>
                    
                    <div className="text-center">
                        <h2 className="glow-text-small mb-4" style={{ color: '#00d2ff', letterSpacing: '3px', fontWeight: '800' }}>
                            CREATE ACCOUNT
                        </h2>

                        <form onSubmit={submit} className="text-start">
                            {/* Username */}
                            <div className="form-group mb-3">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Username</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input"
                                    placeholder="Choose a username"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={username} onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group mb-3">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control glass-input"
                                    placeholder="Enter university email"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={email} onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group mb-3">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Password</label>
                                <input 
                                    type="password" 
                                    className="form-control glass-input"
                                    placeholder="Create a strong password"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={password} onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>

                            {/* Phone */}
                            <div className="form-group mb-4">
                                <label className="text-light opacity-50 mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone Number</label>
                                <input 
                                    type="text" 
                                    className="form-control glass-input"
                                    placeholder="e.g. 0712345678"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(0, 210, 255, 0.1)', borderRadius: '12px' }}
                                    required value={phone} onChange={(e) => setPhone(e.target.value)} 
                                />
                            </div>

                            {/* Feedback Messages */}
                            {error && <div className="mb-3 p-2 text-center rounded" style={{ background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', fontSize: '0.85rem' }}>{error}</div>}
                            {success && <div className="mb-3 p-2 text-center rounded" style={{ background: 'rgba(0, 210, 255, 0.1)', color: '#00d2ff', border: '1px solid #00d2ff', fontSize: '0.85rem' }}>{success}</div>}

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-100 py-3 d-flex align-items-center justify-content-center gap-2" 
                                style={{ 
                                    background: loading ? 'rgba(0, 210, 255, 0.1)' : 'linear-gradient(45deg, #00d2ff, #3a7bd5)', 
                                    border: 'none', 
                                    color: loading ? '#00d2ff' : '#000',
                                    fontWeight: '700',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease'
                                }}>
                                {loading ? (
                                    <>
                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                        <span>PROCESSING...</span>
                                    </>
                                ) : (
                                    "JOIN THE HUB"
                                )}
                            </button>
                        </form>

                        <div className="mt-4">
                            <p className="text-light opacity-50" style={{ fontSize: '0.85rem' }}>
                                Already a member? <Link to="/signin" className="text-decoration-none" style={{ color: '#00d2ff', fontWeight: '600' }}>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;