import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./veg.css";

// 🆕 New imports for Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// 🔄 Updated responsive settings for one-by-one sliding
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

function Veg() {
  const vegProducts = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredProducts = vegProducts
    .filter((product) => {
      switch (priceFilter) {
        case "under-50":
          return product.price < 50;
        case "50-to-200":
          return product.price >= 50 && product.price <= 200;
        case "over-200":
          return product.price > 200;
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
    if (currentPage === 1) {
      toast.info("You're already on the first page!", { position: "top-right" });
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage === totalPages) {
      toast.info("You're already on the last page!", { position: "top-right" });
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, { position: "top-right" });
  };

  return (
    <div className="veg-bg">
      <div className="container-fluid py-5">
       <h1 className="font-title">🥦 Farm-Fresh Veggies</h1>
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
            {vegProducts.slice(0, 5).map((product) => (
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
        
        <div className="filter-section d-flex flex-column align-items-center mb-4">
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
              className={`filter-btn ${priceFilter === "low-to-high" ? "active" : ""}`}
              onClick={() => {
                setPriceFilter("low-to-high");
                setCurrentPage(1);
              }}
            >
              Price: Low to High
            </button>
            <button
              className={`filter-btn ${priceFilter === "high-to-low" ? "active" : ""}`}
              onClick={() => {
                setPriceFilter("high-to-low");
                setCurrentPage(1);
              }}
            >
              Price: High to Low
            </button>
            <button
              className={`filter-btn ${priceFilter === "under-50" ? "active" : ""}`}
              onClick={() => {
                setPriceFilter("under-50");
                setCurrentPage(1);
              }}
            >
              Below ₹50
            </button>
            <button
              className={`filter-btn ${priceFilter === "50-to-200" ? "active" : ""}`}
              onClick={() => {
                setPriceFilter("50-to-200");
                setCurrentPage(1);
              }}
            >
              ₹50 - ₹200
            </button>
            <button
              className={`filter-btn ${priceFilter === "over-200" ? "active" : ""}`}
              onClick={() => {
                setPriceFilter("over-200");
                setCurrentPage(1);
              }}
            >
              Above ₹200
            </button>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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
                      <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-light">No products found.</p>
          )}
        </div>
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Veg;