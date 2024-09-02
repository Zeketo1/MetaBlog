import { BlogContextProvider } from "./context/BlogContextProvider";
import AppRoutes from "./Routes/AppRoutes";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => (
  <>
    <BlogContextProvider>
      <AppRoutes />
    </BlogContextProvider>
  </>
);

export default App;
