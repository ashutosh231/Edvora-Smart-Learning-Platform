// // Import Swiper styles
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "../../App.css"

// // Import required modules
// import { Autoplay, FreeMode, Pagination } from "swiper"
// import React, { useEffect, useState } from "react"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react"

// // Icons
// import { FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
// // Get apiFunction and the endpoint
// import { apiConnector } from "../../services/apiConnector"
// import { ratingsEndpoints } from "../../services/apis"

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([])
//   const truncateWords = 15

//   useEffect(() => {
//     ;(async () => {
//       try {
//         const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
//         if (data?.success) {
//           setReviews(data?.data)
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error)
//       }
//     })()
//   }, [])

//   return (
//     <div className="text-white w-full">
//       <div className="my-[50px] max-w-maxContentTab lg:max-w-maxContent">
//         {reviews.length > 0 ? (
//           <Swiper
//             loop={true}
//             freeMode={true}
//             spaceBetween={25}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             modules={[FreeMode, Pagination, Autoplay]}
//             className="w-full"
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//               1280: { slidesPerView: 4 },
//             }}
//           >
//             {reviews.map((review, i) => (
//               <SwiperSlide key={i}>
//                 <div className="flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-lg h-full">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review?.user?.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt="user"
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                     <div className="flex flex-col">
//                       <h1 className="font-semibold text-richblack-5">
//                         {`${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`}
//                       </h1>
//                       <h2 className="text-[12px] font-medium text-richblack-500">
//                         {review?.course?.courseName || "Unknown Course"}
//                       </h2>
//                     </div>
//                   </div>

//                   <p className="font-medium text-richblack-25 leading-5">
//                     {review?.review
//                       ? review.review.split(" ").length > truncateWords
//                         ? `${review.review.split(" ").slice(0, truncateWords).join(" ")} ...`
//                         : review.review
//                       : "No review provided."}
//                   </p>

//                   <div className="flex items-center gap-2 mt-auto">
//                     <h3 className="font-semibold text-yellow-100">
//                       {review?.rating ? review.rating.toFixed(1) : "0.0"}
//                     </h3>
//                     <ReactStars
//                       count={5}
//                       value={review?.rating || 0}
//                       size={18}
//                       edit={false}
//                       activeColor="#ffd700"
//                       emptyIcon={<FaStar />}
//                       fullIcon={<FaStar />}
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <p className="text-center text-richblack-400">No reviews available.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ReviewSlider

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"
// Icons
import { FaQuoteLeft, FaStar } from "react-icons/fa"
import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import ReactStars from "react-rating-stars-component"
// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const truncateWords = 25

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  // Loading skeleton component
  const ReviewSkeleton = () => (
    <div className="flex flex-col gap-4 bg-richblack-800 p-6 rounded-2xl h-full animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-richblack-700"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-richblack-700 rounded w-24"></div>
          <div className="h-3 bg-richblack-700 rounded w-32"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-richblack-700 rounded w-full"></div>
        <div className="h-3 bg-richblack-700 rounded w-4/5"></div>
        <div className="h-3 bg-richblack-700 rounded w-3/4"></div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-4 bg-richblack-700 rounded w-8"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-richblack-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="text-white w-full py-16 bg-gradient-to-b from-richblack-800 to-richblack-900">
      <div className="max-w-maxContentTab lg:max-w-maxContent mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-richblack-5 mb-4">
            What Our Students Say
          </h2>
          <p className="text-richblack-200 text-lg max-w-2xl mx-auto">
            Discover how our courses are transforming learning experiences
          </p>
        </div>

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
              0: { 
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: { 
                slidesPerView: 2,
                spaceBetween: 25
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30
              },
              1280: { 
                slidesPerView: 4,
                spaceBetween: 30
              },
            }}
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-4 bg-richblack-800 p-6 text-richblack-5 rounded-2xl h-full border border-richblack-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-50/20 hover:transform hover:-translate-y-1 group">
                  {/* Quote Icon */}
                  <div className="text-yellow-50 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <FaQuoteLeft size={20} />
                  </div>

                  {/* Review Content */}
                  <p className="font-medium text-richblack-5 leading-6 text-sm flex-1 italic">
                    {review?.review
                      ? review.review.split(" ").length > truncateWords
                        ? `${review.review.split(" ").slice(0, truncateWords).join(" ")}...`
                        : review.review
                      : "No review provided."}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-richblack-600">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="user"
                      className="h-12 w-12 rounded-full object-cover border-2 border-yellow-50 shadow-md"
                    />
                    <div className="flex flex-col flex-1">
                      <h1 className="font-semibold text-richblack-5 text-base">
                        {`${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim() || "Anonymous User"}
                      </h1>
                      <h2 className="text-sm font-medium text-richblack-300 mt-1">
                        {review?.course?.courseName || "Unknown Course"}
                      </h2>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-richblack-700 px-3 py-1 rounded-full">
                        <span className="font-bold text-yellow-50 text-sm">
                          {review?.rating ? review.rating.toFixed(1) : "0.0"}
                        </span>
                        <FaStar className="text-yellow-50 text-xs" />
                      </div>
                      <ReactStars
                        count={5}
                        value={review?.rating || 0}
                        size={16}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-richblack-700 flex items-center justify-center">
              <FaStar className="text-3xl text-richblack-400" />
            </div>
            <h3 className="text-xl font-semibold text-richblack-200 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-richblack-400 max-w-md mx-auto">
              Be the first to share your learning experience with our community.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewSlider