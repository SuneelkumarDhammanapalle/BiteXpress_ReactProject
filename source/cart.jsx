import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  addOrder,
} from "./store";
import { offers, coupons, calculateDiscount } from "./DiscountUtils";
import "./cart.css";
import emailjs from "@emailjs/browser";
import { QRCodeCanvas } from "qrcode.react";
import { useReward } from "react-rewards";
import {
  emptyCartAlert,
  orderSuccessAlert,
  couponInvalidAlert,
  couponAppliedAlert,
  confirmRemoveAlert,
  confirmClearCartAlert,
} from "./alerts";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrData, setQrData] = useState("");

  const { reward: rewardCouponConfetti } = useReward("couponRewardId", "confetti", {
    lifetime: 150,
    angle: 90,
    decay: 0.94,
    spread: 90,
    startVelocity: 30,
    elementCount: 50,
  });

  const { reward: rewardOrderConfetti } = useReward("orderRewardId", "confetti", {
    lifetime: 300,
    angle: 90,
    decay: 0.94,
    spread: 90,
    startVelocity: 45,
    elementCount: 150,
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const predefinedDiscount =
    selectedOffer && typeof selectedOffer !== "string"
      ? calculateDiscount(subtotal, selectedOffer)
      : 0;

  const couponDiscount = appliedCoupon
    ? calculateDiscount(subtotal, appliedCoupon)
    : 0;

  const totalDiscount = predefinedDiscount + couponDiscount;
  const taxRate = 0.18;
  const taxAmount = (subtotal - totalDiscount) * taxRate;
  const shippingCharge = 50;
  const finalTotal = subtotal - totalDiscount + taxAmount + shippingCharge;

  const applyPredefinedDiscount = (offer) => {
    setAppliedCoupon(null);
    const discountValue = calculateDiscount(subtotal, offer);
    if (discountValue > 0) {
      setSelectedOffer(offer);
      setDiscountError("");
    } else {
      setSelectedOffer(null);
      setDiscountError("❌ Invalid discount for this order.");
    }
  };

  const applyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );
    if (coupon) {
      setAppliedCoupon(coupon);
      couponAppliedAlert(coupon.label).then(() => {
        rewardCouponConfetti();
      });
    } else {
      setAppliedCoupon(null);
      couponInvalidAlert();
    }
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
    if (method === "qr") {
      setQrData(
        `upi://pay?pa=suneelkumar17264@oksbi&pn=BiteXpress&am=${finalTotal.toFixed(
          2
        )}&cu=INR`
      );
    } else {
      setQrData("");
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      emptyCartAlert();
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method first.");
      return;
    }

    if (!customerEmail.trim()) {
      alert("Please enter your email to receive the order confirmation.");
      return;
    }

    const orderDetails = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      email: customerEmail,
      items: cartItems,
      subtotal,
      discount: totalDiscount,
      tax: taxAmount,
      shipping: shippingCharge,
      total: finalTotal,
      paymentMethod,
    };

    dispatch(addOrder(orderDetails));
    dispatch(clearCart());
    setQrData("");

    orderSuccessAlert().then(() => {
      rewardOrderConfetti({
        elementCount: 250,
        spread: 120,
        startVelocity: 50,
        lifetime: 350,
        angle: 90,
        decay: 0.92,
        colors: ["#FFC107", "#E91E63", "#03A9F4", "#4CAF50"],
      });
    });

    const templateParams = {
      to_email: customerEmail,
      order_id: orderDetails.id,
      order_date: orderDetails.date,
      subtotal: subtotal.toFixed(2),
      offer_discount: predefinedDiscount.toFixed(2),
      coupon_discount: couponDiscount.toFixed(2),
      shipping: shippingCharge.toFixed(2),
      tax: taxAmount.toFixed(2),
      total: finalTotal.toFixed(2),
      email: customerEmail,
      orders: cartItems.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: item.price.toFixed(2),
        image: item.image,
      })),
    };

    emailjs
      .send(
        "service_3u6n5w7",
        "template_s7aanfn",
        templateParams,
        "-nSPCgpBvKzjXmxVE"
      )
      .then(
        (response) => {
          console.log("✅ Email sent successfully!", response.status, response.text);
        },
        (error) => {
          console.error("❌ Email sending failed:", error);
          alert(`Email failed: ${error.text}`);
        }
      );
  };

  const handleRemoveItem = async (name) => {
    const confirmed = await confirmRemoveAlert(name);
    if (confirmed) dispatch(removeFromCart(name));
  };

  const handleClearCart = async () => {
    const confirmed = await confirmClearCartAlert();
    if (confirmed) dispatch(clearCart());
  };

  return (
    <div className="cart-bg">
      <div className="container-wrapper">
        <h2 className="text-center section-title" id="font">
          Your Cart
        </h2>
        <div className="cart-content-layout">
          {cartItems.length === 0 ? (
            <AnimatePresence>
              <motion.div
                className="empty-cart"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {qrData && paymentMethod === "qr" ? (
                  <div className="qr-section">
                    <h4>Your Payment QR Code</h4>
                    <QRCodeCanvas
                      value={qrData}
                      size={180}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={true}
                    />
                    <p>Scan this QR to pay via UPI</p>
                  </div>
                ) : (
                  "Your cart is empty 🛒"
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              <div className="cart-items-column">
                <AnimatePresence>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <motion.div
                        className="cart-card"
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="cart-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-info">
                          <h5>{item.name}</h5>
                          <div className="price">₹{item.price.toFixed(2)}</div>
                        </div>
                        <div className="cart-quantity">
                          <motion.button
                            className="minus-btn"
                            onClick={() => dispatch(decreaseQuantity(item.name))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ➖
                          </motion.button>
                          <span>{item.quantity}</span>
                          <motion.button
                            className="plus-btn"
                            onClick={() => dispatch(increaseQuantity(item.name))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ➕
                          </motion.button>
                        </div>
                        <div className="cart-total">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                        <motion.button
                          className="btn-remove"
                          onClick={() => handleRemoveItem(item.name)}
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ❌
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              <div className="billing-column">
                <motion.div
                  className="discounts-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h4>Available Discounts</h4>
                  <div className="discount-buttons">
                    {offers.map((offer) => (
                      <motion.button
                        key={offer.id}
                        onClick={() => applyPredefinedDiscount(offer)}
                        className={`discount-btn ${selectedOffer?.id === offer.id ? "applied" : ""}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {offer.label}
                      </motion.button>
                    ))}
                  </div>
                  {discountError && <p className="error-msg">{discountError}</p>}
                  <div className="coupon-box">
                    <input
                      type="text"
                      className="coupon-input"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <motion.button
                      className="apply-btn"
                      onClick={applyCoupon}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  className="cart-footer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3>
                    Subtotal: <span>₹{subtotal.toFixed(2)}</span>
                  </h3>
                  {predefinedDiscount > 0 && selectedOffer && (
                    <h3 className="text-success">
                      {selectedOffer.label} Discount:{" "}
                      <span>-₹{predefinedDiscount.toFixed(2)}</span>
                    </h3>
                  )}
                  {couponDiscount > 0 && appliedCoupon && (
                    <h3 className="text-success">
                      {appliedCoupon.label} Coupon Discount:{" "}
                      <span>-₹{couponDiscount.toFixed(2)}</span>
                    </h3>
                  )}
                  {totalDiscount > 0 && (
                    <h3 className="text-success">
                      Total Savings: <span>-₹{totalDiscount.toFixed(2)}</span>
                    </h3>
                  )}
                  <h3>
                    Tax (18%): <span>₹{taxAmount.toFixed(2)}</span>
                  </h3>
                  <h3>
                    Shipping: <span>₹{shippingCharge.toFixed(2)}</span>
                  </h3>
                  <h2 className="final-total">
                    Final Total: <span>₹{finalTotal.toFixed(2)}</span>
                  </h2>
                  <div className="email-box">
                    <label htmlFor="customer-email" className="email-label">
                      Enter your email (required)
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="email-input"
                      required
                    />
                  </div>
                  <div className="payment-method">
                    <h4>Select Payment Method:</h4>
                    <div className="payment-buttons">
                      <motion.button
                        className={`payment-btn ${paymentMethod === "card" ? "selected" : ""}`}
                        onClick={() => handlePaymentMethodSelection("card")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Card Payment
                      </motion.button>
                      <motion.button
                        className={`payment-btn ${paymentMethod === "qr" ? "selected" : ""}`}
                        onClick={() => handlePaymentMethodSelection("qr")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        QR Code
                      </motion.button>
                    </div>
                  </div>
                  <motion.button
                    className="btn-place-order"
                    onClick={handlePlaceOrder}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Place Order
                  </motion.button>
                  <motion.button
                    className="btn-clear"
                    onClick={handleClearCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Cart
                  </motion.button>
                  {paymentMethod === "qr" && qrData && (
                    <motion.div
                      className="qr-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4>Your Payment QR Code</h4>
                      <QRCodeCanvas
                        value={qrData}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                      />
                      <p>Scan this QR to pay via UPI</p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
      <div id="couponRewardId" style={{ position: "fixed", top: "50%", left: "50%" }} />
      <div id="orderRewardId" style={{ position: "fixed", top: "50%", left: "50%" }} />
    </div>
  );
}