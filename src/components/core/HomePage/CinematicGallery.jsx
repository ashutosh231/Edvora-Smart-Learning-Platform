import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import heroStudents from "../../../assets/Images/hero_students_collab.png";
import heroFuturistic from "../../../assets/Images/hero_futuristic_class.png";
import heroCoding from "../../../assets/Images/hero_coding_hands.png";
import heroSuccess from "../../../assets/Images/hero_success_moment.png";

const slides = [
  {
    image: heroStudents,
    title: "Collaborative Learning",
    subtitle: "Build Together, Grow Together",
    accent: "from-amber-400 to-orange-500",
  },
  {
    image: heroFuturistic,
    title: "Future of Education",
    subtitle: "Immersive Digital Classrooms",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    image: heroCoding,
    title: "Hands-On Coding",
    subtitle: "Write Real Code from Day One",
    accent: "from-emerald-400 to-green-500",
  },
  {
    image: heroSuccess,
    title: "Celebrate Success",
    subtitle: "Your Achievement, Your Story",
    accent: "from-yellow-300 to-amber-500",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const CinematicGallery = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection) => {
      setCurrent(([prev]) => {
        const next =
          newDirection > 0
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length;
        return [next, newDirection];
      });
    },
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [isPaused, paginate]);

  const slide = slides[current];

  return (
    <motion.div
      className="relative mx-auto my-12 w-11/12 max-w-7xl overflow-hidden rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ aspectRatio: "16 / 8" }}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image with Ken Burns */}
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 12, ease: "linear" }}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 via-richblack-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-richblack-900/60 via-transparent to-richblack-900/60" />

          {/* Anamorphic lens flare bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span
                className={`inline-block mb-3 px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${slide.accent} text-richblack-900`}
              >
                {slide.subtitle}
              </span>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                {slide.title}
              </h3>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Nav arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-richblack-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-richblack-800/80 hover:border-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-sm md:text-base group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-richblack-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-richblack-800/80 hover:border-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-sm md:text-base group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-4 md:bottom-6 right-6 md:right-10 z-20 flex gap-2 md:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
            className="relative group"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`w-8 md:w-12 h-1 rounded-full transition-all duration-500 ${
                idx === current
                  ? "bg-white shadow-lg shadow-white/30"
                  : "bg-white/25 group-hover:bg-white/50"
              }`}
            />
            {idx === current && !isPaused && (
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-yellow-300 to-amber-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 md:top-6 right-6 md:right-10 z-20">
        <span className="text-white/40 text-xs md:text-sm font-mono tracking-widest">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
};

export default CinematicGallery;
