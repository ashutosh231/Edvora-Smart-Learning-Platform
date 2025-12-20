// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import React from "react";
import { motion } from "framer-motion";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  const isActive = currentCard === cardData?.heading;
  
  return (
    <motion.div
      className={`relative w-[320px] sm:w-[360px] md:w-[380px] ${
        isActive
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800/80 backdrop-blur-sm border border-richblack-700/50"
      } text-richblack-25 h-[320px] md:h-[340px] lg:h-[360px] box-border cursor-pointer rounded-lg overflow-hidden group`}
      onClick={() => setCurrentCard(cardData?.heading)}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Light Effect on Hover */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-50/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
      
      {/* Glow Border Effect for Active Card */}
      {isActive && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 rounded-lg blur-sm opacity-50"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <div className={`relative z-10 border-b-[2px] border-dashed h-[80%] p-6 md:p-8 flex flex-col gap-3 md:gap-4 ${
        isActive ? "border-richblack-300" : "border-richblack-400"
      }`}>
        <div
          className={`font-semibold text-[20px] md:text-[22px] lg:text-[24px] ${
            isActive ? "text-richblack-900" : "text-richblack-5"
          }`}
        >
          {cardData?.heading}
        </div>

        <div className={`text-sm md:text-base leading-relaxed ${
          isActive ? "text-richblack-600" : "text-richblack-400"
        }`}>
          {cardData?.description}
        </div>
      </div>

      <div
        className={`relative z-10 flex justify-between ${
          isActive ? "text-blue-600 bg-richblack-50" : "text-richblack-300 bg-richblack-900/30 backdrop-blur-sm"
        } px-6 py-3 font-medium rounded-b-lg`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
