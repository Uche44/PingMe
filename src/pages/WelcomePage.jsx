import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="{`welcome w-full h-[100vh] bg-white flex flex-col items-center justify-center transition-opacity duration-3000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}">
      <img
        src="/welcome.svg"
        alt="logo"
        className="w-[60%] h-[6rem] mb-3 animate-pulse"
      />

      <button
        onClick={() => navigate("/sign-up")}
        className="w-[50%] h-[3rem] font-semibold text-[1rem] text-white bg-purple-700 rounded-[20px] cursor-pointer hover:brightness-125 shadow-2xl"
      >
        Get Started
      </button>
    </div>
  );
};
export default WelcomePage;
