// import React, { useEffect, useState } from "react"
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti"

// function RatingStars({ Review_Count, Star_Size }) {
//   const [starCount, SetStarCount] = useState({
//     full: 0,
//     half: 0,
//     empty: 0,
//   })

//   useEffect(() => {
//     const wholeStars = Math.floor(Review_Count) || 0
//     SetStarCount({
//       full: wholeStars,
//       half: Number.isInteger(Review_Count) ? 0 : 1,
//       empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
//     })
//   }, [Review_Count])
//   return (
//     <div className="flex gap-1 text-yellow-100">
//       {[...new Array(starCount.full)].map((_, i) => {
//         return <TiStarFullOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.half)].map((_, i) => {
//         return <TiStarHalfOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.empty)].map((_, i) => {
//         return <TiStarOutline key={i} size={Star_Size || 20} />
//       })}
//     </div>
//   )
// }

// export default RatingStars

import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size, showRating = false, className = "" }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    SetStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    })
  }, [Review_Count])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Stars Container */}
      <div className="flex gap-1 relative">
        {/* Background Stars (for consistent sizing) */}
        <div className="flex gap-1 text-richblack-400 opacity-40">
          {[...new Array(5)].map((_, i) => (
            <TiStarOutline key={`bg-${i}`} size={Star_Size || 20} />
          ))}
        </div>
        
        {/* Foreground Stars */}
        <div className="flex gap-1 absolute inset-0">
          {/* Full Stars */}
          {[...new Array(starCount.full)].map((_, i) => (
            <div key={`full-${i}`} className="relative group">
              <TiStarFullOutline 
                size={Star_Size || 20} 
                className="text-yellow-100 drop-shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-lg" 
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Full Star
              </div>
            </div>
          ))}
          
          {/* Half Stars */}
          {[...new Array(starCount.half)].map((_, i) => (
            <div key={`half-${i}`} className="relative group">
              <TiStarHalfOutline 
                size={Star_Size || 20} 
                className="text-yellow-100 drop-shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-lg" 
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Half Star
              </div>
            </div>
          ))}
          
          {/* Empty Stars */}
          {[...new Array(starCount.empty)].map((_, i) => (
            <div key={`empty-${i}`} className="relative group">
              <TiStarOutline 
                size={Star_Size || 20} 
                className="text-richblack-400 opacity-60 transition-all duration-200 group-hover:scale-105" 
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Empty Star
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Rating Text */}
      {showRating && (
        <div className="flex items-center gap-2">
          <span className="text-richblack-5 font-semibold text-sm">
            {Review_Count?.toFixed(1) || "0.0"}
          </span>
          <span className="text-richblack-400 text-sm">
            ({Math.floor(Review_Count || 0)} review{Math.floor(Review_Count || 0) !== 1 ? 's' : ''})
          </span>
        </div>
      )}
    </div>
  )
}

export default RatingStars