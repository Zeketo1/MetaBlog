import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
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
const auth = getAuth(app);
const db = getFirestore(app);

// Init collections
const colBlogs = collection(db, "Blogs");

// Adding new blogs
// const addBlog = async (e, content, date, image, name, title) => {
//   e.preventDefault();
//   try {
//     await addDoc(colBlogs, {
//       content,
//       date,
//       image,
//       name,
//       title,
//   })

//   console.log("Document added with ID: ", docRef.id);

//   // Update the document to include the document ID
//   await updateDoc(docRef, {
//     id: docRef.id,
//   });
//   } catch (e) {
//     console.log("Error: " + e.message);
    
//   }
  
// };

// Saving my ass via adding testing doc
const addBlog = async () => {
  try {
    await addDoc(colBlogs, {
      title: "The Rise of Artificial Intelligence: Transforming Our World",
      article: "Artificial Intelligence (AI) is no longer a futuristic concept but a powerful technology that is rapidly transforming industries, economies, and daily life. From healthcare and finance to entertainment and education, AI's impact is pervasive and growing, promising to revolutionize how we live, work, and interact with the world around us. As we delve deeper into the capabilities of AI, it's clear that this technology will continue to shape our future in profound and unprecedented ways",
      date: "14/11/2020",
      image: "Blog10",
      image2: "Blog10S",
      quote: '"AI is not just about creating smarter machines; its about amplifying human potential and creating a future where technology and humanity coexist in harmony."',
      name: "Pavel Danilyuk",
      type: "Technology",
      tipheader1: "AI in Healthcare: Revolutionizing Medicine",
      tipheader2: "AI in Business: Driving Innovation and Efficiency",
      tipheader3: "AI in Daily Life: Enhancing Convenience and Personalization",
      tipheader4: "AI in Education: Transforming Learning and Teaching",
      tipheader5: "The Future of AI: Opportunities and Challenges",
      tip1: "One of the most significant areas where AI is making a difference is in healthcare. AI-powered tools and algorithms are being used to diagnose diseases, predict patient outcomes, and personalize treatment plans. For example, AI can analyze medical images, such as X-rays and MRIs, with remarkable accuracy, often detecting conditions that might be missed by human eyes.  In addition, AI is playing a crucial role in drug discovery, helping researchers identify potential new treatments faster and more efficiently than traditional methods. Virtual health assistants, powered by AI, are also improving patient care by providing 24/7 access to medical advice and support.",
      tip2: "Businesses across various sectors are leveraging AI to drive innovation and improve efficiency. In finance, AI algorithms are used for everything from fraud detection to investment management, analyzing vast amounts of data in real-time to make informed decisions. In manufacturing, AI-driven robots and automation systems are streamlining production processes, reducing errors, and increasing output.  AI is also transforming customer service, with chatbots and virtual assistants handling a growing number of customer interactions. These AI-powered tools can answer queries, process orders, and provide personalized recommendations, improving customer satisfaction and freeing up human agents to handle more complex tasks.",
      tip3: "AI is increasingly becoming a part of our daily lives, often in ways we might not even realize. From voice-activated virtual assistants like Siri and Alexa to personalized recommendations on streaming services and online shopping platforms, AI is enhancing convenience and personalization in our everyday experiences.  Smart home devices, powered by AI, can learn our preferences and habits, adjusting lighting, temperature, and security settings to suit our needs. AI-driven apps help us navigate traffic, translate languages, and even monitor our health and fitness. The integration of AI into consumer technology is making our lives more connected, efficient, and tailored to our individual preferences.",
      tip4: "AI is also making its mark on education, transforming how students learn and how teachers teach. AI-powered educational tools can provide personalized learning experiences, adapting to each student's pace and style of learning. These tools can identify areas where students are struggling and offer targeted resources to help them improve.  For teachers, AI can assist in administrative tasks, such as grading and scheduling, freeing up more time for instruction and student interaction. AI-driven analytics can also provide insights into student performance, helping educators identify trends and make data-driven decisions to improve outcomes.",
      tip5: "As AI continues to evolve, its potential to reshape our world is immense. The development of more advanced AI systems, such as those capable of human-like reasoning and creativity, could unlock new possibilities in fields ranging from scientific research to the arts. However, the rise of AI also presents significant challenges that must be carefully managed.  One of the biggest concerns is the ethical implications of AI, particularly in areas such as surveillance, decision-making, and the potential for AI to perpetuate or exacerbate social inequalities. Ensuring that AI is developed and used in ways that are fair, transparent, and accountable will be critical to its success.",
      conclusion: "Artificial Intelligence is no longer just a technological innovation; it's a transformative force that is reshaping our world in profound ways. From healthcare and business to education and daily life, AI is driving innovation, improving efficiency, and enhancing our experiences. However, as we embrace the potential of AI, we must also navigate the ethical and societal challenges it brings, ensuring that this powerful technology is used responsibly and for the benefit of all.",
      blogBanner: "blogBanner",
    })

  console.log("Document added with ID: ", docRef.id);

  // Update the document to include the document ID
  await updateDoc(docRef, {
    id: docRef.id,
  });
  } catch (e) {
    console.log("Error: " + e.message);
    
  }
  
};

export const imageDB = getStorage(app);


export { colBlogs, addBlog };
