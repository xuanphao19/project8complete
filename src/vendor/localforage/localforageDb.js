import { F8Db } from "@/config";
import { getWifeNeighbors } from "@/utils";

const USER_KEY = "userData";
const THEME_KEY = "themeData";
const PRODUCTS_KEY = "productsData";
const FAVORITES_KEY = "favoritesData";
const CART_KEY = "cartData";

const keys = [USER_KEY, THEME_KEY, PRODUCTS_KEY, FAVORITES_KEY, CART_KEY];

/* ==== GlobalsData ===== */
const createGlobalsData = async (data) => {
  try {
    const localeDataPromises = keys.map(async (key) => {
      await fakeNetwork(key);
      let value = await F8Db.getItem(key);
      if (!value && data) {
        await set(key, data[key]);
        value = await F8Db.getItem(key);
      }
      return { key, value };
    });

    const resolvedPromises = await Promise.all(localeDataPromises);
    const localeData = resolvedPromises.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});

    return localeData;
  } catch (error) {
    console.error("Error createGlobalsData:", error);
    return null;
  }
};
/* *** */
/* ===== GET Data ===== */
const getData = async (key = PRODUCTS_KEY, id = 0, quantity) => {
  await fakeNetwork();
  try {
    let data = await F8Db.getItem(key);
    if (!!id && data && !!quantity) {
      data = getWifeNeighbors(data.Grocery, id, quantity);
    } else if (!!id && data) {
      data = data.Grocery.filter((item) => item.id === +id);
    }
    return data;
  } catch (error) {
    console.error(`Error getting data getData ${key}:`, error);
    return null;
  }
};

/* ======  Updated Data ===== */

const updatedData = async (key, updates, id) => {
  try {
    await fakeNetwork(key);
    let data = await F8Db.getItem(key);
    let item;

    if (id) {
      item = data.find((item) => item.id === id);
    } else item = data;

    if (!item && id) throw new Error(`No data found for id: ${id} ⭐`);
    if (item) Object.assign(item, updates);

    if (key === "favoritesData") {
      await set(key, updates);
    } else if (key && data) {
      await set(key, data);
    }
    return item;
  } catch (error) {
    console.error(`Error updating data for key: ${key}`, error);
    throw error;
  }
};
/* ======  Remove Products  ===== */
const removeProducts = async (key, id) => {
  await fakeNetwork(key);
  try {
    const data = await getData();
    const products = await getData(key);
    if (!data || !products) throw new Error("Data not found");
    // Cập nhật danh sách Grocery và favorites
    const updatedGrocery = data.Grocery.map((item) => (item.id === +id ? { ...item, isLiked: false } : item));
    const updatedProduct = products.filter((item) => item.id !== +id);

    // Lưu dữ liệu đã cập nhật vào localforage removed successfully
    await set("productsData", { ...data, Grocery: updatedGrocery });
    await set(key, updatedProduct);
  } catch (error) {
    console.error(`Error removing from removeProducts:`, error);
  }
};
/* ===== clearData ===== */
const clearData = async (key) => {
  try {
    await F8Db.removeItem(key);
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};
/* ===== UserAuth ===== */
const clearUserAuth = async () => {
  await fakeNetwork(user);
  try {
    await F8Db.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error clearing user auth:", error);
  }
};
/* ===== saveUserAuth ===== */
const saveUserAuth = async (user) => {
  try {
    user.loginAt = `${new Date().toLocaleTimeString("vi-VN")}/${new Date().toLocaleDateString("vi-VN")}`;
    await set(USER_KEY, user);
  } catch (error) {
    console.error("Error saving user auth:", error);
  }
};
/* ====== set item to local ===== */
const set = (key, value) => {
  return F8Db.setItem(key, value);
};
/* ====== fakeCache ===== */
let fakeCache = {};
const fakeNetwork = async (key) => {
  if (!key) fakeCache = {};
  if (fakeCache[key]) return;
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 500);
  });
};

export { removeProducts, createGlobalsData, getData, clearData, updatedData, clearUserAuth };
export default saveUserAuth;
