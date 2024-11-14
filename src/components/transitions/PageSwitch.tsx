import { motion } from "framer-motion";

const topToBottom = {
  initial: { top: 0, height: "100vh" },
  animate: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const bottomToTop = {
  initial: { bottom: "-100vh", height: "100vh" },
  animate: {
    bottom: 0,
    transition: {
      duration: 0.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const PageSwitch = {
  BottomToTop: () => (
    <motion.div
      className="fixed z-50 flex items-center justify-center w-full bg-slate-700"
      initial="initial"
      animate="animate"
      variants={bottomToTop}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
    />
  ),
  TopToBottom: () => (
    <motion.div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full bg-slate-700"
      initial="initial"
      animate="animate"
      variants={topToBottom}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    />
  ),
};
