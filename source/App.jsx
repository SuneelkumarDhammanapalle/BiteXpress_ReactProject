import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Home from "./home";
import Veg from "./veg";
import Nonveg from "./nonveg";
import Milkshakes from "./milkshakes";
import Sweets from "./desserts";
import Cart from "./cart";
import Orders from "./orders";
import Signup from "./signup";
import Aboutus from "./aboutus";
import ContactUs from "./contactus";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./login";

// Create a new component to handle header and navigation
const MainContent = () => {
  const location = useLocation(); // Now this is in a child component
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* HEADER WITH SEARCH BAR */}
      <header className="app-header py-4">
        <div className="container d-flex align-items-center justify-content-between flex-wrap">
          <Link to="/" className="d-flex align-items-center logo-container">
            <div className="header-text">
              <h1 className="m-0">BiteXpress</h1>
              <p className="m-0 tagline">Delicious Meals, Fresh Taste.</p>
            </div>
          </Link>
          <div className="header-right d-none d-md-flex align-items-center ms-auto">
            <div className="input-group search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search for food..."
                aria-label="Search for food"
              />
              <button className="btn btn-search-custom" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark main-menu sticky-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`} to="/">
                  🏠 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/veg' ? 'active-link' : ''}`} to="/veg">
                  🥦 Veg
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/nonveg' ? 'active-link' : ''}`} to="/nonveg">
                  🍗 Non-Veg
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/Milkshakes' ? 'active-link' : ''}`} to="/Milkshakes">
                  🥤 Milkshakes
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/desserts' ? 'active-link' : ''}`} to="/desserts">
                  🍰 Sweets
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link className={`nav-link ${location.pathname === '/cart' ? 'active-link' : ''}`} to="/cart">
                  🛒 Cart
                  {cartCount > 0 && (
                    <span className="badge cart-badge">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/orders' ? 'active-link' : ''}`} to="/orders">
                  📦 Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signup' ? 'active-link' : ''}`} to="/signup">
                  ✍️ SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/aboutus' ? 'active-link' : ''}`} to="/aboutus">
                  ℹ️ About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/contactus' ? 'active-link' : ''}`} to="/contactus">
                  📞 Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<Nonveg />} />
          <Route path="/Milkshakes" element={<Milkshakes />} />
          <Route path="/desserts" element={<Sweets />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <h5 className="footer-title">BiteXpress</h5>
              <p className="footer-slogan">
                Your Hunger, Our Mission. Delivering happiness, one bite at a time.
              </p>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/contactus">Contact</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="footer-title">Follow Us</h5>
              <div className="social-links d-flex justify-content-center justify-content-md-start">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
          <p className="copyright-text text-center">
            © {new Date().getFullYear()} BiteXpress. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;