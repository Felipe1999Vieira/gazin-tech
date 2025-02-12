import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Router>
      <Dashboard>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Dashboard>
    </Router>
  );
}
