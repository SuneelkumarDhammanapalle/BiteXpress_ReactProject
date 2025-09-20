import React, { useState } from "react";
import "./contactus.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation here if needed.
    // In a real app, you would send this data to a backend server.
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    setFormData({ fullName: "", email: "", message: "" }); // Clear the form
  };

  return (
    <div className="contact-page full-bleed">
      <h1 className="text-center mb-4">📞 Contact Us</h1>
      <h4 className="text-center mb-5 text-muted">
        Have questions? We'd love to hear from you! Fill out the form or reach us directly.
      </h4>

      <div className="row gx-0 gy-4">
        <div className="col-12 col-md-6">
          <div className="contact-card p-4 shadow-sm">
            <h3 className="mb-3">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-contact w-100 bg-warning">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="contact-card p-4 shadow-sm">
            <h3 className="mb-3">Our Info</h3>
            <p><strong>📍 Address:</strong> 123 BiteXpress Street, Hyderabad, India</p>
            <p><strong>📧 Email:</strong> support@bitexpress.com</p>
            <p><strong>📱 Phone:</strong> +91 9347807471</p>
            <hr />
            <h5>🕒 Business Hours</h5>
            <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
            <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;