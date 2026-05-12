// working currently
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import GetProducts from './components/GetProducts';
import AddProduct from './components/AddProduct';
import MpesaPayment from './components/MPesaPayments';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        {/* LAYER 0: THE BACKGROUND VIDEO */}
        {/* This stays rendered at all times, no matter what page you are on */}
        <video autoPlay muted loop id="bg-video">
          <source src="background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> 

        {/* LAYER 1: THE NAVBAR */}
        <NavBar />
         {/* LAYER 2: THE SWITCHER */}
        {/* The Routes component ensures that ONLY ONE of these shows at a time */}
        <Routes>
          {/* Default path redirects
           to Sign In */}
          

          <Route path="/" element={<Navigate to="/" />} />
          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<GetProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/mpesa-payment" element={<MpesaPayment />} />
          {/* Catch-all: Redirect unknown URLs back to signin */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;