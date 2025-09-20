import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./orders.css";
import { coupons, offers } from "./DiscountUtils";

// Helper function to find the label for a discount
const getDiscountLabel = (appliedCouponCode, totalDiscount, subtotal) => {
  if (!totalDiscount || totalDiscount === 0) {
    return null;
  }

  // Find the coupon from the coupons array
  const coupon = coupons.find(c => c.code.toLowerCase() === appliedCouponCode?.toLowerCase());
  
  // Find the offer from the offers array
  const offer = offers.find(o => {
    // Check if the total discount matches an offer's value
    if (o.type === 'percentage') {
      return Math.abs(subtotal * (o.value / 100) - totalDiscount) < 0.01;
    }
    if (o.type === 'flat') {
      return Math.abs(o.value - totalDiscount) < 0.01;
    }
    return false;
  });

  if (coupon) {
    return `Coupon (${coupon.label})`;
  } else if (offer) {
    return `Offer (${offer.label})`;
  } else {
    return "Discount"; // Default label if no specific match is found
  }
};

export default function Orders() {
  const orders = useSelector((state) => state.orders);

  // New code to reverse the array
  // Create a shallow copy of the orders array and reverse it
  const reversedOrders = [...orders].reverse();

  if (reversedOrders.length === 0) {
    return (
      <div className="orders-empty">
        <h2 className="empty-text">You have no orders yet.</h2>
        <p className="text-muted">Start shopping and place your first order!</p>
      </div>
    );
  }

  return (
    <div className="orders-wrapper">
      <h2 className="page-title">My Orders</h2>
      <div className="orders-grid">
        {reversedOrders.map((order) => { // Use the reversed array here
          const discountLabel = getDiscountLabel(order.couponCode, order.discount, order.subtotal);
          return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h5>Order #{order.id}</h5>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-body">
                <h6>Items</h6>
                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <strong>₹{item.price * item.quantity}</strong>
                    </li>
                  ))}
                </ul>
                <div className="order-totals">
                  <p>
                    Subtotal: <span>₹{order.subtotal.toFixed(2)}</span>
                  </p>
                  {order.discount > 0 && (
                    <p className="text-success">
                      {discountLabel}:{" "}
                      <span>-₹{order.discount.toFixed(2)}</span>
                    </p>
                  )}
                  <p>
                    Tax: <span>₹{order.tax.toFixed(2)}</span>
                  </p>
                  <p>
                    Shipping: <span>₹{order.shipping.toFixed(2)}</span>
                  </p>
                  <h5>
                    Total:{" "}
                    <span className="total-amount">
                      ₹{order.total.toFixed(2)}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="order-footer">
                <p>Sent to: {order.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}