import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
			<ToastContainer />
		</BrowserRouter>
	);
};

export default App;
