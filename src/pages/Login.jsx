import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
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
            className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
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
            className="w-full border-b-2 h-[3.5rem] px-2 focus:outline-none"
          />
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
