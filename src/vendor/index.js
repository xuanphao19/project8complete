export { default as TippyModal } from "./tippy/TippyModalCustom";
export { default as saveUserAuth, createGlobalsData, getData, clearData, updatedData, removeProducts } from "./localforage/localforageDb";
export {
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
} from "./redux/slices/appSlice";
export { RootState } from "./redux/store";
export { default as ReactMagnifier } from "./reactMagnifier/ReactMagnifier";
