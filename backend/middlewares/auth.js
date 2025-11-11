import User from "../models/User.js";
import dotenv from "dotenv";
// Importing required modules
import jwt from "jsonwebtoken";

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests

export const auth = async (req, res, next) => {
  try {
    // Extract token from Authorization header only (preferred)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token is missing or malformed",
      });
    }
2
    const token = authHeader.split(" ")[1]; // Extract actual token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error("JWT Validation Error:", error);
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong While Validating the Token",
    });
  }
};

export const isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} 
	catch(error){
		return res.status(500).json({
			success: false,
			message: `Requested User Role is not Student`

		})
	}
};
export const isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified as Admin` });
	}
};
//Todo
export const isTester = async({req,res,next}) =>{
	try{

	}
	catch(err){
		res.status(500).json({
			success: false,
			message: "User Role is not verified as Tester"
		})
		
	}

}
export const isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified as Instructor` });
	}
};

