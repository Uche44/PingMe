import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { ProfileProvider } from "./contexts/ProfileContext";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import CreateProfile from "./pages/CreateProfile";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  );
};
export default App;
