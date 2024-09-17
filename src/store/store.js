import { createPersistentStore, createStore } from "eoion";

const store = createPersistentStore("store", {
  dark: false,
  contentLoaded: [],
});

export const store2 = createStore({
  skeletonCon: true,
  skeletonCon2: true,
  imageUrl: [],
  imageUrl2: [],
  blogsStoreFiltered: [],
  blogsStore: [],
  author: "",
});

export default store;
