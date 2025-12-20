import React, { useEffect, useState, useMemo } from 'react'

import CourseCard from '../components/core/Catalog/CourseCard';
import Error from "./Error"
import Footer from '../components/common/Footer'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { IoSparkles, IoRocketSharp } from "react-icons/io5"
import { BsLightningChargeFill } from "react-icons/bs"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        if (!catalogName) {
            setCategoryId("");
            console.warn("No catalogName param in URL.");
            return;
        }
        // Normalize catalogName: lowercase, replace spaces and %20 with hyphens
        const normalizedCatalogName = decodeURIComponent(catalogName).replace(/\s+/g, "-").toLowerCase();
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const matchedCategory = res?.data?.data?.find((ct) => ct.name.split(" ").join("-").toLowerCase() === normalizedCatalogName);
            if (matchedCategory) {
                setCategoryId(matchedCategory._id);
            } else {
                setCategoryId("");
                console.warn("No matching category found for:", normalizedCatalogName);
            }
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    // Animated background particles/
    
    const particlePositions = useMemo(() => {
      return [...Array(25)].map(() => ({
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      }))
    }, [])

    if (loading || !catalogPageData) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 flex items-center justify-center">
            <div
              className="relative p-8 rounded-3xl backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
              </div>
            </div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
      if (!catalogName) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="text-red-500 text-lg font-bold">No catalog selected. Please use a valid catalog URL.</div>
            </div>
        );
    }
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 text-white overflow-hidden relative">
          {/* Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
          </div>

          {/* Hero Section with Glassmorphism */}
          <div className="relative w-full z-10 pt-8 pb-12">
            <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12">
              <div 
                className="mx-auto max-w-7xl flex min-h-[300px] flex-col justify-center gap-6 p-8 md:p-10 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <p className="text-sm text-slate-300 relative z-10">
                  {`Home / Catalog / `}
                  <span className="text-yellow-400 font-semibold">
                    {catalogPageData?.data?.selectedCategory?.name}
                  </span>
                </p>
                
                <p className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent relative z-10">
                  {catalogPageData?.data?.selectedCategory?.name}
                </p>
                
                <p className="max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed relative z-10">
                  {catalogPageData?.data?.selectedCategory?.description}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-4 mt-4 relative z-10">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl hover:scale-105 transition-transform"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <BsLightningChargeFill className="text-yellow-400 text-lg" />
                    <span className="text-white font-bold">
                      {catalogPageData?.data?.selectedCategory?.courses?.length || 0}+ Courses
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-xl hover:scale-105 transition-transform"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <IoSparkles className="text-purple-400 text-lg" />
                    <span className="text-white font-bold">Expert Instructors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Section 1 with Glassmorphism */}
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 relative z-10 py-8">
            <div className="max-w-7xl mx-auto">
              <div 
                className="p-6 md:p-8 rounded-3xl backdrop-blur-xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <h2 className="text-2xl md:text-3xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Courses to get you started
                </h2>
                
                <div className="flex border-b border-white/10 text-sm mb-6">
                  <p
                    className={`px-6 py-3 rounded-t-xl cursor-pointer font-semibold transition-all ${
                      active === 1
                        ? "text-yellow-400 bg-white/5"
                        : "text-slate-300 hover:text-yellow-400"
                    }`}
                    onClick={() => setActive(1)}
                    style={{
                      borderBottom: active === 1 ? '2px solid rgba(234, 179, 8, 0.6)' : 'none',
                    }}
                  >
                    Most Popular
                  </p>
                  <p
                    className={`px-6 py-3 rounded-t-xl cursor-pointer font-semibold transition-all ${
                      active === 2
                        ? "text-yellow-400 bg-white/5"
                        : "text-slate-300 hover:text-yellow-400"
                    }`}
                    onClick={() => setActive(2)}
                    style={{
                      borderBottom: active === 2 ? '2px solid rgba(234, 179, 8, 0.6)' : 'none',
                    }}
                  >
                    New
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catalogPageData?.data?.selectedCategory?.courses?.map((course, i) => (
                    <CourseCard course={course} key={course._id || i} Height={"h-[300px]"} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Section 2 with Glassmorphism */}
          
    
          {/* Section 3 with Glassmorphism */}
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 relative z-10 py-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <div 
                className="p-6 md:p-8 rounded-3xl backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <h2 className="text-2xl md:text-3xl font-black mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Frequently Bought
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catalogPageData?.data?.mostSellingCourses?.map((course, i) => (
                    <CourseCard course={course} key={course._id || i} Height={"h-[300px]"} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
    
          <Footer />
        </div>
      )
    }
    
    export default Catalog