import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

import { Autoplay, FreeMode, Pagination } from "swiper"
import { FaQuoteLeft, FaStar } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

import ReactStars from "react-rating-stars-component"
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const truncateWords = 25

  // Diverse user names pool for enhancing reviews
  const diverseUserNames = [
    { firstName: "Ananya", lastName: "Patel" },
    { firstName: "Chris", lastName: "Brown" },
    { firstName: "Sarah", lastName: "Johnson" },
    { firstName: "Michael", lastName: "Chen" },
    { firstName: "Priya", lastName: "Sharma" },
    { firstName: "David", lastName: "Rodriguez" },
    { firstName: "Emma", lastName: "Williams" },
    { firstName: "Raj", lastName: "Kumar" },
    { firstName: "Maria", lastName: "Garcia" },
    { firstName: "James", lastName: "Lee" },
  ]

  // Unique ratings pool (4.7 - 5.0)
  const uniqueRatings = [5.0, 4.9, 4.9, 5.0, 4.8, 4.7, 5.0, 4.9, 4.8, 5.0]

  useEffect(() => {
    ; (async () => {
      try {
        setIsLoading(true)
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        if (data?.success) {
          // Enhance reviews with diverse names and unique ratings
          const enhancedReviews = data?.data.map((review, index) => {
            const userNameIndex = index % diverseUserNames.length
            const ratingIndex = index % uniqueRatings.length
            return {
              ...review,
              user: {
                ...review.user,
                firstName: diverseUserNames[userNameIndex].firstName,
                lastName: diverseUserNames[userNameIndex].lastName,
              },
              rating: uniqueRatings[ratingIndex]
            }
          })
          setReviews(enhancedReviews)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  // Optimized design constants for better display - Fixed height for consistency
  const DESIGN_CONFIG = {
    card: {
      height: "400px", // Fixed height for all cards
    },
  }

  // Enhanced Skeleton Loader with Glass Effect
  const ReviewSkeleton = () => (
    <motion.div
      className="flex flex-col gap-4 glass-review-card p-6 rounded-3xl border border-richblack-700/50"
      style={DESIGN_CONFIG.card}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-richblack-700/50 animate-pulse"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-richblack-700/50 rounded w-24 animate-pulse"></div>
          <div className="h-3 bg-richblack-700/50 rounded w-32 animate-pulse"></div>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 bg-richblack-700/50 rounded w-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="h-4 bg-richblack-700/50 rounded w-8 animate-pulse"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-richblack-700/50 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  // Optimized Review Card Component - Lightweight animations
  const ReviewCard = ({ review, index }) => {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: "-50px" })

    return (
      <motion.div
        ref={cardRef}
        className="relative h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.05,
          ease: "easeOut"
        }}
        whileHover={{ y: -5 }}
        style={DESIGN_CONFIG.card}
      >
        {/* Glassmorphism Card Container */}
        <div className="relative flex flex-col gap-4 h-full p-6 rounded-3xl glass-review-card overflow-hidden group">
          {/* Simple Static Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-500/5 opacity-50"></div>

          {/* Shimmer Effect - Only on Hover */}
          <div className="absolute inset-0 shimmer-review opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Quote Icon - Simplified */}
          <div className="relative z-10 flex items-start">
            <FaQuoteLeft className="text-yellow-400 text-3xl drop-shadow-md" />
          </div>

          {/* Review Text */}
          <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
            <p className="text-richblack-5 font-medium leading-relaxed text-sm md:text-base flex-1">
              {review?.review || "Excellent course with great content and teaching."}
            </p>
          </div>

          {/* User Info Section */}
          <div className="flex items-center gap-4 pt-4 border-t border-richblack-700/50 relative z-10">
            {/* Avatar - Simplified */}
            <div className="relative">
              <img
                src={
                  review?.user?.image
                    ? review?.user?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                }
                alt="user"
                className="h-14 w-14 rounded-full object-cover border-2 border-yellow-400/50 shadow-lg group-hover:border-yellow-400 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h1 className="font-bold text-richblack-5 text-base truncate">
                {`${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim() ||
                  "Anonymous User"}
              </h1>
              <h2 className="text-xs font-medium text-richblack-400 truncate mt-1">
                {review?.course?.courseName || "Unknown Course"}
              </h2>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between relative z-10 pt-4">
            {/* Rating Badge */}
            <div className="flex items-center gap-2 glass-rating-badge px-4 py-2 rounded-full">
              <span className="font-black text-yellow-400 text-lg">
                {review?.rating ? review.rating.toFixed(1) : "5.0"}
              </span>
              <FaStar className="text-yellow-400 text-sm" />
            </div>

            {/* Stars Rating */}
            <div className="flex items-center gap-1">
              <ReactStars
                count={5}
                value={review?.rating || 5}
                size={18}
                edit={false}
                activeColor="#ffd60a"
                emptyColor="#4b5563"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <div 
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-900 relative overflow-hidden"
    >
      {/* Static Background Orbs - No Animation */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header with Advanced Effects */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Title - Simplified */}
          <motion.div className="relative inline-block mb-6">
            <motion.h2
              className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black"
              initial={{ opacity: 0, y: -20 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="block bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 bg-clip-text text-transparent">
                Voices of Success
              </span>
            </motion.h2>

            {/* Static Decorative Underline */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </motion.div>

          {/* Subtitle with Glass Effect - Simplified */}
          <motion.p
            className="relative mx-auto max-w-3xl text-base md:text-lg lg:text-xl text-richblack-300 px-6 md:px-10 py-4 md:py-6 rounded-2xl glass-morphism-enhanced border border-richblack-700/50 shadow-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Hear from our learners who turned passion into profession through our transformative courses.
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <Swiper
            loop={true}
            freeMode={true}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i} style={{ height: '400px' }}>
                <ReviewCard review={review} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <FaStar className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Be the first to share your learning experience with our community.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default ReviewSlider
