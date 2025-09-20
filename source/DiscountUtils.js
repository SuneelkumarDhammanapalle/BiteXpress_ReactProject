// DiscountUtils.js

// Predefined discount offers
export const offers = [
  {
    id: 1,
    label: "🔥 10% OFF on Orders Above ₹500",
    code: "SAVE10",
    discountType: "percent",
    value: 10,
    minAmount: 500,
  },
  {
    id: 2,
    label: "🥳 Flat ₹100 OFF on First Order",
    code: "WELCOME100",
    discountType: "flat",
    value: 100,
    minAmount: 0,
  },
  {
    id: 3,
    label: "💳 20% Cashback with PayTM",
    code: "PAYTM20",
    discountType: "percent",
    value: 20,
    minAmount: 300,
  },
];

// Coupon-based discounts
export const coupons = [
  { code: "DISCOUNT10", discountType: "percent", value: 10 },
  { code: "DISCOUNT20", discountType: "percent", value: 20 },
  { code: "DISCOUNT30", discountType: "percent", value: 30 },
];

// Unified function
export function calculateDiscount(total, offerOrCode) {
  if (!offerOrCode) return 0;

  let discountValue = 0;

  if (typeof offerOrCode === "string") {
    // Coupon
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === offerOrCode.toLowerCase()
    );
    if (!coupon) return 0;

    if (coupon.discountType === "percent") {
      discountValue = (total * coupon.value) / 100;
    } else {
      discountValue = coupon.value;
    }
  } else {
    // Predefined offer
    const offer = offerOrCode;

    if (offer.minAmount && total < offer.minAmount) {
      return 0;
    }

    if (offer.discountType === "percent") {
      discountValue = (total * offer.value) / 100;
    } else {
      discountValue = offer.value;
    }
  }

  return discountValue;
}
