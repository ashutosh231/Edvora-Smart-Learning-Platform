import React, { useState } from "react";
import { motion } from "framer-motion";

import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="relative w-full py-16 md:py-24 px-4 overflow-hidden">
      {/* Animated Background with Light Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-50/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-caribbeangreen-100/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Light Rays */}
        <motion.div
          className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-yellow-50/20 to-transparent"
          animate={{
            opacity: [0, 0.4, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          animate={{
            opacity: [0, 0.4, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-50 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-maxContent mx-auto">
        {/* Title Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-richblack-5 mb-6"
            variants={itemVariants}
          >
            Unlock the <HighlightText text={"Power of Code"} />
          </motion.h2>
          
          {/* Subtitle with Enhanced Glass Effect */}
          <motion.p 
            className="relative mx-auto max-w-3xl text-lg md:text-xl lg:text-2xl font-medium text-richblack-300 px-8 md:px-12 py-6 md:py-8 rounded-3xl glass-morphism-enhanced border border-richblack-700/50 shadow-2xl"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(255, 214, 10, 0.4)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 214, 10, 0.3)"
            }}
          >
            {/* Light Reflection Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-3xl shimmer-effect opacity-0 hover:opacity-100"></div>
            <span className="relative z-10">Learn to Build Anything You Can Imagine</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Tabs Section with Glass Effect */}
        <motion.div 
          className="hidden lg:flex gap-3 mx-auto w-max glass-morphism-enhanced p-1.5 rounded-full border border-richblack-700/50 shadow-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {tabsName.map((ele, index) => {
            return (
              <motion.div
                className={`text-[15px] md:text-[16px] flex flex-row items-center gap-2 ${
                  currentTab === ele
                    ? "bg-richblack-900 text-richblack-5 font-semibold shadow-lg shadow-yellow-50/30"
                    : "text-richblack-300"
                } px-6 md:px-7 py-2.5 md:py-3 rounded-full transition-all duration-300 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 relative overflow-hidden`}
                key={index}
                onClick={() => setMyCards(ele)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Active Tab Glow */}
                {currentTab === ele && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-50/20 via-transparent to-yellow-50/20 rounded-full"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">{ele}</span>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Mobile Tabs */}
        <motion.div 
          className="lg:hidden flex flex-wrap gap-3 justify-center mb-12 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {tabsName.map((ele, index) => {
            return (
              <motion.div
                className={`text-sm flex flex-row items-center gap-2 ${
                  currentTab === ele
                    ? "bg-richblack-900 text-richblack-5 font-medium shadow-lg"
                    : "bg-richblack-800/80 backdrop-blur-sm text-richblack-200 border border-richblack-700/50"
                } px-5 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                key={index}
                onClick={() => setMyCards(ele)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ele}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Cards Group - Horizontal Layout */}
        <motion.div 
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-nowrap gap-6 md:gap-8 lg:gap-10 justify-center lg:justify-center w-full overflow-x-auto pb-4 px-4 md:px-6 lg:px-8 scrollbar-hide">
            {courses.map((ele, index) => {
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-shrink-0"
                >
                  <CourseCard
                    cardData={ele}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreMore;