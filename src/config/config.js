// src/localforageConfig.js
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "F8StoreDb",
  version: 1.0,
  storeName: "project08",
  description: "Xuân Pháo 19",
});

export default localforage;
