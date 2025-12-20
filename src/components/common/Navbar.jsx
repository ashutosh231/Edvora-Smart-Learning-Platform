import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { GrCart } from "react-icons/gr";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import logo from "../../assets/Logo/Edvora.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
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
    <div className={`flex h-20 items-center justify-center transition-all duration-300 ${
      isScrolled 
        ? "border-b border-richblack-700 bg-richblack-900/95 backdrop-blur-xl shadow-2xl" 
        : "border-b border-richblack-700/50 bg-richblack-900/90 backdrop-blur-lg"
    } sticky top-0 z-50`}>
      
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-3 navbar-logo">
          <div className="relative logo-container">
            <img
              src={logo}
              width={200}
              height={50}
              loading="lazy"
              alt="Edvora"
              className="logo-image transition-all duration-300 filter brightness-0 invert opacity-90 group-hover:opacity-100"
            />
            <div className="logo-glow"></div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group cursor-pointer catalog-trigger">
                    <p className="font-medium text-richblack-100 group-hover:text-yellow-50 transition-all duration-300 catalog-text">
                      {link.title}
                    </p>
                    <IoIosArrowDropdownCircle className="text-richblack-100 group-hover:text-yellow-50 transition-all duration-300 catalog-arrow" />

                    {/* Invisible bridge to prevent dropdown from closing */}
                    <div className="invisible absolute left-0 top-full h-4 w-full"></div>

                    {/* Advanced Beautiful Dropdown */}
                    <div className="absolute left-0 top-full mt-2 flex flex-col rounded-3xl catalog-dropdown p-6 text-richblack-900 shadow-2xl 
                                    w-96 border border-yellow-400/20">
                      
                      {/* Animated triangle pointer with glow - aligned with Catalog text */}
                      <div className="absolute left-6 -top-2 h-4 w-4 rotate-45 rounded-sm catalog-pointer border-t border-l border-yellow-400/30"></div>

                      {/* Background glow effect */}
                      <div className="absolute inset-0 catalog-dropdown-glow rounded-3xl"></div>

                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 catalog-shimmer rounded-3xl"></div>

                      <div className="relative z-10">
                        {/* Header with gradient */}
                        <div className="mb-4 px-2 pb-3 border-b border-richblack-200/50 catalog-header">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-richblack-800 via-yellow-600 to-richblack-800 bg-clip-text text-transparent catalog-title">
                            Explore Categories
                          </h3>
                        </div>
                        
                        {loading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="catalog-loader"></div>
                          </div>
                        ) : subLinks.length ? (
                          <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                            {subLinks.map((sublink, idx) => (
                              <Link
                                to={`/catalog/${sublink.name.replace(/\s+/g, '-').toLowerCase()}`}
                                key={sublink._id || idx}
                                className="catalog-item group/category"
                                onClick={() => document.activeElement.blur()}
                                style={{ animationDelay: `${idx * 0.03}s` }}
                              >
                                {/* Background gradient */}
                                <div className="catalog-item-bg"></div>
                                
                                {/* Icon indicator */}
                                <div className="catalog-item-icon"></div>
                                
                                <span className="catalog-item-text">{sublink.name}</span>
                                
                                {/* Arrow indicator */}
                                <div className="catalog-item-arrow">
                                  <IoIosArrowDropdownCircle />
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-richblack-400 text-sm catalog-empty">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 catalog-empty-icon">
                              <span className="text-3xl">📚</span>
                            </div>
                            <p>No categories available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className="group/navlink relative nav-link">
                    <p
                      className={`font-medium text-lg nav-link-text ${
                        matchRoute(link?.path)
                          ? "text-yellow-50 font-semibold"
                          : "text-richblack-100"
                      }`}
                    >
                      {link?.title}
                      {/* Animated underline */}
                      <span className={`nav-link-underline ${matchRoute(link?.path) ? "active" : ""}`}></span>
                      {/* Glow effect */}
                      <span className="nav-link-glow"></span>
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth / Dashboard / Cart Section */}
        <div className="flex items-center gap-x-4">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative group/cart navbar-cart">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-richblack-700 to-richblack-800 group-hover/cart:from-richblack-600 group-hover/cart:to-richblack-700 transition-all duration-300 shadow-lg border border-richblack-600 group-hover/cart:border-richblack-500 cart-button">
                <GrCart className="text-xl text-richblack-25 group-hover/cart:text-yellow-50 transition-colors duration-300" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-bold shadow-lg border-2 border-richblack-900 cart-badge">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
              <div className="absolute inset-0 cart-glow rounded-2xl"></div>
            </Link>
          )}

          {token === null && (
            <div className="flex gap-x-4">
              <Link to="/login">
                <button className="px-8 py-3 rounded-2xl bg-gradient-to-br from-richblack-700 to-richblack-800 text-richblack-25 border border-richblack-600 hover:from-richblack-600 hover:to-richblack-700 hover:border-richblack-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl navbar-btn navbar-btn-secondary">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-100 text-richblack-900 font-semibold hover:from-yellow-100 hover:to-amber-200 hover:text-richblack-900 transition-all duration-300 shadow-lg hover:shadow-xl navbar-btn navbar-btn-primary">
                  <span className="relative z-10">Sign up</span>
                </button>
              </Link>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>

      {/* Mobile Menu Button (Optional) */}
      <div className="lg:hidden flex items-center">
        <button className="p-2 rounded-lg bg-richblack-700 text-richblack-25">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #E2C044, #FDE68A);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #D4AF37, #F59E0B);
        }
      `}</style>
    </div>
  );
};

export default Navbar;