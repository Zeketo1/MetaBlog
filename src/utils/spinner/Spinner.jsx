import { useStore } from "eoion";
import store from "../../store/store";
import { ClipLoader } from "react-spinners";

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
