import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import WelcomePage from "./components/WelcomePage";
import GetStarted from "./components/GetStarted";
import { Login } from "./components/Login";
function App() {
  return (
    <>
      <Router>
        <Main />
      </Router>
    </>
  );
}
const Main = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      navigate("/get-started");
    }, 6000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Routes>
      {showWelcome ? (
        <Route
          path="*"
          element={<WelcomePage />}
        />
      ) : (
        <Route
          path="/get-started"
          element={<GetStarted />}
        />
      )}
      <Route
        path="/login"
        element={<Login />}
      />
    </Routes>
  );
};
export default App;
