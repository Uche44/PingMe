import { motion } from "framer-motion";

export const Bubble = () => {
  return (
    <motion.div
      className="w-24 h-24 bg-blue-400 rounded-full shadow-lg"
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


 const GetStarted=()=>{
    return(
<div className="w-full h-[100vh] flex items-center justify-center">
<button className="fixed bottom-6 w-[80%] h-[4rem] font-bold text-2xl text-white bg-purple-700 rounded-[30px]">Get Started</button>
</div>
    )
};
export default GetStarted;