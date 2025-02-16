import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Bubble = () => {
  return (
    <motion.div
      className="w-12 h-12 bg-purple-400 rounded-full shadow-lg absolute top-[2rem] right-[2rem]"
      animate={{
        y: [0, -30, 0], // Moves up and down
        scale: [1, 1.1, 1], // Expands slightly
        opacity: [1, 0.8, 1], // Fades in and out slightly
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
        onClick={() => navigate("/login")}
        className="fixed bottom-6 w-[80%] h-[4rem] font-bold text-2xl text-white bg-purple-700 rounded-[30px] cursor-pointer hover:brightness-125"
      >
        Get Started
      </button>
    </div>
  );
};
export default GetStarted;
