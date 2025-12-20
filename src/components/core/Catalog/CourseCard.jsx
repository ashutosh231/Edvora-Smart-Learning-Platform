import {
  BsClock,
  BsFire,
  BsPeople,
  BsPlayCircle,
  BsShieldCheck,
  BsStarFill
} from 'react-icons/bs'
import { IoRibbon, IoTimer } from 'react-icons/io5'
import { useEffect, useState } from 'react'

import { FiCheckCircle } from 'react-icons/fi'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'
// import RatingStars from '../../common/RatingStars'
import { motion } from 'framer-motion'
// import { use } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course, Height, index }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  // const handleBookmark = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   setIsBookmarked(!isBookmarked)
  // }
  const navigate=useNavigate()

  const difficultyLevel = course?.difficulty || 'Beginner'
  const totalStudents = course?.studentsEnrolled?.length || 1247
  // const totalLessons = course?.courseContent?.reduce((acc, section) => 
  //   acc + (section?.Subsection?.length || 0), 0
  // ) || 24

  // Calculate discount
  const originalPrice = Math.round(course?.price * 1.5)
  const discountPercent = Math.round(((originalPrice - course?.price) / originalPrice) * 100)

  const getDifficultyColor = (level) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'from-green-400 to-emerald-500'
      case 'intermediate': return 'from-yellow-400 to-orange-500'
      case 'advanced': return 'from-red-400 to-pink-500'
      default: return 'from-blue-400 to-purple-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex-1 min-w-0"
    >
      <Link to={`/courses/${course._id}`}>
        <div 
          className="relative h-full rounded-none overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          {/* Animated Gradient Border */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-yellow-500/40 via-purple-500/40 to-cyan-500/40 rounded-none blur-xl opacity-0"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Enhanced Hot Deal Floating Badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -15 }}
            transition={{ delay: (index || 0) * 0.2 + 0.3 }}
            className="absolute -top-2 -right-2 z-20"
          >
            <motion.div 
              className="relative px-4 py-1.5 flex items-center justify-center rounded-full backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(236, 72, 153, 0.9))',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <BsFire className="text-white mr-1 text-xs" />
              <span className="text-white font-black text-xs">
                {discountPercent}% OFF
              </span>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <motion.div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.9))',
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.5)',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <BsShieldCheck className="text-white text-xs" />
              <span className="text-xs font-black text-white">Verified</span>
            </motion.div>
          </div>

          {/* Enhanced Image Container with Glassmorphism */}
          <div className="relative overflow-hidden">
            <div className={`${Height} w-full relative`}>
              <motion.img
                src={course?.thumbnail}
                alt={course?.courseName}
                className={`w-full h-full object-cover relative z-0 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Loading Animation */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 animate-pulse" />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent z-10" />
              
              {/* Light Overlay on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-400/20 z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Enhanced Video Play Icon Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="p-5 rounded-full backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.9), rgba(251, 146, 60, 0.9))',
                    boxShadow: '0 0 30px rgba(234, 179, 8, 0.8)',
                  }}
                >
                  <BsPlayCircle className="text-4xl text-slate-900" />
                </motion.div>
                {/* Pulsing Ring Effect */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full border-2 border-yellow-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Course Duration */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <BsClock className="text-yellow-400" />
                <span>8h 30m</span>
              </div>
            </div>
          </div>

          {/* Enhanced Course Content with Glassmorphism */}
          <div className="p-5 flex flex-col relative z-10" style={{ minHeight: '220px' }}>
            {/* Enhanced Category & Difficulty */}
            <div className="flex items-center justify-between mb-2">
              <motion.span 
                className="text-xs font-bold text-blue-300 px-3 py-1.5 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                {course?.category || 'Development'}
              </motion.span>
              <motion.span 
                className={`text-xs font-black text-white px-3 py-1.5 rounded-full backdrop-blur-xl bg-gradient-to-r ${getDifficultyColor(difficultyLevel)}`}
                style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                {difficultyLevel}
              </motion.span>
            </div>

            {/* Enhanced Title */}
            <motion.h3 
              className="text-base font-black text-white line-clamp-2 mb-2 leading-tight min-h-[40px] flex items-start group-hover:text-yellow-400 transition-colors"
              whileHover={{ textShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }}
            >
              {course?.courseName}
            </motion.h3>

            {/* Instructor */}
            <p className="text-richblack-200 text-xs font-medium mb-3">
              By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Enhanced Rating & Students */}
            <div className="flex items-center justify-between mb-3">
              <motion.div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(234, 179, 8, 0.2)',
                  border: '1px solid rgba(234, 179, 8, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <BsStarFill className="text-yellow-400 text-sm" />
                <span className="text-yellow-400 font-black text-xs">{avgReviewCount || 4.8}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5 text-slate-300 text-xs px-3 py-1.5 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <BsPeople className="text-purple-400" />
                <span className="font-semibold">{totalStudents.toLocaleString()}+</span>
              </motion.div>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <motion.div 
                className="flex items-center gap-1.5 text-xs text-slate-300 px-2 py-1.5 rounded-lg backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiCheckCircle className="text-green-400 text-sm" />
                <span className="font-medium">Certificate</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1.5 text-xs text-slate-300 px-2 py-1.5 rounded-lg backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <IoTimer className="text-orange-400 text-sm" />
                <span className="font-medium">Lifetime</span>
              </motion.div>
            </div>

            {/* Enhanced Price & CTA Section */}
            <div className="mt-auto pt-3 border-t border-white/10">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <motion.span 
                      className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      style={{ backgroundSize: '200% auto' }}
                    >
                      ₹{course?.price}
                    </motion.span>
                    <span className="text-slate-400 line-through text-xs font-semibold">
                      ₹{originalPrice}
                    </span>
                  </div>
                  <span className="text-green-400 text-xs font-black">
                    Save ₹{originalPrice - course?.price}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: '0 0 25px rgba(234, 179, 8, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl text-slate-900 text-xs font-black transition-all duration-200 whitespace-nowrap min-w-[90px] backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(234, 179, 8, 1), rgba(251, 146, 60, 1))',
                    boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate(`/courses/${course._id}`)
                  }}
                >
                  Enroll Now
                </motion.button>
              </div>
            </div>
            
            {/* Shimmer Effect on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: 'none' }}
            />
          </div>

          {/* Enhanced Bestseller Badge */}
          {course?.isBestSeller && (
            <motion.div 
              className="absolute top-2 right-2 z-20"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <motion.div 
                className="flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.9), rgba(239, 68, 68, 0.9))',
                  boxShadow: '0 0 20px rgba(251, 146, 60, 0.6)',
                }}
                whileHover={{ scale: 1.1 }}
              >
                <IoRibbon className="text-white text-xs" />
                <span className="text-xs font-black text-white">Bestseller</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default CourseCard