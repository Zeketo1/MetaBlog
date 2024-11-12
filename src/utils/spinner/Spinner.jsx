import { useStore } from "eoion";
i 
import store from "../../store/store";

const Spinner = ({ size, height }) => {
  const [dark] = useStore(store.subscribe("dark"));

  return (
    <div
      className={`${
        dark ? "bg-[#242535]" : "bg-white"
      } flex justify-center items-center ${height}`}
    >
      <ClipLoader color="#123abc" loading={true} size={size} />
    </div>
  );
};
export default Spinner;
