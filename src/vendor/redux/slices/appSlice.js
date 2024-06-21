// src/redux/slices/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchGlobalsData, fetchData } from '@/api';
import { updatedData } from '@/vendor/';
/*

*/

// const data = await fetchGlobalsData();
// const initialState = {
//   favorites: data.favoritesData,
//   cart: data.cartData,
//   user: data.userData,
//   theme: data.themeData,
//   data: data.productsData.Grocery,
// };

const appSlice = createSlice({
  name: 'app',
  initialState: await fetchGlobalsData(),
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      const rootSite = document.querySelector('html');
      rootSite.setAttribute('data-bs-theme', action.payload.theme);
      state.theme = action.payload;
      updatedData('themeData', action.payload);
    },

    register: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.users.find((user) => user.username === username);
      if (!existingUser) {
        state.users.push({ username, password });
        state.user = { username };
      } else {
        // Xử lý khi người dùng đã tồn tại!
      }
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updatedUserInfo: (state, action) => {
      state.user = action.payload;
      updatedData('userData', action.payload);
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
      fetchData('productsData').then((data) => {
        const grocery = data.Grocery.map((item) => (item.id === productId ? { ...item, isLiked: !item.isLiked } : item));
        updatedData('productsData', { ...data, Grocery: grocery });
      });

      fetchData('favoritesData').then((favorite) => {
        const favorites = isLiked ? [...favorite, action.payload] : favorite.filter((item) => item.id !== productId);
        updatedData('favoritesData', favorites);
      });
    },
    updatedFavorite: (state, action) => {
      state.favorites = action.payload;
    },

    updatedProducts: (state, action) => {
      state.data = action.payload;
      fetchData('productsData').then((data) => {
        data = {
          ...data,
          Grocery: action.payload,
        };
        updatedData('productsData', data);
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
} = appSlice.actions;

export default appSlice.reducer;

/* *** */
