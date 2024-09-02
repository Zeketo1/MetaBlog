import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "metablog-74526.firebaseapp.com",
  projectId: "metablog-74526",
  storageBucket: "metablog-74526.appspot.com",
  messagingSenderId: "105024628666",
  appId: "1:105024628666:web:9bce34886e9b5aab335f83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDB = getStorage(app);

// Init collections
const colBlogs = collection(db, "Blogs");
const colUsers = collection(db, "Users");

// Toastify
export const showToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    icon: type === "success" ? "🎉" : "⚠️",
    style: {
      backgroundColor: type === "success" ? "#48bb78" : "#f56565",
      color: "#fff",
    },
    className: `custom-toast-${type}`,
    bodyClassName: `custom-toast-${type}-body`,
  });
};

// Authentication
// SignUp
const handleSignupForm = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional user info (like username) in Firestore
    await setDoc(doc(db, "Users", user.uid), {
      username,
      email,
      id: user.uid,
      createdAt: new Date(),
    });
  } catch (error) {
    showToast(`Action failed: ${error.message}`, "error");
  }
};

// Login
let loginUserEmail;
const handleLoginForm = async (e, email, password) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userUid = userCredential.user.uid;
    // Get all documents in the collection
    const querySnapshot = await getDocs(colUsers);

    // Create an array of documents with id and data
    const allDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredDoc = allDocs.find((doc) => doc.id === userUid);

    loginUserEmail = userCredential.user.email;
    window.location.href = "/create";
    showToast(`Success! Welcome back, ${filteredDoc.username}!`, "success");
  } catch (error) {
    console.log(error);
    showToast(`Action failed: ${error.message}`, "error");
  }
};

// SignUp with Google
const signupWithGoogle = () => {
  let username;

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      username = user.displayName;
    }
  });

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, provider)
    .then(() => {
      showToast(`Success! Welcome back ${username}!`, "success");
      window.location.href = "/create";
    })
    .catch((error) => {
      showToast(`Google sign-in failed: ${error.message}`, "error");
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      showToast(`User signed out!`, "success");
      window.location.href = "/";
    })
    .catch((error) => showToast(`Action failed: ${error.message}`, "error"));
};

export {
  colUsers,
  colBlogs,
  handleLoginForm,
  handleSignupForm,
  logout,
  signupWithGoogle,
};
