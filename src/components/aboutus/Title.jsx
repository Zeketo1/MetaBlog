import store from "../../store/store";
import { useStore } from "eoion";

const Title = () => {
  const [dark] = useStore(store.subscribe("dark"));
  return (
    <>
      <div
        className={`transition-all duration-500 ${
          dark ? "bg-[#242535] text-white" : "bg-white text-black"
        } h-[300px] flex justify-center`}
      >
        <div className="w-[90%] h-full grid translate-y-10 lg:grid-cols-2">
          <div
            className={`transition duration-500 flex shadow-lg ${
              dark ? "bg-[#242535] text-white" : "bg-white text-black"
            } justify-center flex-col px-20`}
          >
            <h1>ABOUT US</h1>
            <h1 className="text-[30px] font-semibold">
              We are a team of <br className="hidden lg:block" /> content writers who <br className="hidden lg:block" /> share their
              learnings
            </h1>
          </div>
          <p className="hidden lg:flex justify-center items-center bg-transparent">
            Welcome to MetaBlog, your digital haven for stories, ideas, <br />
            and connection. Here, words come alive, voices are amplified, and <br />
            curiosity finds its home. Whether you’re here to dive into <br />
            thought-provoking articles, share your own experiences, or simply <br />
            wander through the musings of others, this is a space where every <br />
            story matters.
          </p>
        </div>
      </div>
    </>
  );
};

export default Title;
