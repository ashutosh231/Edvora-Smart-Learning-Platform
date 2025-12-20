import Banner from "../assets/Images/banner.mp4"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import { FaArrowRight } from "react-icons/fa"
import Footer from "../components/common/Footer"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import { Link } from "react-router-dom"
import ReviewSlider from "../components/common/ReviewSlider"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import { motion, useScroll, useTransform } from "framer-motion"
import { useSpring, animated } from "react-spring"
import { useState, useEffect } from "react"
import { RocketOutlined, TrophyOutlined, TeamOutlined } from "@ant-design/icons"

function Home() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const [activeStats, setActiveStats] = useState(false)
  
  // React Spring animation for stats counter
  const statsAnimation = useSpring({
    number: activeStats ? 1 : 0,
    config: { duration: 2000 }
  })
  
  useEffect(() => {
    const timer = setTimeout(() => setActiveStats(true), 500)
    return () => clearTimeout(timer)
  }, [])
  
  // Parallax effect variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }
  
  return (
    <div className="overflow-hidden">
      {/* Section 1 - Enhanced Hero */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Become an Instructor Button with Badge */}
        <Link to={"/signup"}>
          <motion.div 
            className="group mx-auto mt-16 w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="rounded-full bg-gradient-to-r from-richblack-800 to-richblack-700 p-1 shadow-xl">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] bg-richblack-900 transition-all duration-200 group-hover:bg-richblack-800">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mr-2">New</span>
                <p className="font-bold text-richblack-200">Become an Instructor</p>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Heading with Gradient Animation */}
        <motion.div 
          className="text-center text-4xl font-semibold"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #fff, #3b82f6, #60a5fa, #fff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Empower Your Future with
          </motion.span>
          <br />
          <HighlightText text={"Coding Skills"} />
        </motion.div>

        {/* Sub Heading with Glass Effect */}
        <motion.div 
          className="glass-morphism-text -mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 backdrop-blur-sm bg-richblack-800/30 rounded-2xl p-6 border border-richblack-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </motion.div>
        
        {/* CTA Buttons with 3D Effect */}
        <motion.div 
          className="mt-8 flex flex-row gap-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <CTAButton active={true} linkto={"/all-courses"}>
              Learn More
            </CTAButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <CTAButton active={false} linkto={"/contact"}>
              Book a Demo
            </CTAButton>
          </motion.div>
        </motion.div>

        {/* Advanced Hero Banner - Redesigned to Match Theme */}
        <motion.div 
          className="relative mx-auto my-12 w-11/12 max-w-7xl overflow-hidden rounded-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.005 }}
        >
          {/* Dark Theme Background with Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
            {/* Animated Mesh Gradient */}
            <motion.div
              className="absolute inset-0 hero-gradient-mesh"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Advanced Light Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Gradient Orbs */}
            <motion.div 
              className="absolute top-0 left-0 w-96 h-96 bg-yellow-50/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, -80, 0],
                y: [0, 60, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-caribbeangreen-100/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Light Rays */}
            <motion.div
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, 50, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, -50, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
            
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-50 rounded-full opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 0.8, 0.3],
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
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-richblack-900/60 via-transparent to-richblack-900/60"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-28">
            
            {/* Heading Section */}
            <motion.div 
              className="text-center mb-10 md:mb-12 w-full"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h2 
                className="mb-6 md:mb-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-richblack-5 leading-tight px-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="block md:inline">Start Your</span>{" "}
                <motion.span 
                  className="inline-block bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  Learning Journey
                </motion.span>
              </motion.h2>
              
              {/* Subtitle with Glass Effect */}
              <motion.p 
                className="relative mx-auto max-w-4xl text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-richblack-300 px-6 md:px-10 lg:px-12 py-5 md:py-6 lg:py-8 rounded-2xl glass-morphism-enhanced border border-richblack-700/50 shadow-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(255, 214, 10, 0.4)",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 214, 10, 0.3), 0 0 40px rgba(255, 214, 10, 0.1)"
                }}
              >
                {/* Light Reflection Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl shimmer-effect opacity-0 hover:opacity-100"></div>
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-50/20 via-transparent to-yellow-50/20 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 block">
                  Join thousands of students mastering coding skills with interactive courses, 
                  hands-on projects, and world-class instructors
                </span>
              </motion.p>
            </motion.div>
              
            {/* Advanced Stats Cards with Glassmorphism */}
            <motion.div 
              className="mt-10 md:mt-14 lg:mt-16 grid grid-cols-1 gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 w-full max-w-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { number: "10K+", label: "Active Students", icon: <TeamOutlined className="text-4xl" />, gradient: "from-pink-400 to-rose-400", glowColor: "pink" },
                { number: "500+", label: "Hours of Content", icon: <RocketOutlined className="text-4xl" />, gradient: "from-purple-400 to-indigo-400", glowColor: "purple" },
                { number: "95%", label: "Success Rate", icon: <TrophyOutlined className="text-4xl" />, gradient: "from-yellow-400 to-yellow-50", glowColor: "yellow" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="relative group glass-card-advanced"
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                >
                  {/* Animated Glow Ring */}
                  <motion.div 
                    className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                    animate={{
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                  />
                  
                  {/* Glassmorphism Card */}
                  <div className="relative glass-morphism-enhanced rounded-2xl p-6 md:p-8 lg:p-10 border border-richblack-700/50 group-hover:border-yellow-50/40 transition-all duration-300 shadow-2xl text-center">
                    {/* Light Reflection */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 rounded-2xl shimmer-effect opacity-0 group-hover:opacity-100"></div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`relative z-10 mb-4 flex justify-center text-${stat.gradient.split('-')[1]}-400`}
                      animate={{ 
                        y: [0, -8, 0],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: idx * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    
                    {/* Number with Gradient */}
                    <div 
                      className={`relative z-10 text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-none`}
                      style={{
                        background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      <span className={`bg-gradient-to-br ${stat.gradient}`} style={{
                        background: idx === 0 ? 'linear-gradient(to bottom right, rgb(244, 114, 182), rgb(251, 113, 133))' :
                                   idx === 1 ? 'linear-gradient(to bottom right, rgb(192, 132, 252), rgb(129, 140, 248))' :
                                   'linear-gradient(to bottom right, rgb(250, 204, 21), rgb(254, 249, 195))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {stat.number}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <div className="relative z-10 text-richblack-300 font-semibold text-sm md:text-base lg:text-lg">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Bottom Glow Effect */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-50/10 via-transparent to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Code Section 1 */}
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"coding potential"} /> with our
              online courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it Yourself",
            link: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            link: "/all-courses",
            active: false,
          }}
          codeColor={"text-yellow-25"}
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />

        {/* Code Section 2 */}
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
              Start <HighlightText text={"coding in seconds"} />
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{
            btnText: "Continue Lesson",
            link: "/dashboard/enrolled-courses",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            link: "/all-courses",
            active: false,
          }}
          codeColor={"text-white"}
          codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>Home</div>\n  )\n}\n\nexport default Home;`}
          backgroundGradient={<div className="codeblock2 absolute"></div>}
        />

        {/* Explore Section */}
        <ExploreMore />
        
        {/* Explore Full Catalog Buttons - Close to Cards */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 md:gap-7 justify-center items-center mt-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CTAButton active={true} linkto={"/all-courses"}>
              <div className="flex items-center gap-2">
                Explore Full Catalog
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </div>
            </CTAButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <CTAButton active={false} linkto={"/all-courses"}>
              Learn More
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 py-12">
          {/* Job that is in Demand */}
          <motion.div 
            className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern Edvora dictates its own terms. Today, to be a
                competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/all-courses"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <TimelineSection />

          {/* Learning Language Section */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become an Instructor Section */}
        <InstructorSection />

        {/* Reviews Section */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1> */}
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home


