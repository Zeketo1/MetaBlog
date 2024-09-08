import React, { useState, useContext, useEffect, useCallback } from "react";
import { blogContext } from "../../context/BlogContextProvider"; // Assuming you have a context for dark mode
import store from "../../store/store";
import { useStore } from "eoion";
import { auth, colBlogs, db, imageDB, showToast } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner2 from "../../utils/spinner/Spinner2";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";

const AddBlogPost = () => {
  // Eoion
  const [dark] = useStore(store.subscribe("dark"));

  // States
  const { setImageUrl, profile, setProfile } = useContext(blogContext);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [googleAuthor, setGoogleAuthor] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [imageType, setImageType] = useState("");
  const [image2, setImage2] = useState([]);
  const [imageType2, setImageType2] = useState("");
  const [preview, setPreview] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [quote, setQuote] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [tips, setTips] = useState([{ header: "", tip: "" }]);

  const headers = tips.map((tip) => tip.header);
  const tipContents = tips.map((tip) => tip.tip);

  // Firebase Storage handler
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      setImageType(fileExtension);
    }
    const previewURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previewURLs);
  }, []);

  const onDrop2 = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage2(file);
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      setImageType2(fileExtension);
    }
    const previewURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreview2(previewURLs);
  }, []);

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } =
    useDropzone({ onDrop });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } =
    useDropzone({ onDrop: onDrop2 });

  // Tips Handler
  const handleAddTip = () => {
    if (tips.length < 5) {
      setTips([...tips, { header: "", tip: "" }]);
    }
  };

  const handleTipChange = (index, field, value) => {
    const newTips = [...tips];
    newTips[index][field] = value;
    setTips(newTips);
  };

  const handleRemoveTip = (index) => {
    const newTips = tips.filter((_, i) => i !== index);
    setTips(newTips);
  };

  // Storage Handler
  const handleStorage = (img, img2, uid) => {
    const uploadImage = (image, refName) => {
      const imgRef = ref(imageDB, refName);
      return uploadBytes(imgRef, image).then((value) =>
        getDownloadURL(value.ref)
      );
    };

    if (img) {
      const imgPromise = uploadImage(img, `Images/${uid}.${imageType}`);
      imgPromise.then((url) => setImageUrl((data) => [...data, url]));
    }

    if (img2) {
      const img2Promise = uploadImage(img2, `Images/${uid}S.${imageType2}`);
      img2Promise.then((url) => setImageUrl((data) => [...data, url]));
    }
  };

  // AddBlog function pushing to both firestore and storage
  const addBlog = async () => {
    try {
      // Add the document to the collection and get the reference
      const docRef = await addDoc(colBlogs, {
        title,
        name: author,
        date,
        type: category,
        article: content,
        tip1: tipContents[0] || " ",
        tipheader1: headers[0] || " ",
        tip2: tipContents[1] || " ",
        tipheader2: headers[1] || " ",
        tip3: tipContents[2] || " ",
        tipheader3: headers[2] || " ",
        tip4: tipContents[3] || " ",
        tipheader4: headers[3] || " ",
        tip5: tipContents[4] || " ",
        tipheader5: headers[4] || " ",
        quote,
        conclusion,
      });

      // Access the document ID
      const newDocId = docRef.id;

      // Update the document to include the document ID
      await updateDoc(docRef, {
        id: newDocId,
      });

      // Handle image upload with the document ID
      handleStorage(image, image2, newDocId);
    } catch (e) {
      console.log("Error: " + e.message);
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the form submission goes here
    try {
      addBlog();
      setLoading(true);
      const timer = setTimeout(() => {
        setTitle("");
        setAuthor("");
        setDate("");
        setCategory([]);
        setContent("");
        setImage(null);
        setPreview(null);
        setImage2(null);
        setPreview2(null);
        setTips([{ header: "", tip: "" }]);
        setQuote("");
        setConclusion("");
        navigate("/blogs");
        showToast("Blog Post Added Successfully!", "success");
      }, 2500);

      return () => clearTimeout(timer);
    } catch (e) {
      showToast(`Error: ${e.message}`, "error");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Checking Authentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Accessing the uid and photoURL
        const userUid = user.uid;
        const userProfile = user?.photoURL;
        const username = user.displayName;

        setProfile(userProfile);
        setGoogleAuthor(username);
        setUserId(userUid);
      }
    });
  }, [profile]);

  // Checking firestore
  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(doc(db, "Users", userId), (doc) => {
        try {
          if (doc.exists()) {
            setUserData({
              ...doc.data(),
              id: doc.id,
            });
          } else {
            console.log("No such document!");
          }
          const user = userData.username;
          setAuthor(googleAuthor === null ? user : googleAuthor);
        } catch (e) {
          console.log(e.message);
        }
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    }
  }, [userId, author]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setDate(formattedDate);
  }, []);

  return (
    <div
      className={`w-full flex justify-center transition-colors duration-500 ${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`w-full mb-5 sm:w-[80%] flex flex-col gap-3 p-6 shadow-md transition-colors duration-500 ${
          dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Add New Blog Post</h1>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="title"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}
              required
            />
          </div>

          {/* Author and Date Input */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                className={`block mb-2 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="author"
              >
                Author Name
              </label>
              <input
                type="text"
                id="author"
                readOnly
                value={author}
                placeholder="Your name"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div className="flex-1">
              <label
                className={`block mb-2 ${
                  dark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                disabled
                className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="category"
            >
              Category/Tags
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(
                  [...e.target.selectedOptions].map((option) => option.value)
                )
              }
              multiple
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300 scroll__style__dark"
                  : "border-gray-300 scroll__style__light"
              }`}
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Traveling">Traveling</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Political">Political</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="content"
            >
              Article
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}
              rows="4"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="image1" // Unique ID
            >
              Upload Image
            </label>

            <div
              {...getRootProps1()}
              className={`p-6 rounded-md cursor-pointer transition-all
      border border-dashed ${preview ? "h-[400px]" : "h-fit"} ${
                dark
                  ? "bg-[#242535] text-[#f8f8f2] border-[#44475a]"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <input {...getInputProps1()} />
              {!preview && (
                <div className="w-full flex flex-col items-center gap-3">
                  <CiImageOn className="text-[30px]" />{" "}
                  <p>Click To Upload Image</p>
                </div>
              )}
              <ul className="mt-4">
                <li className="text-sm">{image.name}</li>
              </ul>
              <div className="h-[80%]">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Tips Input */}
          {tips.map((tip, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Tip {index + 1}</h2>
                {index > 0 && (
                  <button
                    type="button"
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemoveTip(index)}
                  >
                    Remove Tip
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Tip Header"
                value={tip.header}
                onChange={(e) =>
                  handleTipChange(index, "header", e.target.value)
                }
                className={`w-full p-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "border-gray-300"
                }`}
                required
              />
              <textarea
                placeholder="Tip Description"
                value={tip.tip}
                onChange={(e) => handleTipChange(index, "tip", e.target.value)}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-gray-300"
                    : "border-gray-300"
                }`}
                rows="3"
                required
              />
            </div>
          ))}

          {tips.length < 5 && (
            <button
              type="button"
              className={`py-2 px-4 mb-4 rounded-lg hover:bg-gray-600 transition-colors ${
                dark ? "bg-gray-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={handleAddTip}
            >
              Add Another Tip
            </button>
          )}

          {/* Second Image */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="image2" // Unique ID
            >
              Upload Second Image
            </label>
            <div
              {...getRootProps2()}
              className={`p-6 rounded-md cursor-pointer transition-all
      border border-dashed ${preview2 ? "h-[400px]" : "h-fit"} ${
                dark
                  ? "bg-[#242535] text-[#f8f8f2] border-[#44475a]"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            >
              <input {...getInputProps2()} />
              {!preview2 && (
                <div className="w-full flex flex-col items-center gap-3">
                  <CiImageOn className="text-[30px]" />{" "}
                  <p>Click To Upload Image</p>
                </div>
              )}
              <ul className="mt-4">
                <li className="text-sm">{image2.name}</li>
              </ul>
              <div className="h-[80%]">
                {preview2 && (
                  <img
                    src={preview2}
                    alt="Preview"
                    className="mt-4 w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="content"
            >
              Quote
            </label>
            <textarea
              id="content"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Write your quote here..."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}
              rows="2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className={`block mb-2 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
              htmlFor="content"
            >
              Conclusion
            </label>
            <textarea
              id="content"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              placeholder="Write your Conclusion here..."
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "border-gray-300"
              }`}
              rows="6"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end items-center mt-6">
            {/* <button
              type="button"
              className={`py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors ${
                dark ? "bg-gray-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => alert("This would show a preview")}
            >
              Preview Post
            </button> */}
            <button
              type="submit"
              className={`py-2 w-[150px] rounded-lg font-semibold hover:bg-blue-600 transition-colors ${
                dark ? "bg-blue-500 text-white" : "bg-blue-500 text-white"
              }`}
            >
              {loading ? (
                <Spinner2 height="h-full" width="w-full" size={20} />
              ) : (
                "Submit Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPost;
