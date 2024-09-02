import { BlogContextProvider } from "./context/BlogContextProvider";
import "react-loading-skeleton/dist/skeleton.css";
import AppRoutes from "./applicationRoutes/AppRoutes";

const App = () => (
  <>
    <BlogContextProvider>
      <AppRoutes />
    </BlogContextProvider>
  </>
);

export default App;
