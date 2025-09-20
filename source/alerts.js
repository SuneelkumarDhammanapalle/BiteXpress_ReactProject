// alerts.js
import Swal from "sweetalert2";

export const confirmRemoveAlert = async (itemName) => {
  const result = await Swal.fire({
    title: `Remove ${itemName}?`,
    text: "This item will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "Cancel"
  });
  return result.isConfirmed;
};

export const confirmClearCartAlert = async () => {
  const result = await Swal.fire({
    title: "Clear your cart?",
    text: "All items will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel"
  });
  return result.isConfirmed;
};

// --- CORRECTED ALERTS TO RETURN THE PROMISE ---
export const emptyCartAlert = () => {
  return Swal.fire({
    icon: "warning",
    title: "Your cart is empty!",
    text: "Please add some items before placing an order.",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
  });
};

export const orderSuccessAlert = () => {
  return Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Your order has been placed successfully.",
    showConfirmButton: true,
    confirmButtonColor: "#28a745",
  });
};

export const couponInvalidAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "Invalid Coupon",
    text: "The coupon code you entered is not valid.",
    confirmButtonText: "Try Again",
    confirmButtonColor: "#d33",
  });
};

export const couponAppliedAlert = (code) => {
  return Swal.fire({
    icon: "success",
    title: "Coupon Applied!",
    text: `Your coupon "${code}" has been successfully applied.`,
    showConfirmButton: true,
    confirmButtonColor: "#28a745",
  });
};

export const showSuccessToast = (message) => {
  return Swal.fire({
    toast: true,
    position: "top-right",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};