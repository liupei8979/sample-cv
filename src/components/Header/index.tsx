import React from "react";
import { fadeInUp } from "../../utils/animation";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="pt-32 pb-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-800/30"></div>

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="relative mx-auto mb-8 w-40 h-40 rounded-full overflow-hidden border-4 border-white/50 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/assets/images/profile.png"
            alt="Kim Mintae"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
        </motion.div>

        <motion.h1
          className="text-7xl font-extrabold tracking-tight mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          KIM MINTAE
        </motion.h1>
        <motion.div
          className="h-1 w-20 bg-white rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.p
          className="text-3xl font-medium"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Web Frontend Developer
        </motion.p>
        <motion.p
          className="mt-2 text-xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          1999.02.13
        </motion.p>
        <motion.div
          className="mt-8 space-y-2 text-xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>010-8545-2924</p>
          <p>khsr98@ajou.ac.kr</p>
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://github.com/liupei8979"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-full"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/oxsla/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-full"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
