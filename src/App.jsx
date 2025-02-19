import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import WelcomePage from "./pages/WelcomePage";
import GetStarted from "./pages/GetStarted";
import { Auth } from "./pages/Auth";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Router>
        <Main />
      </Router>
    </>
  );
}
const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/get-started");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={<WelcomePage />}
      />

      <Route
        path="/get-started"
        element={<GetStarted />}
      />

      <Route
        path="/auth"
        element={<Auth />}
      />
    </Routes>
  );
};
export default App;
