import { useAuth } from "../contexts/Auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  // const [userData, setUserData] = useState({
  //   email: "",
  //   password: "",
  // });

  const [errors, setErrors] = useState({});

  const { userData, setUserData, login } = useAuth();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!userData.email.includes("@")) {
      newErrors.email = "Enter valid Email";
    }
    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    if (!validateForm(e)) return;

    e.preventDefault();

    try {
      const userCredential = await login(userData.email, userData.password);

      if (userCredential && userCredential.user) {
        console.log("Login successful");
        navigate("/create-profile");
      } else {
        // toast.error("Invalid email or password");
        console.log("unsuccessful");
      }
    } catch (error) {
      console.error("Login failed:", error);
      //  toast.error("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white  px-[1.2rem] relative">
      <h2 className="text-3xl font-bold text-purple-700 mt-[3rem]">
        Welcome Back!
      </h2>
      <form
        onSubmit={handleLogin}
        action=""
        className="w-full h-[46%] mt-10"
      >
        <div className=" h-[6rem] w-full flex flex-col items-start gap-2">
          <label
            htmlFor="email"
            className="font-semibold text-xl"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
          />

          {errors.email && (
            <p className="text-red-600 font-semibold">{errors.email}</p>
          )}
        </div>

        <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
          <label
            htmlFor="password"
            className="font-semibold text-xl"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
          />

          {errors.password && (
            <p className="text-red-600 font-semibold">{errors.password}</p>
          )}
        </div>
        <button
          className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[16px] hover:brightness-125 cursor-pointer"
          //   onClick={() => navigate("/create-profile")}
        >
          login
        </button>
      </form>
      <p className="absolute right-6 cursor-pointer hover:font-bold -mt-2">
        Forgot password?
      </p>
      <div className="mt-8  flex flex-col justify-center items-center">
        <p className="text-[1rem]">
          Don&apos;t have an account?
          <span
            className="font-semibold cursor-pointer hover:font-bold"
            // onClick={handlesetSignUp}
          >
            Sign Up
          </span>
        </p>
        <p className="m-3 text-[1.1rem]">OR</p>
        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-[1rem] cursor-pointer hover:font-bold">
            Continue with Google
          </p>
          <FcGoogle className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
