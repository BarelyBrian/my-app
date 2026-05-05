import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/products" style={{ fontWeight: 'bold', color: '#00d2ff' }}>
                    BRIAN_PRO_JECT
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">  
                </button>
                <div className="ms-auto">
                    <Link className="btn btn-outline-info me-2" to="/signin">Login</Link>
                    <Link className="btn btn-info" to="/signup">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar; // CRITICAL: This line must exist!