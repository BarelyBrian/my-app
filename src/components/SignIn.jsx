import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Maintain your FormData logic for AlwaysData compatibility
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);

        try {
            const response = await axios.post("http://brianswala.alwaysdata.net/api/signin", data);
            
            // Check for 'success' status from your PHP
            if (response.data.status && response.data.status.toLowerCase() === "success") {
                console.log("Log in successful");
                
                // 1. Save the user object to localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // 2. FORCE REDIRECT: window.location.href forces the browser 
                // to refresh and recognize the new login state immediately.
                navigate("/");
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
        <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* Glassmorphism Card */}
            <div className="glass-card" style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(15px)', 
                padding: '40px', 
                borderRadius: '20px', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                width: '350px',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '20px' }}>Welcome Back</h2>
                
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="form-control mb-3"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="form-control mb-3"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    {message.text && (
                        <p style={{ color: message.type === 'error' ? '#ff4d4d' : '#00ff00', fontSize: '0.9rem' }}>
                            {message.text}
                        </p>
                    )}

                    <button type="submit" className="btn btn-info w-100 mt-2" style={{ fontWeight: 'bold' }}>
                        Sign In
                    </button>
                </form>

                <p className="mt-4" style={{ fontSize: '0.85rem' }}>
                    New here? <Link to="/signup" style={{ color: '#00d2ff', textDecoration: 'none' }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;