import { useStore } from "eoion";
import { ClipLoader } from "react-spinners";
import store from "../../store/store";

const Spinner2 = ({ size, height, width }) => {
  const [dark] = useStore(store.subscribe("dark"));

  return (
    <div
      className={`bg-inherit flex justify-center items-center ${height} ${width || " "}`}
    >
      <ClipLoader color="#123abc" loading={true} size={size} />
    </div>
  );
};
export default Spinner2;
