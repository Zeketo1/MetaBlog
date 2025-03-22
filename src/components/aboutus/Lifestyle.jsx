import { Hands, Teamwork } from "../..";
import store from "../../store/store";
import { useStore } from "eoion";

const Lifestyle = () => {
  const [dark] = useStore(store.subscribe("dark"));
  return (
    <>
      <div
        className={`py-10 px-5 transition-all duration-500 ${
          dark ? "bg-[#242535] text-white" : "bg-white text-black"
        } flex flex-col gap-5`}
      >
        <div className="flex justify-center items-center w-full sm:pl-20 sm:grid grid-cols-2 sm:place-self-center">
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-[25px] font-semibold">Our team of creatives</h1>
            <p className="text-[17px] font-semibold">
              Behind every word, idea, and connection on MetaBlog is a <br />
              passionate team of dreamers, doers, and storytellers.
            </p>
            <p className="text-[14px] opacity-75">
              We’re a kaleidoscope of writers, designers, tech wizards, and{" "}
              <br />
              community builders—united by our love for creativity and our{" "}
              <br />
              belief in the power of shared stories. From curating inspiring{" "}
              <br />
              content to designing a seamless platform, we pour our hearts into{" "}
              <br />
              making this space a home for voices old and new. We’re fueled by{" "}
              <br />
              curiosity, caffeine, and the thrill of seeing a raw idea blossom{" "}
              <br />
              into a conversation that resonates globally. Whether we’re coding{" "}
              <br />
              late into the night, brainstorming over coffee, or cheering on a{" "}
              <br />
              first-time writer, our mission stays the same: to empower you to{" "}
              <br />
              create fearlessly and connect deeply.
            </p>
          </div>
          <div className="relative hidden sm:block">
            <div className="absolute h-[50px] w-[50px] bg-yellow-400 top-[12rem] handclip" />
            <img
              src={Hands}
              alt=""
              className="about__radius object-cover h-[400px]"
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full sm:gap-20 sm:grid grid-cols-2 sm:place-self-center">
          <div className="hidden sm:block">
            <img
              src={Teamwork}
              alt=""
              className="about__radius object-cover h-[400px]"
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h1 className="text-[25px] font-semibold">
              Why we started this Blog
            </h1>
            <p className="text-[17px] font-semibold">
              It began with a simple question: What if there was a space where <br />
              stories could breathe freely?
            </p>
            <p className="text-[14px] opacity-75">
              In a world oversaturated with clickbait, algorithms, and fleeting <br />
              trends, we craved something raw and real—a place where writing <br />
              isn’t about chasing views, but about sparking connections. Too <br />
              often, we saw brilliant voices drowned out by noise, and readers <br />
              left hungry for substance. So we built MetaBlog: a refuge for <br />
              authenticity, a stage for the unheard, and a reminder that <br />
              storytelling is a radical act of humanity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lifestyle;
