import { BookOpen, ChevronDown, HelpCircle, Lightbulb, MessageCircle, Play, Send, Sparkles, Users, Brain, Zap, Cpu, Database } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VirtualTeacher() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [captions, setCaptions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newComment, setNewComment] = useState("");
  const [expandedSection, setExpandedSection] = useState("video");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setVideoUrl("");
    setProgress("Generating script...");
    setCaptions("");
    setQuestions([]);
    setComments([]);

    try {
      // STEP 1: Generate Script
      const scriptRes = await axios.post(
        "http://localhost:4000/api/v1/tutor/script",
        { topic }
      );

      const script = scriptRes.data.script;
      setCaptions(script); // Display script as captions
      setProgress("Creating video job...");

      // STEP 2: Create video job (D-ID)
      const videoRes = await axios.post(
        "http://localhost:4000/api/v1/tutor/video",
        { script }
      );

      const jobId = videoRes.data.jobId;
      setProgress("Video job created. Generating video...");

      // STEP 3: Poll with timeout (5 minutes max)
      let pollCount = 0;
      const maxPolls = 100;
      const pollInterval = setInterval(async () => {
        pollCount++;
        try {
          const statusRes = await axios.get(
            `http://localhost:4000/api/v1/tutor/video-status/${jobId}`
          );

          const { status, videoUrl } = statusRes.data;

          console.log(
            `Poll #${pollCount}: status=${status}, videoUrl=${
              videoUrl ? "YES" : "NO"
            }`
          );

          if (videoUrl) {
            clearInterval(pollInterval);
            setVideoUrl(videoUrl);
            setProgress("Video ready! 🎉");
            setLoading(false);
            // Add sample questions
            setQuestions([
              { id: 1, text: "Can you explain this concept differently?", likes: 0 },
              { id: 2, text: "What are real-world applications?", likes: 0 },
            ]);
          } else if (pollCount >= maxPolls) {
            clearInterval(pollInterval);
            setLoading(false);
            setProgress("Video generation timeout. Please try again.");
          } else {
            setProgress(
              `Processing video${
                status ? `: ${status}` : "..."
              } (${pollCount}/${maxPolls})`
            );
          }
        } catch (pollErr) {
          clearInterval(pollInterval);
          setLoading(false);
          setProgress("Error checking video status.");
          console.error(pollErr);
        }
      }, 3000);
    } catch (err) {
      console.error("Video generation error:", err?.response?.data || err.message);
      const backendMsg = err?.response?.data?.error || err?.message || "Something went wrong";
      alert(backendMsg);
      setProgress(backendMsg);
      setLoading(false);
    }
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: Date.now(), text: newQuestion, likes: 0 },
      ]);
      setNewQuestion("");
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: newComment, author: "You", timestamp: "just now" },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating AI Neural Network Pattern */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced Header with Glass Morphism */}
      <motion.div 
        className="relative backdrop-blur-xl bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-indigo-900/30 border-b border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 relative">
          {/* Animated glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="flex items-center gap-4 mb-3 relative z-10">
            <motion.div 
              className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <Brain size={32} className="text-white relative z-10" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Virtual AI Teacher
              </motion.h1>
              <motion.p 
                className="text-blue-200/80 mt-1 font-light flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Cpu size={16} className="text-cyan-400" />
                Learn any topic with personalized AI-generated videos
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Redesigned Input Section - Clean & Functional */}
        <motion.div 
          className="bg-slate-800 rounded-3xl shadow-2xl p-8 mb-8 border border-purple-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Lightbulb size={24} className="text-yellow-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              What would you like to learn today?
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-5 py-4 text-lg rounded-xl border-2 border-purple-500/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all duration-200"
                style={{
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  caretColor: '#ffffff',
                }}
                placeholder="e.g., Newton's First Law, Photosynthesis, World War II..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>

            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[180px]"
              onClick={handleGenerate}
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <motion.div 
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Generate Video</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Progress Section */}
          {progress && (
            <div className="mt-6 p-4 bg-slate-700/80 rounded-xl border border-purple-500/30">
              <p className="text-sm text-blue-300 font-medium mb-2 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                {progress}
              </p>
              <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min((parseInt(progress.match(/\d+/)?.[0]) || 0) / 100 * 100, 100)}%`
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced Main Content */}
        {videoUrl || loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video & Captions Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enhanced Video Player */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                <div className="bg-black aspect-video flex items-center justify-center relative rounded-t-3xl">
                  {loading ? (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6" />
                      <p className="text-white font-semibold text-lg">Generating your video...</p>
                      <p className="text-gray-400 mt-2">This may take a few moments</p>
                    </div>
                  ) : videoUrl ? (
                    <video src={videoUrl} controls className="w-full h-full rounded-t-3xl" />
                  ) : null}
                </div>
                
                {/* Video Controls Footer */}
                <div className="p-4 bg-gray-900/80 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>AI Generated Lesson</span>
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Captions Section */}
              {captions && (
                <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                  <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <BookOpen size={20} className="text-blue-400" />
                    </div>
                    Transcript & Notes
                  </h3>
                  <div className="bg-gray-700/80 rounded-2xl p-6 max-h-64 overflow-y-auto text-gray-200 leading-relaxed border-l-4 border-blue-500 backdrop-blur-sm">
                    <p className="whitespace-pre-wrap">{captions}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Enhanced Questions Section */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <HelpCircle size={20} className="text-amber-400" />
                  </div>
                  Community Questions
                </h3>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-700/80 rounded-xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                      <p className="text-sm text-white">{q.text}</p>
                      <button className="text-xs text-amber-400 mt-3 hover:text-amber-300 transition-colors flex items-center gap-1">
                        <span>👍</span>
                        <span>{q.likes > 0 ? `${q.likes} Likes` : "Like"}</span>
                      </button>
                    </div>
                  ))}
                  {questions.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle size={32} className="mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400 text-sm">No questions yet</p>
                      <p className="text-gray-500 text-xs mt-1">Be the first to ask something!</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    className="flex-1 bg-gray-700/80 border border-gray-600 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                    placeholder="Ask a question..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addQuestion()}
                  />
                  <button
                    onClick={addQuestion}
                    className="bg-amber-500 text-white p-3 rounded-xl hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Enhanced Comments Section */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Users size={20} className="text-green-400" />
                  </div>
                  Discussion
                </h3>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="p-4 bg-gray-700/80 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-green-400">{c.author}</p>
                        <p className="text-xs text-gray-400">{c.timestamp}</p>
                      </div>
                      <p className="text-sm text-white">{c.text}</p>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <div className="text-center py-8">
                      <Users size={32} className="mx-auto text-gray-500 mb-3" />
                      <p className="text-gray-400 text-sm">No comments yet</p>
                      <p className="text-gray-500 text-xs mt-1">Start the conversation!</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    className="flex-1 bg-gray-700/80 border border-gray-600 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addComment()}
                  />
                  <button
                    onClick={addComment}
                    className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Enhanced Empty State
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-center border border-white/10">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Sparkles size={48} className="text-purple-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to learn something amazing?</h3>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Enter any topic above to generate a personalized video lesson with AI-powered explanations, 
              interactive captions, and community discussions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <Sparkles size={24} className="text-purple-400 mx-auto mb-2" />
                <p className="text-white text-sm">AI-generated video lessons</p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <BookOpen size={24} className="text-blue-400 mx-auto mb-2" />
                <p className="text-white text-sm">Interactive transcripts</p>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-xl border border-white/5">
                <Users size={24} className="text-green-400 mx-auto mb-2" />
                <p className="text-white text-sm">Community Q&A</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by AI • Built for learners • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}