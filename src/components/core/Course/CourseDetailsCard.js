// import { useDispatch, useSelector } from "react-redux"

// import { ACCOUNT_TYPE } from "../../../utils/constants"
// import { BsFillCaretRightFill } from "react-icons/bs"
// import { FaShareSquare } from "react-icons/fa"
// import React from "react"
// import { addToCart } from "../../../slices/cartSlice"
// import copy from "copy-to-clipboard"
// import { toast } from "react-hot-toast"
// import { useNavigate } from "react-router-dom"

// function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {
//     thumbnail: ThumbnailImage,
//     price: CurrentPrice,
//     _id: courseId,
//   } = course

//   const handleShare = () => {
//     copy(window.location.href)
//     toast.success("Link copied to clipboard")
//   }

//   const handleAddToCart = () => {
//     if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//       toast.error("You are an Instructor. You can't buy a course.")
//       return
//     }
//     if (token) {
//       dispatch(addToCart(course))
//       return
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to add To Cart",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     })
//   }

//   // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

//   return (
//     <>
//       <div
//         className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
//       >
//         {/* Course Image */}
//         <img
//           src={ThumbnailImage}
//           alt={course?.courseName}
//           className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
//         />

//         <div className="px-4">
//           <div className="space-x-3 pb-4 text-3xl font-semibold">
//             Rs. {CurrentPrice}
//           </div>
//           <div className="flex flex-col gap-4">
//             <button
//               className="yellowButton"
//               onClick={
//                 user && course?.studentsEnrolled.includes(user?._id)
//                   ? () => navigate("/dashboard/enrolled-courses")
//                   : handleBuyCourse
//               }
//             >
//               {user && course?.studentsEnrolled.includes(user?._id)
//                 ? "Go To Course"
//                 : "Buy Now"}
//             </button>
//             {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
//               <button onClick={handleAddToCart} className="blackButton">
//                 Add to Cart
//               </button>
//             )}
//           </div>
//           <div>
//             <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
//               30-Day Money-Back Guarantee
//             </p>
//           </div>

//           <div className={``}>
//             <p className={`my-2 text-xl font-semibold `}>
//               This Course Includes :
//             </p>
//             <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
//               {course?.instructions?.map((item, i) => {
//                 return (
//                   <p className={`flex gap-2`} key={i}>
//                     <BsFillCaretRightFill />
//                     <span>{item}</span>
//                   </p>
//                 )
//               })}
//             </div>
//           </div>
//           <div className="text-center">
//             <button
//               className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
//               onClick={handleShare}
//             >
//               <FaShareSquare size={15} /> Share
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CourseDetailsCard

