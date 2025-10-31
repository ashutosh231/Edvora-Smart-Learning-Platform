// import { Link, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// import { GrCart } from "react-icons/gr";
// import { IoIosArrowDropdownCircle } from "react-icons/io";
// import { NavbarLinks } from "../../data/navbar-links";
// import ProfileDropDown from "../core/Auth/ProfileDropDown";
// import { apiConnector } from "../../services/apiConnector";
// import { categories } from "../../services/apis";
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         console.log("✅ Categories API Response:", res.data);
//         setSubLinks(res?.data?.data || []);
//       } catch (error) {
//         console.error("❌ Could not fetch categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const location = useLocation();
//   const matchRoute = (route) => location.pathname === route;

//   return (
//     <div className="flex h-14 items-center justify-center border-b border-richblack-400 bg-richblack-900 z-50">
//       <div className="flex w-11/12 max-w-maxContent justify-between items-center">
//         {/* Logo */}
//         <Link to="/">
//           <img
//             // src={logo}
//             width={160}
//             height={32}
//             loading="lazy"
//             // alt="Study Notion Logo"
//             className="mt-1"
//           />
//         </Link>

//         {/* Navigation Links */}
//         <nav>
//           <ul className="flex gap-x-6 text-richblack-25 mt-2">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div className="relative flex items-center gap-2 group cursor-pointer">
//                     <p>{link.title}</p>
//                     <IoIosArrowDropdownCircle />

//                     {/* Dropdown */}
//                     <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 shadow-lg 
//                                     transition-all duration-300 ease-in-out opacity-0 scale-95 invisible 
//                                     group-hover:visible group-hover:opacity-100 group-hover:scale-100 lg:w-[300px]">
                      
//                       {/* Small triangle pointer */}
//                       <div className="absolute left-1/2 -translate-x-1/2 -translate-y-2 top-0 h-4 w-4 rotate-45 rounded-sm bg-richblack-5"></div>

//                       {loading ? (
//                         <div className="text-sm text-richblack-400 px-3 py-2">
//                           Loading...
//                         </div>
//                       ) : subLinks.length ? (
//                         subLinks.map((sublink, idx) => (
//                           <Link
//                             // ✅ Make sure these match your API keys
//                             to={`/catalog/${sublink.name}`} 
//                             key={sublink._id || idx}
//                             className="px-3 py-2 rounded-md hover:bg-yellow-100 hover:text-richblack-900 transition"
//                           >
//                             {sublink.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <div className="text-sm text-richblack-400 px-3 py-2">
//                           No categories
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-50"
//                           : "text-richblack-50"
//                       } hover:text-yellow-50 transition`}
//                     >
//                       {link?.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Auth / Dashboard / Cart */}
//         <div className="flex gap-x-6 items-center">
//           {user && user.accountType !== "Instructor" && (
//             <Link to="/dashboard/cart" className="relative flex items-center">
//               <GrCart className="text-2xl text-richblack-25 hover:text-yellow-50 transition" />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-semibold shadow">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {token === null && (
//             <Link to="/login">
//               <button className="px-4 py-2 rounded-lg bg-richblack-800 text-richblack-25 border border-richblack-600 hover:bg-richblack-700 transition">
//                 Log in
//               </button>
//             </Link>
//           )}

//           {token === null && (
//             <Link to="/signup">
//               <button className="px-4 py-2 rounded-lg bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition">
//                 Sign up
//               </button>
//             </Link>
//           )}

//           {token !== null && <ProfileDropDown />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { GrCart } from "react-icons/gr";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("✅ Categories API Response:", res.data);
        setSubLinks(res?.data?.data || []);
      } catch (error) {
        console.error("❌ Could not fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => location.pathname === route;

  return (
    <div className="flex h-16 items-center justify-center border-b border-richblack-700 bg-richblack-900 backdrop-blur-sm bg-opacity-95 sticky top-0 z-50 shadow-lg">
      <div className="flex w-11/12 max-w-maxContent justify-between items-center">
        {/* Logo - Enhanced with hover effect */}
        <Link to="/" className="group">
          <img
            // src={logo}
            width={160}
            height={32}
            loading="lazy"
            // alt="Study Notion Logo"
            className="mt-1 transition-transform duration-300 group-hover:scale-105 filter brightness-0 invert"
          />
        </Link>

        {/* Navigation Links - Enhanced spacing and animations */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group cursor-pointer">
                    <p className="font-medium text-richblack-100 group-hover:text-yellow-50 transition-colors duration-200">
                      {link.title}
                    </p>
                    <IoIosArrowDropdownCircle className="text-richblack-100 group-hover:text-yellow-50 transition-colors duration-200 transform group-hover:rotate-180" />

                    {/* Enhanced Dropdown */}
                    <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 flex flex-col rounded-xl bg-richblack-5 p-4 text-richblack-900 shadow-2xl 
                                    transition-all duration-300 ease-out opacity-0 scale-95 invisible 
                                    group-hover:visible group-hover:opacity-100 group-hover:scale-100 lg:w-[320px] border border-richblack-100">
                      
                      {/* Enhanced triangle pointer */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rotate-45 rounded-sm bg-richblack-5 border-t border-l border-richblack-100"></div>

                      <div className="relative z-10">
                        <h3 className="text-sm font-semibold text-richblack-600 mb-3 px-3 pb-2 border-b border-richblack-100">
                          Browse Categories
                        </h3>
                        
                        {loading ? (
                          <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-50"></div>
                          </div>
                        ) : subLinks.length ? (
                          <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto custom-scrollbar">
                            {subLinks.map((sublink, idx) => (
                              <Link
                                to={`/catalog/${sublink.name}`} 
                                key={sublink._id || idx}
                                className="px-4 py-3 rounded-lg hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200 font-medium text-richblack-700 hover:shadow-sm border border-transparent hover:border-yellow-100"
                              >
                                {sublink.name}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-richblack-400 text-sm">
                            No categories available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className="group/navlink">
                    <p
                      className={`font-medium ${
                        matchRoute(link?.path)
                          ? "text-yellow-50 font-semibold"
                          : "text-richblack-100"
                      } group-hover/navlink:text-yellow-50 transition-all duration-200 relative`}
                    >
                      {link?.title}
                      {matchRoute(link?.path) && (
                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-50 rounded-full"></span>
                      )}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth / Dashboard / Cart - Enhanced buttons and spacing */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative flex items-center group/cart">
              <div className="p-2 rounded-xl bg-blue-400 group-hover/cart:bg-richblack-700 transition-all duration-200 shadow-sm">
                <GrCart className="text-xl text-richblack-25 group-hover/cart:text-yellow-50 transition-colors duration-200" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold shadow-lg border-2 border-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-x-3">
              <Link to="/login">
                <button className="px-6 py-2.5 rounded-xl bg-richblack-800 text-richblack-25 border border-richblack-600 hover:bg-richblack-700 hover:border-richblack-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 font-semibold hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default Navbar;