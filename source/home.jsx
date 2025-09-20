import React from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  const scrollToOffers = () => {
    const section = document.getElementById("offers-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <video className="bg-video" src="images/background_video.mp4" autoPlay loop muted playsInline></video>
        <div className="hero-text-content">
          <h1>
            🍴 Welcome to <span>BiteXpress</span>
          </h1>
          <p>
            Experience <strong>authentic flavors</strong>, fresh ingredients,
            and quick delivery – because good food makes life better.
          </p>
          <button className="explore-btn" onClick={scrollToOffers}>
            Explore Menu
          </button>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="offers-section" className="home-highlights text-center">
        <h2 className="mb-5">Explore Our Delicious Menu</h2>
        <div className="row g-4">
          {/* Veg */}
          <div className="col-6 col-md-3">
            <a href="/veg" className="card-link">
              <div className="highlight-card card h-100">
                <img src="images/veg/lemonrice.jpg" alt="Veg" />
                <div className="card-body">
                  <h4>Fresh Veg Dishes 🌱</h4>
                  <p>Healthy, tasty vegetarian meals.</p>
                </div>
              </div>
            </a>
          </div>
          {/* Non-Veg */}
          <div className="col-6 col-md-3">
            <a href="/nonveg" className="card-link">
              <div className="highlight-card card h-100">
                <img src="images/non-veg/ChickenMandi.jpg" alt="Non-Veg" />
                <div className="card-body">
                  <h4>Spicy Non-Veg 🍗</h4>
                  <p>Juicy, flavorful curries & grills.</p>
                </div>
              </div>
            </a>
          </div>
          {/* Milkshakes */}
          <div className="col-6 col-md-3">
            <a href="/milkshakes" className="card-link">
              <div className="highlight-card card h-100">
                <img src="images/milkshakes/OreoCheese.jpg" alt="Milkshake" />
                <div className="card-body">
                  <h4>Chill MilkShakes 🥤</h4>
                  <p>Cool milkshakes & refreshing drinks.</p>
                </div>
              </div>
            </a>
          </div>
          {/* Sweets */}
          <div className="col-6 col-md-3">
            <a href="/desserts" className="card-link">
              <div className="highlight-card card h-100">
                <img src="images/sweets/laddu.jpg" alt="Sweets" />
                <div className="card-body">
                  <h4>Delicious Sweets 🍩</h4>
                  <p>Traditional & modern sweets.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about">
        <h2>Why Choose BiteXpress?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Lightning Fast Delivery</h4>
            <p>Get your food delivered piping hot, right when you crave it.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h4>Top Quality Ingredients</h4>
            <p>Only the freshest produce, meats, and spices for our dishes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h4>Affordable Pricing</h4>
            <p>Delicious meals that won’t burn a hole in your pocket.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h4>Customer Satisfaction</h4>
            <p>Your happiness is our secret ingredient for success.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="home-reviews text-center">
        <h2 className="mb-5">What Our Customers Say</h2>
        <Carousel indicators={false} controls={false}>
          <Carousel.Item>
            <div className="review-card">
              <p>"The food arrived so quickly and was absolutely delicious! The Chicken Mandi is a must-try."</p>
              <h4>- Neha M.</h4>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="review-card">
              <p>"BiteXpress never disappoints. The quality of ingredients is top-notch and the flavors are amazing."</p>
            <h4>- Harismitha D.</h4>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="review-card">
              <p>"I love the variety on the menu. The sweet treats are the perfect way to end a meal."</p>
            <h4>- Lakshmi Sri S.</h4>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
}

export default Home;