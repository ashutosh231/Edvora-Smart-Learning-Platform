// const Course = require("../models/Course")
import Course from "../models/Course.js";
// const CourseProgress = require("../models/CourseProgress")
import CourseProgress from "../models/CourseProgress.js";
// const Section = require("../models/Section")
import Section from "../models/Section.js";
// const Subsection = require("../models/SubSection")
import Subsection from "../models/SubSection.js";
// const mongoose = require("mongoose")
import mongoose from "mongoose";

export const updateCourseProgress = async (req, res) => {
  const { courseId, SubsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the Subsection is valid
    const subsection = await Subsection.findById(SubsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid Subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      // If course progress exists, check if the Subsection is already completed
      if (courseProgress.completedVideos.includes(SubsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the Subsection into the completedVideos array
      courseProgress.completedVideos.push(SubsectionId)
    }

    // Calculate completion percentage
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "Subsection",
      },
    })

    let totalVideos = 0
    course.courseContent.forEach((section) => {
      totalVideos += section.Subsection.length
    })

    const completionPercentage =
      totalVideos > 0
        ? Math.round((courseProgress.completedVideos.length / totalVideos) * 100)
        : 0

    courseProgress.completionPercentage = completionPercentage
    courseProgress.updatedAt = new Date()

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({
      success: true,
      message: "Course progress updated",
      completionPercentage,
      isCourseCertified: completionPercentage === 100,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getProgressPercentage = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id

  if (!courseId) {
    return res.status(400).json({ error: "Course ID not provided." })
  }

  try {
    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    }).populate({
      path: "courseID",
      populate: {
        path: "courseContent",
      },
    })

    if (!courseProgress) {
      return res
        .status(400)
        .json({ error: "Can not find Course Progress with these IDs." })
    }

    let lectures = 0
    courseProgress.courseID.courseContent?.forEach((sec) => {
      lectures += sec.Subsection.length || 0
    })

    let progressPercentage =
      lectures > 0
        ? (courseProgress.completedVideos.length / lectures) * 100
        : 0

    // To make it up to 2 decimal point
    const multiplier = Math.pow(10, 2)
    progressPercentage =
      Math.round(progressPercentage * multiplier) / multiplier

    return res.status(200).json({
      success: true,
      data: progressPercentage,
      completedVideos: courseProgress.completedVideos.length,
      totalVideos: lectures,
      certificateClaimed: courseProgress.certificateClaimed,
      certificateClaimedAt: courseProgress.certificateClaimedAt,
      message: "Successfully fetched Course progress",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const claimCourseCertificate = async (req, res) => {
  const { courseId } = req.body
  const userId = req.user.id

  if (!courseId) {
    return res.status(400).json({ error: "Course ID not provided." })
  }

  try {
    // Find the course progress document
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      })
    }

    // Check if all videos are completed (100% completion)
    if (courseProgress.completionPercentage !== 100) {
      return res.status(400).json({
        success: false,
        message: "Complete all videos before claiming certificate",
      })
    }

    // Check if certificate is already claimed
    if (courseProgress.certificateClaimed) {
      return res.status(400).json({
        success: false,
        message: "Certificate already claimed",
        certificateClaimedAt: courseProgress.certificateClaimedAt,
      })
    }

    // Claim the certificate
    courseProgress.certificateClaimed = true
    courseProgress.certificateClaimedAt = new Date()
    courseProgress.updatedAt = new Date()

    await courseProgress.save()

    return res.status(200).json({
      success: true,
      message: "Certificate claimed successfully",
      certificateClaimedAt: courseProgress.certificateClaimedAt,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.Subsection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }