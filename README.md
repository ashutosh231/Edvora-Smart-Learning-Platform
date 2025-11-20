🎓 Edvora – AI-Powered EdTech Learning Platform
🚀 Live Website: https://edvora-beryl.vercel.app
🧪 Instructor Demo Login:
Email: aryan.singh766768@gmail.com
Password: 123456
👨‍🎓 Student Demo Login:
Email: shambhudhanpal@gmail.com
Password: 123456

Edvora is a next-generation AI-powered EdTech platform built using the MERN stack.
It empowers students to learn through structured courses, personalized content, and an innovative Virtual AI Teacher, while allowing instructors to manage, publish, and monetize educational content seamlessly.
📑 Table of Contents
Introduction
Key Features
AI Virtual Teacher
System Architecture
Front-end
Back-end
Database
Architecture Diagram
API Design
Installation
Configuration
Usage
Future Enhancements
✨ Introduction
Edvora is designed to make learning simple, smart, and interactive.
The platform addresses two core challenges:
For Students:
Scattered and unstructured learning materials
Limited personalization
Lack of immediate concept explanation
For Instructors:
No easy way to publish, manage, and monetize courses
Lack of analytics and learner insights
Edvora solves these challenges through clean UI, structured content delivery, smart analytics, and AI-based learning assistance.
🌟 Key Features
👨‍🎓 Student Features
Browse categorized courses
Add to wishlist & cart
Secure Razorpay checkout
Watch HD video lectures
Read Markdown-formatted notes
Access purchased content anytime
Profile management
Personalized learning with AI
👨‍🏫 Instructor Features
Create, update, publish, and delete courses
Upload videos, PDFs, and documents
Set pricing & metadata
Dashboard with course overview
Insights on views, clicks, engagement
Edit instructor profile
🛡 Platform-Level Features
JWT-based authentication
Password hashing using Bcrypt
Responsive UI with Tailwind CSS
Efficient state handling via Redux Toolkit
Cloud media storage using Cloudinary
AI teacher engine for instant learning
Modular REST APIs using Express
🤖 AI Virtual Teacher (Flagship Feature)
Edvora includes a cutting-edge AI Virtual Teacher that allows students to learn any topic instantly.
✨ How It Works:
The user enters a topic (e.g., "What is Deadlock in OS?")
The backend generates a structured teaching script using an AI text model
The script is sent to the D-ID avatar engine
A realistic teaching video is generated
Transcript is displayed alongside the video
🎯 Benefits:
Instant explanation for any topic
Accessible anytime, without waiting for instructors
Helps students revise before tests
Transcript supports accessibility and note-taking
This feature transforms Edvora into a 24/7 personal tutor powered by AI.
🏗 System Architecture
Edvora follows a scalable and modular client-server architecture with 3 core components.
🎨 Front-end
Built with ReactJS and Tailwind CSS, the frontend is fast, responsive, and user-friendly.
Student Views:
Homepage
Course List
Wishlist & Cart
Checkout
Course Viewer
Profile & Settings
Instructor Views:
Dashboard
Course Management
Insights & Analytics
Profile Editor
Tech Stack:
ReactJS
Tailwind CSS
Redux Toolkit
Axios
React Router
Markdown Renderer
🔧 Back-end
Built using NodeJS + ExpressJS with clearly defined REST APIs.
Backend Responsibilities:
Authentication & authorization
Course creation & management
Order and payment handling
AI model interaction
Media storage via Cloudinary
Validation & sanitization
Error-handled API responses
Technologies:
Node.js
Express.js
JWT
Bcrypt
Mongoose
Cloudinary SDK
Razorpay
AI APIs (Groq, D-ID)
🗄 Database (MongoDB)
MongoDB stores:
Users (students + instructors)
Courses & content
Videos & notes
Orders & transactions
AI Teacher requests
Wishlist & cart collections

🖥 Architecture Diagram

🔌 API Design
Edvora uses RESTful API architecture:
Core API Routes:
Feature	Route
Auth	/auth/login, /auth/register, /auth/forgot-password
Courses	/courses/all, /courses/create, /courses/:id
Instructor	/instructor/courses, /instructor/insights
Payments	/payment/checkout, /payment/verify
AI Teacher	/teacher-ai/generate
User	/user/profile, /user/update
All endpoints return JSON responses with consistent structure.
⚙ Installation
git clone https://github.com/username/Edvora.git
cd Edvora
npm install
🔧 Configuration
Create a .env file in the root directory.
Use this sample (safe) template:
# Server
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URL=your-mongodb-connection-url

# JWT Secret
JWT_SECRET=your-jwt-secret

# Cloudinary
CLOUD_NAME=your-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-secret

# Nodemailer
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email
MAIL_PASS=your-app-password

# Razorpay
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_SECRET=your-secret

# AI Keys
GROQ_API_KEY=your-groq-api-key
DID_API_KEY=your-did-api-key
DID_AVATAR_URL=avatar-image-url
Never commit real credentials.
▶ Usage
Start Backend:
npm start
Start Frontend:
cd client
npm start
Visit:
👉 http://localhost:3000
🚀 Future Enhancements
AI-powered course recommendations
Real-time AI chatbot tutor
Mobile app using React Native
Instructor payout dashboard
Leaderboard & gamification
WebRTC-powered live classes
Student performance analytics
