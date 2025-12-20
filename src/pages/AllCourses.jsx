import { AnimatePresence, motion } from "framer-motion"
import {
  BsPeople,
  BsStarFill,
  BsPlayCircleFill,
  BsClock,
  BsLightningChargeFill
} from "react-icons/bs"
import {
  FiChevronDown,
  FiGrid,
  FiList,
  FiSearch,
  FiTrendingUp,
  FiBookOpen,
  FiAward
} from "react-icons/fi"
import React, { useEffect, useState } from "react"

import { IoSparkles, IoRocketSharp } from "react-icons/io5"
import { HiOutlineAcademicCap } from "react-icons/hi"
import { apiConnector } from "../services/apiConnector"
import { courseEndpoints } from "../services/apis"
import { useNavigate } from "react-router-dom"

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API)
        if (res?.data?.success) {
          setAllCourses(res.data.data)
        } else {
          console.error("Invalid response:", res)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "students":
          return (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
        default:
          return (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
      }
    })

  const categories = [...new Set(allCourses.map((c) => c.category).filter(Boolean))]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  const particlePositions = React.useMemo(() => {
    return [...Array(30)].map(() => ({
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 px-6 py-3 rounded-full border border-yellow-500/30 mb-8 backdrop-blur-xl shadow-lg shadow-yellow-500/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.5)" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <IoSparkles className="text-yellow-400 text-xl" />
              </motion.div>
              <span className="text-yellow-400 font-semibold tracking-wide">
                Learn. Grow. Succeed.
              </span>
              <IoRocketSharp className="text-orange-400 text-xl" />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Explore{" "}
              </span>
              <motion.span 
                className="bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundSize: "200% auto" }}
              >
                Courses
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Discover your potential with{" "}
              <motion.span 
                className="text-yellow-400 font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {allCourses.length}+
              </motion.span>{" "}
              expert-led courses and hands-on learning experiences
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { icon: HiOutlineAcademicCap, label: "Expert Instructors", value: "50+", color: "text-purple-400" },
                { icon: FiBookOpen, label: "Courses Available", value: allCourses.length + "+", color: "text-yellow-400" },
                { icon: BsPeople, label: "Active Learners", value: "10K+", color: "text-cyan-400" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50"
                  whileHover={{ scale: 1.05, borderColor: "rgba(234, 179, 8, 0.4)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  <stat.icon className={"text-2xl " + stat.color} />
                  <div className="text-left">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* Redesigned Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-12"
        >
          {/* Subtle Outer Glow */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* Main Glass Container */}
          <div 
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            {/* Floating Background Orbs */}
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />

            {/* Search Bar */}
            <motion.div
              className="relative mb-6 group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div 
                className="relative rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <motion.div
                  className="absolute left-6 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiSearch className="text-2xl text-slate-400 group-focus-within:text-yellow-400 transition-colors" />
                </motion.div>
                
                <input
                  type="text"
                  placeholder="Search for courses, instructors, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-16 py-5 bg-transparent text-white text-lg placeholder-slate-500 outline-none focus:placeholder-slate-400 transition-all"
                />

                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm("")}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-yellow-400 transition-colors"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    ✕
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Filters Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Category Filter */}
              <motion.div
                className="relative"
                whileHover={{ y: -2 }}
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-transparent pl-4 pr-10 py-3.5 text-white text-sm cursor-pointer outline-none"
                  >
                    <option value="all" className="bg-slate-900">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} className="bg-slate-900">{category}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                </div>
              </motion.div>

              {/* Sort Filter */}
              <motion.div
                className="relative"
                whileHover={{ y: -2 }}
              >
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-transparent pl-4 pr-10 py-3.5 text-white text-sm cursor-pointer outline-none"
                  >
                    <option value="popular" className="bg-slate-900">Most Popular</option>
                    <option value="rating" className="bg-slate-900">Highest Rated</option>
                    <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                    <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                    <option value="students" className="bg-slate-900">Most Enrolled</option>
                  </select>
                  <FiTrendingUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-lg" />
                </div>
              </motion.div>

              {/* View Toggle */}
              <motion.div
                className="relative rounded-xl overflow-hidden sm:col-span-2 lg:col-span-2"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{ y: -2 }}
              >
                <div className="flex gap-2 p-1.5">
                  {["grid", "list"].map((mode) => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode(mode)}
                      className={"flex-1 py-2.5 rounded-lg transition-all font-medium text-sm " + (viewMode === mode
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 shadow-lg"
                        : "text-slate-300 hover:text-white"
                      )}
                      style={viewMode !== mode ? {
                        background: "rgba(255, 255, 255, 0.03)",
                      } : {}}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {mode === "grid" ? <FiGrid size={16} /> : <FiList size={16} />}
                        <span>{mode === "grid" ? "Grid View" : "List View"}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Results Summary */}
            <motion.div 
              className="relative rounded-xl p-5 flex flex-wrap items-center justify-between gap-4"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)",
                    border: "1px solid rgba(234, 179, 8, 0.3)",
                  }}
                >
                  <FiBookOpen className="text-yellow-400 text-lg" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Showing Results</p>
                  <p className="text-white text-lg font-bold">
                    {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BsLightningChargeFill className="text-yellow-400" />
                  </motion.div>
                  <span>Live Results</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
              <div className="w-20 h-20 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full" />
              <motion.div
                className="absolute inset-2 border-4 border-purple-400/30 border-b-purple-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
            <motion.p 
              className="mt-6 text-slate-400 text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading amazing courses...
            </motion.p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <motion.div 
            className="text-center py-24 bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiSearch className="text-6xl text-yellow-400 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-3 text-white">No courses found</h3>
            <p className="text-slate-400 text-lg">Try adjusting your filters or search terms.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              : "flex flex-col gap-6"
            }
          >
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  layout
                  onHoverStart={() => setHoveredCard(course._id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={"group relative cursor-pointer " + (
                    viewMode === "list" ? "flex flex-row" : "flex flex-col"
                  )}
                  onClick={() => navigate("/courses/" + course._id)}
                >
                  {/* Subtle Glow Effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-3xl blur-xl"
                    animate={hoveredCard === course._id ? { 
                      opacity: 0.6,
                    } : { 
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />

                  {/* Animated Light Border */}
                  <motion.div
                    className="absolute -inset-0.5 rounded-3xl opacity-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
                    }}
                    animate={hoveredCard === course._id ? {
                      opacity: 1,
                    } : {
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />

                  {/* Main Card */}
                  <motion.div 
                    className={"relative overflow-hidden rounded-3xl " + (
                      viewMode === "list" ? "flex flex-row w-full" : "flex flex-col h-full"
                    )}
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    }}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.02,
                      boxShadow: "0 20px 60px 0 rgba(139, 92, 246, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {/* Subtle Light Sparkles on Hover */}
                    {hoveredCard === course._id && [...Array(3)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-20"
                        initial={{
                          x: "50%",
                          y: "50%",
                          opacity: 0,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 80}%`,
                          y: `${50 + (Math.random() - 0.5) * 80}%`,
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      />
                    ))}

                    {/* Image Section */}
                    <div className={"relative overflow-hidden " + (viewMode === "list" ? "w-80 flex-shrink-0" : "h-56")}>
                      <motion.img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15, rotate: 2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      
                      {/* Multi-layer Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-500/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Category Badge with Glow */}
                      <motion.div 
                        className="absolute top-4 left-4 z-10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-yellow-500/50 blur-lg rounded-full" />
                          <span className="relative block bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-300 text-xs font-black px-4 py-2 rounded-full shadow-lg">
                            {course.category || "Development"}
                          </span>
                        </div>
                      </motion.div>

                      {/* Enhanced Play Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="absolute -inset-3 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full blur-xl"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.4, 0.6, 0.4],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          <div className="relative w-20 h-20 bg-gradient-to-r from-white/90 to-white/70 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
                            style={{
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <BsPlayCircleFill className="text-4xl text-slate-900 ml-1" />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Trending Badge with Animation */}
                      {index < 3 && (
                        <motion.div 
                          className="absolute top-4 right-4 z-10"
                          animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-lg rounded-full"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <span className="relative flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <BsLightningChargeFill className="text-sm" />
                              </motion.div>
                              Trending
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Floating Price Tag */}
                      <motion.div
                        className="absolute bottom-4 right-4 z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className="rounded-2xl px-4 py-2 shadow-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <span className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            ₹{course.price}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className={"flex flex-col justify-between flex-1 p-6 relative " + (viewMode === "list" ? "py-8" : "")}>
                      {/* Animated Background Pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                        animate={{
                          backgroundPosition: ["0px 0px", "20px 20px"],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <div className="relative z-10">
                        {/* Title with Gradient on Hover */}
                        <motion.h3 
                          className="text-xl font-black text-white mb-3 line-clamp-2 leading-tight"
                          whileHover={{
                            backgroundImage: "linear-gradient(to right, #fbbf24, #f97316)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {course.courseName}
                        </motion.h3>
                        
                        {/* Instructor Info */}
                        <motion.div 
                          className="flex items-center gap-2 mb-4 p-3 rounded-xl backdrop-blur-sm"
                          style={{
                            background: "rgba(168, 85, 247, 0.1)",
                            border: "1px solid rgba(168, 85, 247, 0.2)",
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(168, 85, 247, 0.15)",
                          }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          >
                            <HiOutlineAcademicCap className="text-purple-400 text-xl" />
                          </motion.div>
                          <span className="text-sm text-slate-300">
                            By <span className="text-yellow-400 font-bold">
                              {course.instructor?.firstName} {course.instructor?.lastName}
                            </span>
                          </span>
                        </motion.div>

                        {/* Stats Row with Enhanced Design */}
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          {[
                            { icon: BsStarFill, value: "4.8", color: "text-yellow-400", bg: "rgba(234, 179, 8, 0.1)", border: "rgba(234, 179, 8, 0.3)" },
                            { icon: BsPeople, value: `${course.studentsEnrolled?.length || 0}`, label: "students", color: "text-purple-400", bg: "rgba(168, 85, 247, 0.1)", border: "rgba(168, 85, 247, 0.3)" },
                            { icon: BsClock, value: "12h", color: "text-cyan-400", bg: "rgba(6, 182, 212, 0.1)", border: "rgba(6, 182, 212, 0.3)" },
                          ].map((stat, idx) => (
                            <motion.div
                              key={idx}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-sm ${stat.color}`}
                              style={{
                                background: stat.bg,
                                border: `1px solid ${stat.border}`,
                              }}
                              whileHover={{ 
                                scale: 1.1,
                                y: -2,
                                boxShadow: `0 0 20px ${stat.border}`,
                              }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <stat.icon className="text-sm" />
                              <span className="text-sm font-bold">{stat.value}</span>
                              {stat.label && <span className="text-xs text-slate-400">{stat.label}</span>}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Section */}
                      <div className="relative z-10 flex flex-col gap-3 pt-5 border-t border-white/10">
                        {/* Price Display */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                              ₹{course.price}
                            </span>
                            <span className="text-sm text-slate-500 line-through">₹{Math.round(course.price * 1.5)}</span>
                          </div>
                          <motion.div
                            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-xs font-bold text-green-400">
                              {Math.round((1 - course.price / (course.price * 1.5)) * 100)}% OFF
                            </span>
                          </motion.div>
                        </div>

                        {/* Enroll Button */}
                        <motion.button
                          whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)",
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="relative w-full py-4 rounded-2xl overflow-hidden group"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate("/courses/" + course._id)
                          }}
                        >
                          {/* Animated Gradient Background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"
                            style={{ backgroundSize: "200% 100%" }}
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />

                          <span className="relative flex items-center justify-center gap-2 text-slate-900 font-black text-lg">
                            <FiAward className="text-xl" />
                            Enroll Now
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More */}
        {filteredCourses.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-xl shadow-purple-500/30 flex items-center gap-3 mx-auto"
            >
              <IoRocketSharp className="text-xl" />
              Explore More Courses
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Footer Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

export default AllCourses
