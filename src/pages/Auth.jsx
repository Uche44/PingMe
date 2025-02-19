import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signUp, login } from "../config/firebase";

import toast from "react-hot-toast";

export const Auth = () => {
  const [createUser, setCreateUser] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesetSignUp = () => {
    setCreateUser(true);
  };

  const handlesetLogIn = () => {
    setCreateUser(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createUser === true) {
      signUp(userName, email, password);
      if (error) {
        toast.error(error.code);
      } else {
        toast.success("Welcome to PingMe!!");
      }
    } else {
      login(email, password);
      toast.success("Logged in!!");
    }
  };
  return (
    <>
      {createUser ? (
        //  sign up component
        <div className="w-full h-[100vh] bg-white px-[1.2rem]">
          <h2 className="text-2xl font-bold text-purple-700 mt-[3rem] text-center">
            Let's Get Your Account Setup!
          </h2>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full h-[67%] mt-10"
          >
            <div className=" h-[6rem] w-full flex flex-col items-start gap-2">
              <label
                htmlFor="name"
                className="font-semibold text-xl"
              >
                Name
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                type="text"
                name="name"
                id="name"
                className="w-full border-b-2 h-[3.5rem] active:border-b-purple-400 px-2"
                required
              />
            </div>

            <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
              <label
                htmlFor="email"
                className="font-semibold text-xl"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                id="email"
                className="w-full border-b-2 h-[3.5rem] px-2"
                required
              />
            </div>
            <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-xl"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full border-b-2 h-[3.5rem] px-2"
                required
              />
            </div>
            <div className="mt-2 w-fit flex gap-3 justify-center">
              <input
                type="checkbox"
                className="h-[24px] w-[24px]"
                required
              />
              <p className="text-[1rem]">I agree to the terms and conditions</p>
            </div>
            <button className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[16px] hover:brightness-125 cursor-pointer">
              Sign Up
            </button>
          </form>

          <div className="mt-8 h-[8rem] flex flex-col items-center">
            <p className="text-[1rem]">
              Already have an account?
              <span
                className="font-semibold cursor-pointer hover:font-bold"
                onClick={handlesetLogIn}
              >
                Log In
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
      ) : (
        //  login component
        <div className="w-full h-[100vh] bg-white  px-[1.2rem] relative">
          <h2 className="text-3xl font-bold text-purple-700 mt-[3rem]">
            Welcome Back!
          </h2>
          <form
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
                type="email"
                name="email"
                className="w-full border-b-2 h-[3.5rem] px-2"
              />
            </div>

            <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-xl"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="w-full border-b-2 h-[3.5rem] px-2"
              />
            </div>
            <button className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[16px] hover:brightness-125 cursor-pointer">
              login
            </button>
          </form>
          <p className="absolute right-6 cursor-pointer hover:font-bold -mt-2">
            Forgot password?
          </p>
          <div className="mt-8  flex flex-col justify-center items-center">
            <p className="text-[1rem]">
              Don't have an account?
              <span
                className="font-semibold cursor-pointer hover:font-bold"
                onClick={handlesetSignUp}
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
      )}
    </>
  );
};
