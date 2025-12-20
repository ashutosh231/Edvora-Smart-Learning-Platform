// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// import { BiInfoCircle } from "react-icons/bi"
// import ConfirmationModal from "../components/common/ConfirmationModal"
// import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
// import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
// import Error from "./Error"
// import Footer from "../components/common/Footer"
// import GetAvgRating from "../utils/avgRating"
// import { HiOutlineGlobeAlt } from "react-icons/hi"
// import RatingStars from "../components/common/RatingStars"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
// import { buyCourse } from "../services/operations/StudentFeaturesAPI"
// import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
// import { formatDate } from "../services/formatDate"

// function CourseDetails() {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { loading } = useSelector((state) => state.profile)
//   const { paymentLoading } = useSelector((state) => state.course)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   // Getting courseId from url parameter
//   const { courseId } = useParams()
//   // console.log(`course id: ${courseId}`)

//   // Declear a state to save the course details
//   const [response, setResponse] = useState(null)
//   const [confirmationModal, setConfirmationModal] = useState(null)
//   useEffect(() => {
//     // Calling fetchCourseDetails fucntion to fetch the details
//     ;(async () => {
//       try {
//         const res = await fetchCourseDetails(courseId)
//         // console.log("course details res: ", res)
//         setResponse(res)
//       } catch (error) {
//         console.log("Could not fetch Course Details")
//       }
//     })()
//   }, [courseId])

//   // console.log("response: ", response)

