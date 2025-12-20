import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { IoClose } from "react-icons/io5"
import { FiAward, FiDownload, FiCheck } from "react-icons/fi"
import IconBtn from "../../common/IconBtn"
import { claimCourseCertificate, getProgressPercentage } from "../../../services/operations/courseDetailsAPI"
import { generateCertificatePDF, generateCertificateId } from "../../../utils/certificateGenerator"

export default function CertificateModal({ isOpen, setIsOpen }) {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user: authUser } = useSelector((state) => state.auth)
  const { user: profileUser } = useSelector((state) => state.profile)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [loading, setLoading] = useState(false)
  const [certificateData, setCertificateData] = useState(null)
  const [progressData, setProgressData] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isOpen) {
      // Store user data from profile first, then fall back to auth user
      const userSource = profileUser || authUser
      if (userSource) {
        const userInfo = {
          firstName: userSource?.firstName || "",
          lastName: userSource?.lastName || "",
          id: userSource?.id || ""
        }
        setUserData(userInfo)
        console.log("Stored user data from profile:", userInfo)
      }
      fetchCertificateData()
    }
  }, [isOpen, courseId, token, profileUser, authUser])

  const fetchCertificateData = async () => {
    try {
      const data = await getProgressPercentage(courseId, token)
      console.log("Progress data fetched:", data)
      if (data) {
        setProgressData(data)
        if (data?.certificateClaimed) {
          // Get student name from profile user first, then auth user
          const userSource = profileUser || authUser
          const studentName = userData 
            ? `${userData.firstName} ${userData.lastName}`.trim()
            : userSource 
            ? `${userSource.firstName || ""} ${userSource.lastName || ""}`.trim()
            : "Student"
          
          const certData = {
            claimedAt: data?.certificateClaimedAt,
            percentage: data?.data,
            userName: studentName,
            userId: userData?.id || userSource?.id || ""
          }
          console.log("Setting certificate data:", certData)
          setCertificateData(certData)
        } else {
          console.log("Certificate not claimed yet")
          setCertificateData(null)
        }
      }
    } catch (error) {
      console.error("Error fetching certificate data:", error)
    }
  }

  const handleClaimCertificate = async () => {
    if (progressData?.data !== 100) {
      alert("Complete all videos (100%) to claim certificate")
      return
    }

    setLoading(true)
    try {
      const result = await claimCourseCertificate(courseId, token)
      console.log("Claim certificate result:", result)
      if (result?.success) {
        // Get student name from profile user first, then auth user
        const userSource = profileUser || authUser
        const studentName = userData 
          ? `${userData.firstName} ${userData.lastName}`.trim()
          : userSource 
          ? `${userSource.firstName || ""} ${userSource.lastName || ""}`.trim()
          : "Student"
        
        const certData = {
          claimedAt: result?.certificateClaimedAt,
          percentage: 100,
          userName: studentName,
          userId: userData?.id || userSource?.id || ""
        }
        console.log("Setting claimed certificate data:", certData)
        setCertificateData(certData)
        // Refresh data
        await fetchCertificateData()
      }
    } catch (error) {
      console.error("Error claiming certificate:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCertificate = () => {
    try {
      console.log("Download clicked. certificateData:", certificateData, "userData:", userData)
      
      if (!certificateData) {
        console.error("Certificate data is missing")
        alert("Certificate data not available. Please refresh and try again.")
        return
      }

      if (!certificateData?.userName) {
        console.error("Student name is missing")
        alert("Student name not available. Please refresh and try again.")
        return
      }

      // Use stored certificate data and user data
      const studentName = certificateData?.userName
      const courseName = courseEntireData?.courseName || "Course"
      const userId = certificateData?.userId || userData?.id || authUser?.id || "unknown"
      const certificateId = generateCertificateId(userId, courseId, certificateData?.claimedAt)
      
      const claimedDate = new Date(certificateData?.claimedAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )

      console.log("Downloading certificate:", {
        studentName,
        courseName,
        claimedDate,
        certificateId,
      })

      generateCertificatePDF(studentName, courseName, claimedDate, certificateId)
    } catch (error) {
      console.error("Error downloading certificate:", error)
      alert("Failed to download certificate. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-richblack-800 rounded-3xl p-8 max-w-2xl w-full mx-4 border border-richblack-600 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-richblack-300 hover:text-richblack-25 transition-colors duration-200 bg-richblack-700 hover:bg-richblack-600 rounded-full p-2"
        >
          <IoClose size={28} />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <FiAward className="text-5xl text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-richblack-5">
              Professional Certificate
            </h2>
            <p className="text-richblack-200 text-sm">
              Achievement unlocked - Verify and download your certificate
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-richblack-700 rounded-2xl p-6 space-y-4 border border-richblack-600">
            <div className="flex justify-between items-center">
              <span className="text-richblack-100 text-sm font-semibold">Course Completion</span>
              <span className="text-2xl font-bold text-yellow-50">
                {progressData?.data || 0}%
              </span>
            </div>
            <div className="w-full bg-richblack-600 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progressData?.data || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-richblack-200 font-medium">
              <span>📹 {progressData?.completedVideos || 0} videos watched</span>
              <span>📊 {progressData?.totalVideos || 0} total videos</span>
            </div>
          </div>

          {/* Certificate Status */}
          {certificateData ? (
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-700/50 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3 text-green-400">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheck className="text-xl text-white" />
                  </div>
                  <span className="font-semibold text-lg">Certificate Claimed</span>
                </div>
                <p className="text-green-300 text-sm ml-11">
                  Claimed on{" "}
                  {new Date(certificateData.claimedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadCertificate}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-yellow-50 text-richblack-900 font-semibold rounded-xl hover:bg-yellow-100 hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <FiDownload className="text-xl" />
                Download Certificate (PDF)
              </button>

              <p className="text-xs text-richblack-300 text-center">
                ✓ Professional certificate ready for sharing and verification
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {progressData?.data === 100 ? (
                <>
                  <div className="bg-richblack-700 border border-richblack-600 rounded-2xl p-5 space-y-3">
                    <p className="text-richblack-50 text-sm leading-relaxed">
                      🎉 Congratulations! You've completed all lectures. Claim your professional certificate to showcase your achievement.
                    </p>
                  </div>
                  <IconBtn
                    disabled={loading}
                    onclick={handleClaimCertificate}
                    text={
                      loading
                        ? "Claiming Certificate..."
                        : "Claim Certificate Now"
                    }
                    customClasses="w-full px-6 py-4 bg-yellow-50 text-richblack-900 hover:bg-yellow-100 rounded-xl font-semibold transition-all duration-200"
                  />
                </>
              ) : (
                <div className="bg-richblack-700 border border-richblack-600 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-richblack-50 font-semibold">Keep Learning!</span>
                    <span className="text-lg font-bold text-yellow-50">
                      {100 - (progressData?.data || 0)}% remaining
                    </span>
                  </div>
                  <div className="w-full bg-richblack-600 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressData?.data || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-richblack-200 text-sm">
                    📚 Complete {100 - (progressData?.data || 0)}% more videos to unlock your certificate.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-richblack-700 rounded-2xl p-5 border border-richblack-600 space-y-2">
            <p className="text-richblack-200 text-xs leading-relaxed">
              <span className="text-yellow-50">✓</span> Industry-recognized certificate of completion
              <br />
              <span className="text-yellow-50">✓</span> Unique verification ID for credential validation
              <br />
              <span className="text-yellow-50">✓</span> Perfect for LinkedIn, resumes & portfolios
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-3 text-richblack-200 hover:text-richblack-5 font-medium transition-colors duration-200 rounded-lg hover:bg-richblack-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
