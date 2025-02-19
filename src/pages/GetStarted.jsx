import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Bubble = () => {
  return (
    <motion.div
      className="w-8 h-8 bg-purple-400 rounded-full shadow-lg absolute top-[2rem] right-[2rem]"
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      <Bubble />
      <img
        className="mb-[7rem]"
        src="/getstarted.svg"
        alt=""
      />
      <button
        onClick={() => navigate("/auth")}
        className="fixed bottom-6 w-[80%] h-[3.5rem] font-semibold text-[1.1rem] text-white bg-purple-700 rounded-[30px] cursor-pointer hover:brightness-125"
      >
        Get Started
      </button>
    </div>
  );
};
export default GetStarted;