//   // Calculating Avg Review count
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   useEffect(() => {
//     const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
//     setAvgReviewCount(count)
//   }, [response])
//   // console.log("avgReviewCount: ", avgReviewCount)

//   // // Collapse all
//   // const [collapse, setCollapse] = useState("")
//   const [isActive, setIsActive] = useState(Array(0))
//   const handleActive = (id) => {
//     // console.log("called", id)
//     setIsActive(
//       !isActive.includes(id)
//         ? isActive.concat([id])
//         : isActive.filter((e) => e != id)
//     )
//   }

//   // Total number of lectures
//   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
//   useEffect(() => {
//     let lectures = 0
//     response?.data?.courseDetails?.courseContent?.forEach((sec) => {
//       lectures += sec.Subsection.length || 0
//     })
//     setTotalNoOfLectures(lectures)
//   }, [response])

//   if (loading || !response) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }
//   if (!response.success) {
//     return <Error />
//   }

//   const {
//     // _id: course_id,
//     courseName,
//     courseDescription,
//     thumbnail,
//     price,
//     whatYouWillLearn,
//     courseContent,
//     ratingAndReviews,
//     instructor,
//     studentsEnrolled,
//     createdAt,
//   } = response.data?.courseDetails

//   const handleBuyCourse = () => {
//     if (token) {
//       buyCourse(token, [courseId], user, navigate, dispatch)
//       return
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to Purchase Course.",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     })
//   }

//   if (paymentLoading) {
//     // console.log("payment loading")
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className={`relative w-full bg-richblack-800`}>
//         {/* Hero Section */}
//         <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
//           <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
//             <div className="relative block max-h-[30rem] lg:hidden">
//               <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
//               <img
//                 src={thumbnail}
//                 alt="course thumbnail"
//                 className="aspect-auto w-full"
//               />
//             </div>
//             <div
//               className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
//             >
//               <div>
//                 <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
//                   {courseName}
//                 </p>
//               </div>
//               <p className={`text-richblack-200`}>{courseDescription}</p>
//               <div className="text-md flex flex-wrap items-center gap-2">
//                 <span className="text-yellow-25">{avgReviewCount}</span>
//                 <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//                 <span>{`(${ratingAndReviews.length} reviews)`}</span>
//                 <span>{`${studentsEnrolled.length} students enrolled`}</span>
//               </div>
//               <div>
//                 <p className="">
//                   Created By {`${instructor.firstName} ${instructor.lastName}`}
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-5 text-lg">
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <BiInfoCircle /> Created at {formatDate(createdAt)}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <HiOutlineGlobeAlt /> English
//                 </p>
//               </div>
//             </div>
//             <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
//               <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
//                 Rs. {price}
//               </p>
//               <button className="yellowButton" onClick={handleBuyCourse}>
//                 Buy Now
//               </button>
//               <button className="blackButton">Add to Cart</button>
//             </div>
//           </div>
//           {/* Courses Card */}
//           <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
//             <CourseDetailsCard
//               course={response?.data?.courseDetails}
//               setConfirmationModal={setConfirmationModal}
//               handleBuyCourse={handleBuyCourse}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
//         <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
//           {/* What will you learn section */}
//           <div className="my-8 border border-richblack-600 p-8">
//             <p className="text-3xl font-semibold">What you'll learn</p>
//             <div className="mt-5">
//               <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
//             </div>
//           </div>

//           {/* Course Content Section */}
//           <div className="max-w-[830px] ">
//             <div className="flex flex-col gap-3">
//               <p className="text-[28px] font-semibold">Course Content</p>
//               <div className="flex flex-wrap justify-between gap-2">
//                 <div className="flex gap-2">
//                   <span>
//                     {courseContent.length} {`section(s)`}
//                   </span>
//                   <span>
//                     {totalNoOfLectures} {`lecture(s)`}
//                   </span>
//                   <span>{response.data?.totalDuration} total length</span>
//                 </div>
//                 <div>
//                   <button
//                     className="text-yellow-25"
//                     onClick={() => setIsActive([])}
//                   >
//                     Collapse all sections
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Course Details Accordion */}
//             <div className="py-4">
//               {courseContent?.map((course, index) => (
//                 <CourseAccordionBar
//                   course={course}
//                   key={index}
//                   isActive={isActive}
//                   handleActive={handleActive}
//                 />
//               ))}
//             </div>

//             {/* Author Details */}
//             <div className="mb-12 py-4">
//               <p className="text-[28px] font-semibold">Author</p>
//               <div className="flex items-center gap-4 py-4">
//                 <img
//                   src={
//                     instructor.image
//                       ? instructor.image
//                       : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
//                   }
//                   alt="Author"
//                   className="h-14 w-14 rounded-full object-cover"
//                 />
//                 <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
//               </div>
//               <p className="text-richblack-50">
//                 {instructor?.additionalDetails?.about}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }

// export default CourseDetails

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

import { BiInfoCircle } from "react-icons/bi"
import { BsPeople, BsStarFill } from "react-icons/bs"
import { IoSparkles } from "react-icons/io5"
import ConfirmationModal from "../components/common/ConfirmationModal"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import Error from "./Error"
import Footer from "../components/common/Footer"
import GetAvgRating from "../utils/avgRating"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import RatingStars from "../components/common/RatingStars"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { buyCourse } from "../services/operations/StudentFeaturesAPI"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { formatDate } from "../services/formatDate"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from URL parameter
  const { courseId } = useParams()

  // State to store fetched course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details", error)
      }
    }
    fetchData()
  }, [courseId])

  // Calculate average rating
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    if (response?.data?.courseDetails?.ratingAndReviews) {
      const count = GetAvgRating(response.data.courseDetails.ratingAndReviews)
      setAvgReviewCount(count)
    }
  }, [response])

  // Manage course section accordion states
  const [isActive, setIsActive] = useState([])
  const handleActive = (id) => {
    setIsActive((prev) =>
      !prev.includes(id)
        ? [...prev, id]
        : prev.filter((e) => e !== id) // ✅ Changed '!=' to '!==' to fix ESLint eqeqeq error
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    if (response?.data?.courseDetails?.courseContent) {
      response.data.courseDetails.courseContent.forEach((sec) => {
        lectures += sec.Subsection?.length || 0 // ✅ Safe optional chaining
      })
    }
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 text-white overflow-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Light Rays */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-1 h-96 bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              top: '-50%',
              transformOrigin: 'bottom center',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative w-full z-10">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]" />
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            <motion.div 
              className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg relative w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p 
                className="text-4xl font-black sm:text-[42px] bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {courseName}
              </motion.p>
              
              <motion.p 
                className="text-slate-300 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {courseDescription}
              </motion.p>

              {/* Enhanced Rating Section */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 p-4 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <BsStarFill className="text-yellow-400 text-xl" />
                  <span className="text-yellow-400 font-bold text-lg">{avgReviewCount}</span>
                </div>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span className="text-slate-300">{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                <div className="flex items-center gap-2 text-slate-300">
                  <BsPeople className="text-purple-400" />
                  <span>{`${studentsEnrolled?.length || 0} students enrolled`}</span>
                </div>
              </motion.div>

              {/* Instructor Info */}
              <motion.div
                className="flex items-center gap-3 p-4 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <IoSparkles className="text-yellow-400 text-xl" />
                </motion.div>
                <p className="text-white">
                  Created By <span className="text-yellow-400 font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</span>
                </p>
              </motion.div>

              {/* Course Meta */}
              <motion.div 
                className="flex flex-wrap gap-4 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.p 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <BiInfoCircle className="text-cyan-400" /> 
                  <span className="text-slate-300">Created at {formatDate(createdAt)}</span>
                </motion.p>
                <motion.p 
                  className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <HiOutlineGlobeAlt className="text-purple-400" /> 
                  <span className="text-slate-300">English</span>
                </motion.p>
              </motion.div>≠≠≠≠≠
            </motion.div>

            {/* Mobile Course Card */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>

          {/* Course Card (Desktop) */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response.data.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>

        {/* Enhanced What You Will Learn Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] relative z-10 pt-8 pb-6">
        <div className="max-w-maxContentTab lg:mx-0 xl:max-w-[810px] space-y-6">
          <motion.div 
            className="p-4 md:p-5 rounded-xl backdrop-blur-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated Gradient Border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-yellow-500/40 to-cyan-500/40 rounded-xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.p 
              className="text-lg md:text-xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              What you'll learn
            </motion.p>
            <motion.div 
              className="text-slate-200 relative z-10 prose prose-invert max-w-none prose-base"
              style={{
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </motion.div>
          </motion.div>

          {/* Enhanced Course Content Section */}
          <motion.div 
            className="flex flex-col gap-2 p-4 md:p-5 rounded-xl backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
              <motion.p 
                className="text-lg md:text-xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Course Content
              </motion.p>
              <div className="flex flex-wrap justify-between gap-2 items-center">
                <div className="flex flex-wrap gap-1.5">
                  <motion.span 
                    className="px-2 py-1 rounded-lg backdrop-blur-xl text-xs"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {courseContent?.length || 0} section(s)
                  </motion.span>
                  <motion.span 
                    className="px-2 py-1 rounded-lg backdrop-blur-xl text-xs"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {totalNoOfLectures} lecture(s)
                  </motion.span>
                  <motion.span 
                    className="px-2 py-1 rounded-lg backdrop-blur-xl text-xs"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {response.data?.totalDuration || "N/A"} total length
                  </motion.span>
                </div>
                <motion.button 
                  className="px-2.5 py-1 rounded-lg backdrop-blur-xl text-yellow-400 font-semibold text-xs"
                  style={{
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 179, 8, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </motion.button>
              </div>

              {/* Accordion */}
              <div className="py-3 mt-3">
                {courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    key={index}
                    course={course}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>
            </motion.div>

          {/* Enhanced Author Details Section */}
          <motion.div 
            className="p-4 md:p-5 rounded-xl backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
              <motion.p 
                className="text-lg md:text-xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Author
              </motion.p>
              <motion.div 
                className="flex items-center gap-2 py-1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <motion.img
                    src={
                      instructor.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                    }
                    alt="Author"
                    className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400/50"
                    style={{
                      boxShadow: '0 0 15px rgba(234, 179, 8, 0.5)',
                    }}
                  />
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-purple-400 rounded-full blur opacity-50"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
                <p className="text-sm md:text-base font-black text-white">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </motion.div>
              <motion.p 
                className="text-slate-300 leading-relaxed text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {instructor?.additionalDetails?.about}
              </motion.p>
            </motion.div>
          </div>
        </div>
      
        <Footer />
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  )
}

export default CourseDetails
