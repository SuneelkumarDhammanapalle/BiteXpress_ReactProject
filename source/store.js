import { configureStore, createSlice } from "@reduxjs/toolkit";

// Helper function to save cart state to localStorage
const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error(`Could not save state for key "${key}" to localStorage`, e);
  }
};

// Load persisted data for orders and cart from localStorage
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

// ========================
// Product Slice (Static Data)
// ========================
const productSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { id: 101, name: "Lemon Rice", price: 99.0, image: "images/lemonrice.jpg" },
      { id: 102, name: "Vegitable Biryani", price: 199.0, image: "images/vegbiryani.jpg" },
      { id: 103, name: "Veg-Fried Rice", price: 149.0, image: "images/vegfriedrice.jpg" },
      { id: 104, name: "Veg-Palao", price: 149.0, image: "images/vegpalao.jpg" },
      { id: 105, name: "Sambar Rice", price: 99.0, image: "images/sambarrice.webp" },
      { id: 106, name: "Gobi-Manchurian", price: 89.0, image: "images/gobimanchuriya.jpg" },
      { id: 107, name: "Paneer Biryabi", price: 199.0, image: "images/panneerbiryani.jpg" },
      { id: 108, name: "Mashroom Biryani", price: 199.0, image: "images/mashroombiryani.webp" },
      { id: 109, name: "Paneer Tikka", price: 199.0, image: "images/panneertikka.jpg" },
      { id: 110, name: "Spinach Rice", price: 199.0, image: "images/spinachrice.jpg" },
      { id: 111, name: "Curry Leaf", price: 199.0, image: "images/currylief.jpg" },
      { id: 112, name: "Mushroom Curry", price: 199.0, image: "images/mashroomcurry.jpg" },
    ],
    nonveg: [
      { id: 1, name: "Chicken Dhum Biryani", price: 199.0, image: "images/dhum biryani.webp" },
      { id: 2, name: "Fried Chicken Biryani", price: 299.0, image: "images/friedChickenBiryani.jpg" },
      { id: 3, name: "Chicken Mandi", price: 349.0, image: "images/ChickenMandi.jpg" },
      { id: 4, name: "KFC Chicken", price: 249.0, image: "images/kfcchicken.jpg" },
      { id: 5, name: "Mutton Dhum Biryani", price: 499.0, image: "images/muttondhumbiryani.jpg" },
      { id: 6, name: "Fried Mutton Biryani", price: 529.0, image: "images/friedmuttonbiryani.jpg" },
      { id: 7, name: "Mutton Mandi", price: 649.0, image: "images/muttonmandi.avif" },
      { id: 8, name: "Mutton Gravy Biryani", price: 699.0, image: "images/muttongravy.jpg" },
      { id: 9, name: "Fish Tikka Biryani", price: 499.0, image: "images/fishtikkabiryani.jpg" },
      { id: 10, name: "Fish Fry", price: 349.0, image: "images/Fishfry.jpg" },
      { id: 11, name: "Fish Curry", price: 499.0, image: "images/fishcurry.jpg" },
      { id: 12, name: "Fish Biryani", price: 249.0, image: "images/fishbiryani.webp" },
      { id: 13, name: "Prawn Biryani", price: 539.0, image: "images/prawnbiryani.jpg" },
      { id: 14, name: "Prawn Curry", price: 349.0, image: "images/prawncurry.jpg" },
      { id: 15, name: "Crab Biryani", price: 539.0, image: "images/crabbiryani.avif" },
      { id: 16, name: "Crab Curry", price: 349.0, image: "images/crabcurry.jpeg" },
    ],
    milkshakes: [
      { id: 201, name: "Milk Shake", price: 199.0, image: "images/milkshake.jpg" },
      { id: 202, name: "Strawberry Milkshake", price: 299.0, image: "images/strawberry.jpg" },
      { id: 203, name: "Creamsicle Milkshakes", price: 349.0, image: "images/Creamsicle.avif" },
      { id: 204, name: "Boozy Smores Shake", price: 249.0, image: "images/Boozy-Smores.webp" },
      { id: 205, name: "Red, White Shakes", price: 499.0, image: "images/Red, White.jpg" },
      { id: 206, name: "Grape Milk Shake", price: 529.0, image: "images/grape.avif" },
      { id: 207, name: "Lemon Pie Milkshakes", price: 649.0, image: "images/Lemon-Pie.webp" },
      { id: 208, name: "Peanut ButterMilkshake", price: 699.0, image: "images/PeanutButter.jpg" },
      { id: 209, name: "Oreo Cheese Milkshake", price: 499.0, image: "images/OreoCheese.jpg" },
      { id: 210, name: "Red Wine Milkshakes", price: 349.0, image: "images/RedWine.jpg" },
      { id: 211, name: "Sugar Cookie Milkshake", price: 499.0, image: "images/Cookie.jpg" },
      { id: 212, name: "Chocolate Shake", price: 249.0, image: "images/chocolate.avif" },
    ],
    sweets: [
      { id: 301, name: "Kheer", price: 99.0, image: "images/kheer.jpg" },
      { id: 302, name: "Gulab Jamun", price: 199.0, image: "images/gulabjamun.jpg" },
      { id: 303, name: "Jilebi", price: 149.0, image: "images/jilebi.jpg" },
      { id: 304, name: "Laddu", price: 149.0, image: "images/laddu.jpg" },
      { id: 305, name: "Palakova", price: 99.0, image: "images/palakova.webp" },
      { id: 306, name: "Mysore Pak", price: 89.0, image: "images/mysorepak.avif" },
    ],
  },
  reducers: {},
});

// ========================
// Cart Slice
// ========================
const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
      saveStateToLocalStorage("cart", state);
    },
    removeFromCart: (state, action) => {
      const newState = state.filter((p) => p.id !== action.payload);
      saveStateToLocalStorage("cart", newState);
      return newState;
    },
    clearCart: () => {
      saveStateToLocalStorage("cart", []);
      return [];
    },
    increaseQuantity: (state, action) => {
      const item = state.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
      saveStateToLocalStorage("cart", state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((p) => p.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity is 1, remove the item
          const newState = state.filter((p) => p.id !== action.payload);
          saveStateToLocalStorage("cart", newState);
          return newState;
        }
      }
      saveStateToLocalStorage("cart", state);
    },
  },
});

// ========================
// Orders Slice
// ========================
const ordersSlice = createSlice({
  name: "orders",
  initialState: savedOrders,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
      saveStateToLocalStorage("orders", state);
    },
  },
});

// ========================
// Export Actions & Store
// ========================
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const { addOrder } = ordersSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;