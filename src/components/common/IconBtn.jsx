// export default function IconBtn({
//     text,
//     onclick,
//     children,
//     disabled,
//     outline = false,
//     customClasses,
//     type,
//   }) {
//     return (
//       <button
//         disabled={disabled}
//         onClick={onclick}
//         className={`flex items-center ${
//           outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
//         } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
//         type={type}
//       >
//         {children ? (
//           <>
//             <span className={`${outline && "text-yellow-50"}`}>{text}</span>
//             {children}
//           </>
//         ) : (
//           text
//         )}
//       </button>
//     )
//   }

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-x-3
        rounded-xl
        py-3
        px-6
        font-semibold
        transition-all
        duration-300
        ease-out
        transform
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-yellow-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:transform-none
        disabled:hover:scale-100
        group
        ${outline 
          ? "border-2 border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 hover:shadow-lg hover:shadow-yellow-50/25" 
          : "bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 hover:from-yellow-100 hover:to-yellow-200 hover:shadow-lg hover:shadow-yellow-50/40"
        }
        ${customClasses}
      `}
      type={type}
    >
      {/* Optional: Ripple effect background */}
      <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      
      {/* Button content with icon animation */}
      <div className="flex items-center gap-x-3 relative z-10">
        {children && (
          <span className={`
            transition-transform duration-300 ease-out
            ${outline 
              ? "text-yellow-50 group-hover:text-richblack-900" 
              : "text-richblack-900"
            }
            ${text ? 'group-hover:scale-110' : ''}
          `}>
            {children}
          </span>
        )}
        
        {text && (
          <span className={`
            whitespace-nowrap
            ${outline 
              ? "text-yellow-50 group-hover:text-richblack-900" 
              : "text-richblack-900"
            }
          `}>
            {text}
          </span>
        )}
      </div>

      {/* Optional: Loading spinner for disabled state */}
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-richblack-900 bg-opacity-50">
          <div className="w-5 h-5 border-2 border-yellow-50 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </button>
  )
}