import {
  BsClock,
  BsFillCaretRightFill,
  BsPlayCircle,
  BsShieldCheck,
  BsStarFill
} from "react-icons/bs"
import {
  FaCertificate,
  FaHeart,
  FaRegHeart,
  FaShareSquare,
  FaUsers
} from "react-icons/fa"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ACCOUNT_TYPE } from "../../../utils/constants"
import { IoMdTime } from "react-icons/io"
import { MdOndemandVideo } from "react-icons/md"
import { addToCart } from "../../../slices/cartSlice"
import copy from "copy-to-clipboard"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
    rating,
    totalStudents,
    totalDuration,
    totalVideos,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("🎉 Link copied to clipboard!")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      toast.success("✅ Course added to cart!")
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const isEnrolled = user && course?.studentsEnrolled.includes(user?._id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-3xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
      whileHover={{
        boxShadow: '0 12px 48px 0 rgba(234, 179, 8, 0.3)',
        borderColor: 'rgba(234, 179, 8, 0.4)',
      }}
    >
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-yellow-500/40 via-purple-500/40 to-cyan-500/40 rounded-3xl blur-xl opacity-0"
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Enhanced Course Image with Glassmorphism */}
      <div className="relative group overflow-hidden">
        <motion.img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="w-full h-48 object-cover relative z-0"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent z-10" />
        
        {/* Light Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-400/20 z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.button
          whileHover={{ scale: 1.15, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl z-20"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
          }}
        >
          {isLiked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <FaHeart className="text-red-400 text-xl" />
            </motion.div>
          ) : (
            <FaRegHeart className="text-white text-xl" />
          )}
        </motion.button>
      </div>

      <div className="p-6 relative z-10">
        {/* Enhanced Price Section with Eye-Catching Animation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <motion.span 
              className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              ₹{CurrentPrice}
            </motion.span>
            <span className="text-slate-400 line-through text-lg font-semibold">
              ₹{Math.round(CurrentPrice * 1.5)}
            </span>
          </div>
          <motion.div 
            className="text-sm font-black text-green-300 px-4 py-2 rounded-full backdrop-blur-xl"
            style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
            }}
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            33% OFF
          </motion.div>
        </div>

        {/* Enhanced Action Buttons with Glow */}
        <div className="flex flex-col gap-3 mb-6">
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: isEnrolled 
                ? "0 0 30px rgba(34, 197, 94, 0.6)"
                : "0 0 30px rgba(234, 179, 8, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 px-6 rounded-xl font-black text-slate-900 transition-all duration-300 backdrop-blur-xl"
            style={
              isEnrolled
                ? {
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 1), rgba(16, 185, 129, 1))',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
                  }
                : {
                    background: 'linear-gradient(135deg, rgba(234, 179, 8, 1), rgba(251, 146, 60, 1))',
                    boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)',
                  }
            }
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            <div className="flex items-center justify-center gap-2">
              {isEnrolled ? (
                <>
                  <BsPlayCircle className="text-xl" />
                  <span className="font-black">Continue Learning</span>
                </>
              ) : (
                <>
                  <BsShieldCheck className="text-xl" />
                  <span className="font-black">Buy Now</span>
                </>
              )}
            </div>
          </motion.button>

          {!isEnrolled && (
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-xl font-bold backdrop-blur-xl text-white transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              Add to Cart
            </motion.button>
          )}
        </div>

        {/* Enhanced Guarantee Badge with Animation */}
        <motion.div 
          className="flex items-center justify-center gap-2 p-4 mb-4 rounded-xl backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(168, 85, 247, 0.25))',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 4px 16px 0 rgba(59, 130, 246, 0.3)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BsShieldCheck className="text-blue-400 text-xl" />
          </motion.div>
          <span className="text-sm font-black text-white">
            30-Day Money-Back Guarantee
          </span>
        </motion.div>

        {/* Enhanced Course Highlights with Glassmorphism */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <BsStarFill className="text-yellow-400 text-xl" />
            </motion.div>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              This Course Includes:
            </span>
          </h3>
          <div className="space-y-3">
            {course?.instructions?.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(234, 179, 8, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }}
              >
                <BsFillCaretRightFill className="text-yellow-400 flex-shrink-0 text-lg" />
                <span className="text-white text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Course Stats with Glassmorphism */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: MdOndemandVideo, label: "Videos", value: totalVideos || 24, color: "text-blue-400" },
            { icon: IoMdTime, label: "Duration", value: totalDuration || "8 hours", color: "text-green-400" },
            { icon: FaUsers, label: "Students", value: totalStudents || "1.2k", color: "text-purple-400" },
            { icon: FaCertificate, label: "Certificate", value: "Yes", color: "text-orange-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 p-3 rounded-xl backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.08,
                borderColor: 'rgba(234, 179, 8, 0.5)',
              }}
            >
              <stat.icon className={`${stat.color} text-lg`} />
              <div>
                <p className="text-xs text-slate-300 font-medium">{stat.label}</p>
                <p className="text-sm font-black text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Share Button with Animation */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl backdrop-blur-xl font-bold text-purple-300 transition-all duration-300 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.25))',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 4px 16px 0 rgba(168, 85, 247, 0.3)',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaShareSquare className="text-lg" />
          </motion.div>
          <span className="font-black">Share this course</span>
        </motion.button>
        
        {/* Shimmer Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  )
}

export default CourseDetailsCard