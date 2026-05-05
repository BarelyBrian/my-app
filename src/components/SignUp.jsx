import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    // 1. Single State object for cleaner handling
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const navigate = useNavigate();

    // 2. Handle generic input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const data = new FormData();
            data.append("phone", formData.phone);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);

            const response = await axios.post("http://brianswala.alwaysdata.net/api/signup", data);

            if (response.data.status === "success" || response.data.user) {
                setMessage({ type: "success", text: "Account created! Redirecting to Sign In..." });
                setTimeout(() => navigate("/signin"), 2000);
            } else {
                setMessage({ type: "error", text: response.data.message || "Registration failed" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Server error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="glass-card">
                <h2>Register</h2>

                {message.text && (
                    <div className={`status-msg ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <div className="input-group">
                        <input type="text" name="username" required onChange={handleChange} />
                        <label>Username</label>
                    </div>

                    <div className="input-group">
                        <input type="email" name="email" required onChange={handleChange} />
                        <label>Email Address</label>
                    </div>
                    
                    <div className="input-group">
                        <input type="password" name="password" required onChange={handleChange} />
                        <label>Password</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name="phone" required onChange={handleChange} />
                        <label>Phone Number</label>
                    </div>


                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    <p className="footer-link">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;