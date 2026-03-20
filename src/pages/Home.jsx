import CinematicGallery from "../components/core/HomePage/CinematicGallery"
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
import { motion } from "framer-motion"


function Home() {
  
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

        {/* Cinematic Image Gallery */}
        <CinematicGallery />

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


