import store from "../../store/store";
import { useStore } from "eoion";
import banner from "../../assets/Images/Aboutus/banner.jpg";

const Banner = () => {
  const [dark] = useStore(store.subscribe("dark"));

  return (
    <>
      <div
        className={`transition duration-500 ${
          dark ? "bg-[#242535ec] text-white" : "bg-[#6b728027] text-black"
        } min-h-[400px]`}
      >
        <div
          style={{ backgroundImage: `url("${banner}")` }}
          className="h-[300px] lg:h-[400px] w-full bg-cover"
        ></div>
        <div className="h-fit lg:h-[400px] grid grid-cols-1 lg:grid-cols-2 gap-10 place-content-center px-[10%]">
          <div className="flex flex-col gap-3 p-4">
            <h1 className="text-[14px] font-semibold opacity-80">
              OUR MISSION
            </h1>
            <h1 className="text-[22px] font-semibold">
              Empowering voices, connecting minds, celebrating stories.
            </h1>
            <p>
              To empower individuals to share their unique stories and
              perspectives, fostering a global community where creativity,
              authenticity, and connection thrive. We exist to amplify voices,
              spark meaningful dialogue, and celebrate the transformative power
              of storytelling—one post, one reader, one writer at a time.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <h1 className="text-[14px] font-semibold opacity-80">OUR VISION</h1>
            <h1 className="text-[22px] font-semibold">
              A world united by the stories we dare to share.
            </h1>
            <p>
              To create a world where every person has the courage and platform
              to express themselves freely, bridging divides and inspiring
              change through the universal language of stories. We envision a
              future where empathy grows from shared narratives, and human
              connection outshines the noise of a fragmented digital age.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
