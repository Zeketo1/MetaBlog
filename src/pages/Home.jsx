import { useEffect } from "react";
import Banner from "../components/Home/Banner";
import BlogsList from "../components/Home/BlogsList";
import AddBlogbtn from "../utils/AddBlogbtn";
import { useStore } from "eoion";
import store from "../store/store";

const Home = ({ setfooter }) => {
  const [dark] = useStore(store.subscribe("dark"));

  useEffect(() => {
    setfooter(true);
  }, [setfooter]);

  return (
    <div
      className={`transition duration-500 ${
        dark && "bg-[#242535]"
      } `}
    >
      <AddBlogbtn />
      <Banner />
      <BlogsList />
    </div>
  );
};

export default Home;
