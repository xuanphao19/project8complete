import axios from "axios";
import { createGlobalsData, getData } from "@/vendor/";
import { getRandomItems } from "@/utils";

const dataURL = "/storage.json";

const loadProductDataFromFile = async () => {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch globals data:", error);
    return null;
  }
};

const getGlobalsData = async () => {
  try {
    const data = await loadProductDataFromFile();
    return data;
  } catch (error) {
    console.error("Failed to load data from file:", error);
    // Fallback to fetching data from the API
    return axios.get(dataURL);
  }
};

const fetchGlobalsData = async () => {
  try {
    const data = await getGlobalsData();
    const localeData = await createGlobalsData(data);

    return localeData;
  } catch (error) {
    console.error("Failed to fetchGlobalsData from file fetch.js:", error);
  }
};

const fetchLoaderRootData = async () => {
  try {
    const localeData = await createGlobalsData();
    return localeData;
  } catch (error) {
    console.error("Failed to fetchGlobalsData from file fetch.js:", error);
  }
};

const fetchData = async (key, id, quantity = 0) => {
  try {
    const data = await getData(key, id, quantity);
    return data;
  } catch (error) {
    console.error("Failed to fetchData from file fetch.js:", error);
  }
};

const fetchRandomItems = async (key = "productsData", quantity = 1) => {
  try {
    const data = await getData(key);
    let dataRandom;
    if (data) {
      dataRandom = await getRandomItems(quantity, data.Grocery);
    } else {
      "Not found data of" + key;
    }
    return dataRandom;
  } catch (error) {
    console.error("Failed to fetchData from file fetch.js:", error);
  }
};

export { fetchData, fetchRandomItems, fetchLoaderRootData };
export default fetchGlobalsData;
