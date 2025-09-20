import React, { useState } from "react";
import "./milkshakes.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// 🔄 Updated responsive settings for 3 items and one-by-one sliding
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // ⬅️ Changed to 1 for smooth, one-by-one sliding
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
    slidesToSlide: 1, // ⬅️ Changed to 1
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function Milkshakes() {
  const milkshakeProducts = useSelector((state) => state.products.milkshakes);
  const dispatch = useDispatch();

  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = milkshakeProducts
    .filter((product) => {
      switch (priceFilter) {
        case "under-150":
          return product.price < 150;
        case "150-to-300":
          return product.price >= 150 && product.price <= 300;
        case "over-300":
          return product.price > 300;
        case "low-to-high":
        case "high-to-low":
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (priceFilter === "low-to-high") {
        return a.price - b.price;
      }
      if (priceFilter === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      toast.info("You're on the first page!", { position: "top-right" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      toast.info("You're on the last page!", { position: "top-right" });
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
    });
  };

  return (
    <div className="milkshake-bg">
      <div className="container-fluid py-5">
        <h1 className="text-center mb-4" id="font">
          🥤 Delicious Milkshakes
        </h1>
        <section className="carousel-section mb-5">
          <h2 className="section-subtitle text-center mb-4">
            Top Picks of the Month
          </h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showDots={true}
            arrows={true}
            className="product-carousel"
          >
            {milkshakeProducts.slice(0, 5).map((product) => (
              <div key={product.name} className="carousel-product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="carousel-product-img"
                />
                <div className="carousel-card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="price-tag">₹{product.price}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
        <section className="products-grid-section">
  <div className="filter-section d-flex flex-column align-items-center mb-4">
    {/* <h2 className="section-subtitle">Our Full Menu</h2> */}
    <div className="filter-button-container mt-2 mt-md-0">
              <button
                className={`filter-btn ${priceFilter === "all" ? "active" : ""}`}
                onClick={() => {
                  setPriceFilter("all");
                  setCurrentPage(1);
                }}
              >
                All
              </button>
              <button
                className={`filter-btn ${
                  priceFilter === "low-to-high" ? "active" : ""
                }`}
                onClick={() => {
                  setPriceFilter("low-to-high");
                  setCurrentPage(1);
                }}
              >
                Price: Low to High
              </button>
              <button
                className={`filter-btn ${
                  priceFilter === "high-to-low" ? "active" : ""
                }`}
                onClick={() => {
                  setPriceFilter("high-to-low");
                  setCurrentPage(1);
                }}
              >
                Price: High to Low
              </button>
              <button
                className={`filter-btn ${
                  priceFilter === "under-150" ? "active" : ""
                }`}
                onClick={() => {
                  setPriceFilter("under-150");
                  setCurrentPage(1);
                }}
              >
                Under ₹150
              </button>
              <button
                className={`filter-btn ${
                  priceFilter === "150-to-300" ? "active" : ""
                }`}
                onClick={() => {
                  setPriceFilter("150-to-300");
                  setCurrentPage(1);
                }}
              >
                ₹150 - ₹300
              </button>
              <button
                className={`filter-btn ${
                  priceFilter === "over-300" ? "active" : ""
                }`}
                onClick={() => {
                  setPriceFilter("over-300");
                  setCurrentPage(1);
                }}
              >
                Over ₹300
              </button>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {currentProducts.map((product) => (
              <div className="col" key={product.name}>
                <div className="card h-100 shadow-sm product-card">
                  <div className="image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Farm-fresh and healthy.</p>
                    <h4 className="price-tag">₹{product.price}</h4>
                    <button
                      className="btn-add w-100"
                      onClick={() => handleAddToCart(product)}
                    >
                      🛒 Add To Cart
                    </button>
                  </div>
              </div>
            </div>
            ))}
          </div>
        </section>
        {totalPages > 1 && (
          <div className="pagination-container mt-4 text-center">
            <button
              className={`pagination-btn ${
                currentPage === 1 ? "disabled-btn" : "prev-btn"
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${
                  currentPage === index + 1 ? "active-btn" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`pagination-btn ${
                currentPage === totalPages ? "disabled-btn" : "next-btn"
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default Milkshakes;