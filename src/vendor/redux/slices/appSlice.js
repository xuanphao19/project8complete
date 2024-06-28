import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "@/api";
import { updatedData } from "@/vendor/";
/*

*/
const initialState = {
  favorites: [],
  cart: [],
  user: {},
  theme: {},
  data: [],
  status: "idle",
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.favorites = action.payload.favoritesData;
      state.cart = action.payload.cartData;
      state.user = action.payload.userData;
      state.theme = action.payload.themeData;
      state.data = action.payload.productsData.Grocery;
      state.status = "succeeded";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      const rootSite = document.querySelector("html");
      rootSite.setAttribute("data-bs-theme", action.payload.theme);
      state.theme = action.payload;
      updatedData("themeData", action.payload);
    },

    register: (state, action) => {
      const { email } = action.payload;
      const existingUser = state.user.email === email;

      if (!existingUser) {
        const newUser = { ...state.user, ...action.payload };
        state.user = newUser;
        updatedData("userData", newUser);
      }
    },

    login: (state, action) => {
      state.user = action.payload;
      updatedData("userData", action.payload);
    },

    logout: (state, action) => {
      state.user = action.payload;
      updatedData("userData", action.payload);
    },

    updatedUserInfo: (state, action) => {
      state.user = action.payload;
      updatedData("userData", action.payload);
    },

    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload);
    },

    toggleFavorite: (state, action) => {
      const productId = action.payload.id;
      const isLiked = action.payload.isLiked;

      const existingIndex = state.favorites.findIndex((product) => product.id === productId);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
      fetchData("productsData").then((data) => {
        const grocery = data.Grocery.map((item) => (item.id === productId ? { ...item, isLiked: !item.isLiked } : item));
        updatedData("productsData", { ...data, Grocery: grocery });
      });

      fetchData("favoritesData").then((favorite) => {
        const favorites = isLiked ? [...favorite, action.payload] : favorite.filter((item) => item.id !== productId);
        updatedData("favoritesData", favorites);
      });
    },
    updatedFavorite: (state, action) => {
      state.favorites = action.payload;
    },

    updatedProducts: (state, action) => {
      state.data = action.payload;
      fetchData("productsData").then((data) => {
        data = {
          ...data,
          Grocery: action.payload,
        };
        updatedData("productsData", data);
      });
    },
  },
});

export const {
  updatedFavorite,
  toggleFavorite,
  addToCart,
  removeFromCart,
  register,
  login,
  logout,
  updatedUserInfo,
  toggleTheme,
  setTheme,
  updatedProducts,
  setInitialData,
} = appSlice.actions;

export default appSlice.reducer;
