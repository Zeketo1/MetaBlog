import { createPersistentStore } from "eoion";

const store = createPersistentStore("store", {
  dark: false,
  contentLoaded: [],
});

export default store;
