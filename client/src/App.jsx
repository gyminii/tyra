import { RouterProvider } from "react-router-dom";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { router } from "./routes/routes";

const App = () => {
	useScrollToTop();
	return <RouterProvider router={router} />;
};

export default App;
