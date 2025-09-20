import React from "react";
import "./aboutus.css";

function Aboutus() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero text-center">
        <h1>🍴 Welcome to <span>BiteXpress</span></h1>
        <p>Your favorite stop for delicious Veg & Non-Veg meals</p>
      </section>

      {/* About Info Section */}
      <section className="about-content container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="images/about-food.jpg"
              alt="About BiteXpress"
              className="about-img"
            />
          </div>
          <div className="col-md-6">
            <h2>Who We Are</h2>
            <p>
              At <strong>BiteXpress</strong>, we believe food is more than just
              a meal – it’s an experience. From traditional Indian curries to
              modern delights, we bring you mouthwatering dishes crafted with
              love, fresh ingredients, and authentic flavors.
            </p>
            <p>
              Whether you’re craving a wholesome <em>Veg Thali</em> 🌱 or a
              spicy <em>Non-Veg feast</em> 🍗, BiteXpress serves you the best
              every single time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission text-center">
        <h2>✨ Our Mission</h2>
        <p>
          To serve tasty, healthy, and affordable food that brings joy to every
          bite. We’re committed to using fresh ingredients and delivering a
          memorable food journey for our customers.
        </p>
      </section>

      {/* Team Section */}
     <section className="about-team container-fluid">
        <h2 className="text-center">Meet Our Team 👨‍🍳</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="team-card">
              <img src="images/chef_suneel.png" alt="Chef" />
              <h4>Chef Ramesh</h4>
              <p>Master of Indian Spices</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="team-card">
              <img src="images/chef_anita.png" alt="Chef" />
              <h4>Chef Anita</h4>
              <p>Specialist in Veg Cuisine</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="team-card">
              <img src="images/chef_vikram.png" alt="Chef" />
              <h4>Chef Vikram</h4>
              <p>Grill & Non-Veg Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      {/* <footer className="about-footer text-center">
        <p>© {new Date().getFullYear()} BiteXpress | All Rights Reserved</p>
      </footer> */}
    </div>
  );
}

export default Aboutus;
