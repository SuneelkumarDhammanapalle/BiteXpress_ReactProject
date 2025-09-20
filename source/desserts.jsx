import React, { useState } from "react";
import "./desserts.css";
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
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
    slidesToSlide: 1,
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

function Sweets() {
  const sweets = useSelector((state) => state.products.sweets);
  const dispatch = useDispatch();

  // Price filter and pagination state
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and sort products
  const filteredProducts = sweets
    .filter((product) => {
      switch (priceFilter) {
        case "under-150":
          return product.price < 150;
        case "150-to-300":
          return product.price >= 150 && product.price <= 300;
        case "over-300":
          return product.price > 300;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (priceFilter === "low-to-high") return a.price - b.price;
      if (priceFilter === "high-to-low") return b.price - a.price;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
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
    toast.success(`${product.name} added to cart!`, { position: "top-right" });
  };

  return (
    <div className="desserts-bg">
      <div className="container-fluid py-5">
        <h1 className="text-center mb-4" id="font">
          🍰 Delicious Sweets
        </h1>

        {/* --- Carousel Section --- */}
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
            {sweets.slice(0, 5).map((product) => (
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

        {/* --- Product Grid and Filters --- */}
        <section className="products-grid-section">
          {/* ✅ Button-based Filter */}
          <div className="filter-section">
            {/* <h3 className="section-subtitle">Filter by Price</h3> */}
            <div className="filter-button-container">
              {[
                { value: "all", label: "All" },
                { value: "low-to-high", label: "Low → High" },
                { value: "high-to-low", label: "High → Low" },
                { value: "under-150", label: "Under ₹150" },
                { value: "150-to-300", label: "₹150 - ₹300" },
                { value: "over-300", label: "Over ₹300" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  className={`filter-btn ${
                    priceFilter === filter.value ? "active" : ""
                  }`}
                  onClick={() => {
                    setPriceFilter(filter.value);
                    setCurrentPage(1);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
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
                    <p className="card-text">Sweet, fresh & delightful.</p>
                    <h4 className="price-tag">₹{product.price}</h4>
                    <button
                      className="btn btn-add w-100"
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

        {/* Pagination */}
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

export default Sweets;
