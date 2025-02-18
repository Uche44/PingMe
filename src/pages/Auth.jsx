import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const SignUp = ({ changeBack }) => {
  return (
    <div className="w-full h-[100vh] bg-white px-[1.2rem]">
      <h2 className="text-2xl font-bold text-purple-700 mt-[3rem] text-center">
        Let's Get Your Account Setup!
      </h2>
      <form
        action=""
        className="w-full h-[67%] mt-10"
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
            className="w-full border-b-2 h-[3.5rem]"
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
            type="text"
            id="password"
            name="password"
            className="w-full border-b-2 h-[3.5rem]"
            required
          />
        </div>
        <div className="h-[6rem] mt-2 w-full flex flex-col items-start gap-2">
          <label
            htmlFor="password"
            className="font-semibold text-xl"
          >
            Confirm Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="w-full border-b-2 h-[3.5rem]"
            required
          />
        </div>
        <div className="mt-2 w-fit flex gap-3 justify-center">
          <input
            type="checkbox"
            className="h-[24px] w-[24px]"
            required
          />
          <p className="text-[1.2rem]">I agree to the terms and conditions</p>
        </div>
        <button className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[18px] hover:brightness-125 cursor-pointer">
          Sign Up
        </button>
      </form>

      <div className="mt-8 h-[8rem] flex flex-col items-center">
        <p className="text-[1.1rem]">
          Already have an account?
          <span
            className="font-semibold cursor-pointer hover:font-bold"
            onClick={changeBack}
          >
            Log In
          </span>
        </p>

        <p className="m-3 text-[1.2rem]">OR</p>
        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-[1.1rem] cursor-pointer hover:font-bold">
            Continue with Google
          </p>
          <FcGoogle className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

const Login = ({ changePage }) => {
  return (
    <div className="w-full h-[100vh] bg-white  px-[1.2rem] relative">
      <h2 className="text-3xl font-bold text-purple-700 mt-[3rem]">Welcome Back!</h2>
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
            className="w-full border-b-2 h-[3.5rem]"
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
            className="w-full border-b-2 h-[3.5rem]"
          />
        </div>
        <button className="w-full h-[3.2rem] bg-purple-700 rounded-[30px] mt-10 text-white font-semibold text-[18px] hover:brightness-125 cursor-pointer">
          login
        </button>
      </form>
      <p className="absolute right-6 cursor-pointer hover:font-bold">
        Forgot password?
      </p>
      <div className="mt-8  flex flex-col justify-center items-center">
        <p className="text-[1.1rem]">
          Don't have an account?
          <span
            className="font-semibold cursor-pointer hover:font-bold"
            onClick={changePage}
          >
            Sign Up
          </span>
        </p>
        <p className="m-3 text-[1.2rem]">OR</p>
        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-[1.1rem] cursor-pointer hover:font-bold">
            Continue with Google
          </p>
          <FcGoogle className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  const handlesetSignUp = () => {
    setSignUp(true);
  };

  const handlesetLogIn = () => {
    setSignUp(false);
  };
  return (
    <>
      {signUp ? (
        <SignUp changeBack={handlesetLogIn} />
      ) : (
        <Login changePage={handlesetSignUp} />
      )}
    </>
  );
};
