import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Rocket,
  Brain,
  Trophy,
  Star,
  ArrowRight,
  Play,
  Users,
  Code,
  Palette,
  TrendingUp,
  Award,
  CheckCircle,
  X,
  ShoppingCart,
  Target,
  Clock,
  FileText,
  Layers,
} from "lucide-react";
import { supabase } from "./supabaseClient";

/* ---------------------- AUTH MODALS ---------------------- */

const SignInModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-[10px] rounded-[10px] bg-black flex items-center justify-center transition hover:bg-zinc-800"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
        </div>

        <button className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-400/40 transition">
          Sign In
        </button>

        <div className="mt-6 flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button className="w-full mt-4 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition font-semibold">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google"
          />
          Sign in with Google
        </button>

        <button className="w-full mt-3 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition font-semibold">
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
            className="w-6 h-6"
            alt="Facebook"
          />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

const SignUpModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-[10px] rounded-[10px] bg-black flex items-center justify-center transition hover:bg-zinc-800"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
        </div>

        <button className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-pink-400/40 transition">
          Create Account
        </button>

        <div className="mt-6 flex items-center gap-2">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button className="w-full mt-4 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition font-semibold">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google"
          />
          Sign up with Google
        </button>

        <button className="w-full mt-3 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition font-semibold">
          <img
            src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
            className="w-6 h-6"
            alt="Facebook"
          />
          Sign up with Facebook
        </button>
      </div>
    </div>
  );
};

/* ---------------- COURSE MODAL (with videos) ---------------- */

const CourseModal = ({ course, videos, onClose, onVideoPlayed }) => {
  const [activeVideo, setActiveVideo] = useState(videos?.[0] || null);

  if (!course) return null;

  const handleVideoClick = async (video) => {
    setActiveVideo(video);
    if (onVideoPlayed) {
      onVideoPlayed(video);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BANNER */}
        <div className={`relative h-60 bg-gradient-to-br ${course.color}`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
            {course.image || "📚"}
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex flex-wrap gap-2 mb-2">
              {course.level && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                  {course.level}
                </span>
              )}
              {course.category && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                  {course.category}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {course.name || course.title}
            </h2>
            {course.author_name && (
              <p className="text-white/90 text-sm">by {course.author_name}</p>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT: VIDEO PLAYER + DETAILS */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              {activeVideo ? (
                <div>
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg mb-3">
                    <video
                      key={activeVideo.id}
                      controls
                      className="w-full h-full"
                      src={activeVideo.video_url}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    {activeVideo.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {activeVideo.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activeVideo.author_name && `By ${activeVideo.author_name} · `}{" "}
                    {activeVideo.views ?? 0} views
                  </p>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                  No videos added yet for this course.
                </div>
              )}

              {/* What you'll learn (static for now) */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Master the fundamentals and advanced concepts",
                    "Build real-world projects for your portfolio",
                    "Learn industry best practices and standards",
                    "Get hands-on experience with modern tools",
                    "Understand core principles deeply",
                    "Prepare for professional certification",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: VIDEO LIST + PRICING CARD */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="border-2 border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-bold mb-3 shadow-md">
                    ⚡ Limited Time: 75% OFF
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ${course.price || 19.99}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(course.price ? course.price * 4 : 79.99).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    One-time payment, lifetime access
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition transform hover:scale-[1.02] mb-2">
                  Enroll Now
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 text-sm">
                  Add to Wishlist
                </button>
                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                  <p className="font-semibold">This course includes:</p>
                  <p>✓ HD video lectures</p>
                  <p>✓ Lifetime access</p>
                  <p>✓ Certificate of completion</p>
                  <p>✓ Community support</p>
                </div>
              </div>

              {/* Video List */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 max-h-[320px] overflow-y-auto">
                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Course Lessons
                </h4>
                {videos.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    No videos added to this course yet.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {videos.map((v, idx) => (
                      <li
                        key={v.id}
                        className={`flex items-start gap-2 p-2 rounded-xl cursor-pointer text-xs ${activeVideo?.id === v.id
                            ? "bg-white shadow-sm border border-purple-200"
                            : "hover:bg-white"
                          }`}
                        onClick={() => handleVideoClick(v)}
                      >
                        <div className="mt-0.5">
                          <Play className="w-3 h-3 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 line-clamp-1">
                            {idx + 1}. {v.title}
                          </p>
                          <p className="text-gray-500 line-clamp-1">
                            {v.description}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {v.views ?? 0} views
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------- ADMIN PANEL ---------------------- */

const AdminPanel = ({ onDataChanged }) => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  // Categories loaded from Supabase `categories` table
  const [categories, setCategories] = useState([]);

  const [newCourse, setNewCourse] = useState({
    name: "",
    author_name: "",
    rating: "",
    students: "",
    tags: "",
    price: "",
    emoji: "",
    color: "",
    duration: "",
    lessons: "",
    category: "",
    description: "",
  });

  const [newVideo, setNewVideo] = useState({
    course_id: "",
    title: "",
    description: "",
    author_name: "",
    file: null,
  });

  const fetchCourses = async () => {
    setLoadingCourses(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCourses(data);
      onDataChanged?.();
    }
    setLoadingCourses(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error.message);
      return;
    }

    setCategories(data || []);
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const payload = {
      ...newCourse,
      rating: newCourse.rating ? Number(newCourse.rating) : null,
      price: newCourse.price ? Number(newCourse.price) : null,
      lessons: newCourse.lessons ? Number(newCourse.lessons) : null,
      tags: newCourse.tags
        ? newCourse.tags.split(",").map((t) => t.trim())
        : [],
    };

    const { error } = await supabase.from("courses").insert(payload);

    if (error) {
      alert("Error creating course: " + error.message);
    } else {
      alert("Course created successfully!");
      setNewCourse({
        name: "",
        author_name: "",
        rating: "",
        students: "",
        tags: "",
        price: "",
        emoji: "",
        color: "",
        duration: "",
        lessons: "",
        category: "",
        description: "",
      });
      await fetchCourses();
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course and all its videos?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      alert("Error deleting course: " + error.message);
    } else {
      await fetchCourses();
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    setNewVideo((prev) => ({ ...prev, file }));
  };

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.course_id || !newVideo.title || !newVideo.file) {
      alert("Select course, title and video file");
      return;
    }
    setLoadingVideos(true);

    try {
      // 1. upload to storage
      const file = newVideo.file;
      const filePath = `course-${newVideo.course_id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("videos")
        .getPublicUrl(uploadData.path);

      const videoUrl = publicUrlData.publicUrl;

      // 2. insert row in videos table
      const { error: insertError } = await supabase.from("videos").insert({
        course_id: newVideo.course_id,
        title: newVideo.title,
        description: newVideo.description,
        author_name: newVideo.author_name,
        video_url: videoUrl,
      });

      if (insertError) throw insertError;

      setNewVideo({
        course_id: "",
        title: "",
        description: "",
        author_name: "",
        file: null,
      });

      e.target.reset();
      alert("Video uploaded & saved!");
      onDataChanged?.();
    } catch (err) {
      alert("Error uploading video: " + err.message);
    } finally {
      setLoadingVideos(false);
    }
  };

  return (
    <section className="mt-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-600" />
          Admin Panel (Local Only)
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Create Course */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Create New Course</h3>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-sm">
              {/* Course Name */}
              <div>
                <label className="block mb-1 font-medium">Course Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Author + Rating */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">Author Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.author_name}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        author_name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Rating (4.9)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.rating}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        rating: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Students + Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">
                    Students Count (24.5K)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.students}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        students: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Price ($29.99)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.price}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        price: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block mb-1 font-medium">
                  Tags (React, Node.js)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  value={newCourse.tags}
                  onChange={(e) =>
                    setNewCourse((p) => ({ ...p, tags: e.target.value }))
                  }
                />
              </div>

              {/* Duration + Lessons */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-medium">
                    Duration (42 hours)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.duration}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        duration: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Lessons (156)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                    value={newCourse.lessons}
                    onChange={(e) =>
                      setNewCourse((p) => ({
                        ...p,
                        lessons: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Category from Supabase table */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  value={newCourse.category}
                  onChange={(e) =>
                    setNewCourse((p) => ({
                      ...p,
                      category: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Categories come from Supabase table <code>categories</code>.
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg"
              >
                {loadingCourses ? "Saving..." : "Save Course"}
              </button>
            </form>

            {/* Optional: show list of existing courses here if you want */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-sm">Existing Courses</h4>
              {courses.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No courses yet. Create your first course.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {courses.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-200"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {c.name}
                          {c.category && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                              {c.category}
                            </span>
                          )}
                        </p>
                        <p className="text-gray-500 text-[11px]">
                          {c.author_name}
                        </p>
                      </div>
                      <button
                        className="text-[11px] px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                        onClick={() => handleDeleteCourse(c.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Upload Video */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Add Video to Course</h3>
            <form onSubmit={handleCreateVideo} className="space-y-4 text-sm">
              <div>
                <label className="block mb-1 font-medium">Course</label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={newVideo.course_id}
                  onChange={(e) =>
                    setNewVideo((p) => ({ ...p, course_id: e.target.value }))
                  }
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Video Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Author</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={newVideo.author_name}
                  onChange={(e) =>
                    setNewVideo((p) => ({
                      ...p,
                      author_name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
                  rows={3}
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="w-full text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg disabled:opacity-60"
                disabled={loadingVideos}
              >
                {loadingVideos ? "Uploading..." : "Upload Video"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------- MAIN PAGE -------------------------- */

export default function LearnifyHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const featuresRef = useRef(null);
  const pathsRef = useRef(null);
  const coursesRef = useRef(null);
  const testimonialsRef = useRef(null);

  /* ---------- Static UI data ---------- */

  const skills = [
    "Development",
    "Graphic Design",
    "Marketing",
    "Business Module",
    "Data Science",
    "Creative Arts",
  ];

  const learningPaths = [
    {
      icon: Code,
      title: "Software Developer",
      count: "2,340 courses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Creative Designer",
      count: "1,890 courses",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketer",
      count: "1,567 courses",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "Data Scientist",
      count: "1,234 courses",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Full-Stack Developer at Google",
      image: "👩‍💻",
      text: "Learnify transformed my career. I went from beginner to landing my dream job in just 6 months. The courses are incredibly comprehensive and practical.",
    },
    {
      name: "David Kim",
      role: "UX Designer at Apple",
      image: "👨‍🎨",
      text: "The design courses here are world-class. The instructors are industry professionals, and the projects helped me build an amazing portfolio that got me hired.",
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist at Microsoft",
      image: "👩‍🔬",
      text: "Best investment in my education. The AI and machine learning courses are cutting-edge and taught me skills that are directly applicable in my role.",
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Expert Instructors",
      desc: "Learn from industry professionals with real-world experience",
    },
    {
      icon: Layers,
      title: "Project-Based Learning",
      desc: "Build portfolio-worthy projects while you learn",
    },
    {
      icon: Award,
      title: "Certificates",
      desc: "Earn recognized certificates to boost your career",
    },
    {
      icon: Users,
      title: "Community Support",
      desc: "Join a thriving community of learners and mentors",
    },
  ];

  /* ---------- Effects ---------- */

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const skillInterval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 2500);

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(skillInterval);
      clearInterval(testimonialInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const enhanced = data.map((c, index) => ({
        ...c,
        color:
          c.category === "Development"
            ? "from-violet-500 to-purple-500"
            : c.category === "Marketing"
              ? "from-orange-500 to-amber-500"
              : c.category === "Data Science"
                ? "from-cyan-500 to-blue-500"
                : "from-pink-500 to-rose-500",
        image: ["🚀", "🤖", "🎨", "📈", "⛓️", "✨"][index % 6],
        price: c.price || 29.99,
        level: c.level || "All Levels",
        duration: c.duration || "20 hours",
        lessons: c.lessons || 40,
      }));
      setCourses(enhanced);
    }
  };

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setVideos(data);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchVideos();
  }, []);

  /* ---------- Helpers ---------- */

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  };

  const handleOpenCourseModal = (course) => {
    const vids = videos.filter((v) => v.course_id === course.id);
    setSelectedCourse(course);
    setSelectedCourseVideos(vids);
  };

  const handleVideoPlayed = async (video) => {
    const { error } = await supabase
      .from("videos")
      .update({ views: (video.views || 0) + 1 })
      .eq("id", video.id);

    if (!error) {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === video.id ? { ...v, views: (v.views || 0) + 1 } : v
        )
      );
      setSelectedCourseVideos((prev) =>
        prev.map((v) =>
          v.id === video.id ? { ...v, views: (v.views || 0) + 1 } : v
        )
      );
    }
  };

  const categories = [
    "All",
    ...Array.from(
      new Set(courses.map((c) => c.category).filter(Boolean))
    ),
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  /* -------------------------- RENDER -------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          style={{
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
            transition: "all 0.5s ease-out",
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-green-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learnify
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
                onClick={() => scrollTo(featuresRef)}
              >
                Features
              </button>
              <button
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
                onClick={() => scrollTo(pathsRef)}
              >
                Paths
              </button>
              <button
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
                onClick={() => scrollTo(coursesRef)}
              >
                Courses
              </button>
              <button
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
                onClick={() => scrollTo(testimonialsRef)}
              >
                Testimonials
              </button>
            </div>

            {/* Auth + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                className="hidden sm:inline-block px-6 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </button>
              <button
                className="hidden sm:inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-semibold transition transform hover:scale-105"
                onClick={() => setShowSignUp(true)}
              >
                Get Started
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center"
                onClick={() => setMobileNavOpen((v) => !v)}
              >
                <span className="sr-only">Toggle navigation</span>
                <div className="space-y-1.5">
                  <div className="w-5 h-0.5 bg-gray-800" />
                  <div className="w-5 h-0.5 bg-gray-800" />
                  <div className="w-5 h-0.5 bg-gray-800" />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {mobileNavOpen && (
            <div className="mt-4 flex flex-col gap-3 md:hidden">
              <button
                className="text-left px-2 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold"
                onClick={() => scrollTo(featuresRef)}
              >
                Features
              </button>
              <button
                className="text-left px-2 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold"
                onClick={() => scrollTo(pathsRef)}
              >
                Paths
              </button>
              <button
                className="text-left px-2 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold"
                onClick={() => scrollTo(coursesRef)}
              >
                Courses
              </button>
              <button
                className="text-left px-2 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-semibold"
                onClick={() => scrollTo(testimonialsRef)}
              >
                Testimonials
              </button>
              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700"
                  onClick={() => {
                    setShowSignIn(true);
                    setMobileNavOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                  onClick={() => {
                    setShowSignUp(true);
                    setMobileNavOpen(false);
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  Trusted by 50,000+ learners worldwide
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                Master{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {skills[activeSkill]}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full" />
                </span>
                <br />
                <span className="text-gray-800">With Experts</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your career with world-class courses designed by
                industry professionals. Learn practical skills, build real
                projects, and achieve your goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => scrollTo(coursesRef)}
                >
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition flex items-center justify-center gap-2"
                  onClick={() => scrollTo(testimonialsRef)}
                >
                  <Play className="w-5 h-5" />
                  Watch How It Works
                </button>
              </div>

              <div className="flex items-center gap-8 flex-wrap">
                <div>
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Online Courses</div>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 transform hover:-translate-y-2 transition">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Development</h3>
                  <p className="text-sm text-gray-600">2,340+ courses</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 transform hover:-translate-y-2 transition">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Design</h3>
                  <p className="text-sm text-gray-600">1,890+ courses</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 transform hover:-translate-y-2 transition">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Marketing</h3>
                  <p className="text-sm text-gray-600">1,567+ courses</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 transform hover:-translate-y-2 transition">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Data Science</h3>
                  <p className="text-sm text-gray-600">1,234+ courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Why Choose Learnify?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition" />
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-transparent hover:border-blue-300 transition transform hover:-translate-y-2 duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section ref={pathsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Choose Your Learning Path
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Curated career tracks designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition`}
                  >
                    <path.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{path.count}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section
        ref={coursesRef}
        className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Hand-picked courses to boost your career
            </p>
          </div>

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500">
              No courses yet. Use the Admin Panel below to create some.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300"
                  onClick={() => handleOpenCourseModal(course)}
                >
                  <div
                    className={`relative h-48 bg-gradient-to-br ${course.color} flex items-center justify-center text-7xl overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition" />
                    <span className="relative z-10 transform group-hover:scale-110 transition">
                      {course.image}
                    </span>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-sm font-semibold text-gray-800 shadow">
                      {course.level || "All Levels"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.name || course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.author_name || "Expert Instructor"}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">
                          {course.rating || 4.8}
                        </span>
                      </div>
                    </div>

                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}


                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        ${course.price || 19.99}
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Learners Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Real success stories from real students
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-200">
              <div className="text-5xl sm:text-6xl mb-4">
                {testimonials[activeTestimonial].image}
              </div>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                “{testimonials[activeTestimonial].text}”
              </p>
              <h4 className="font-bold text-xl sm:text-2xl text-gray-900">
                {testimonials[activeTestimonial].name}
              </h4>
              <p className="text-gray-600">
                {testimonials[activeTestimonial].role}
              </p>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition ${i === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-extrabold mb-4">Learnify</h3>
            <p className="text-white/80 leading-relaxed">
              Elevate your skills with industry-leading courses and hands-on
              learning.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Explore</h4>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Courses
              </li>
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Categories
              </li>
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Learning Paths
              </li>
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Pricing
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Help Center
              </li>
              <li className="hover:text-yellow-300 cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-yellow-300 cursor-pointer transition">
                FAQ
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-6"
                  alt="Google"
                />
              </a>
              <a className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                  className="w-6 invert"
                  alt="Facebook"
                />
              </a>
              <a className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                  className="w-6 invert"
                  alt="X (Twitter)"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center text-white/70 text-sm mt-12 border-t border-white/20 pt-6">
          © {new Date().getFullYear()} Learnify — All Rights Reserved.
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel
        onDataChanged={() => {
          fetchCourses();
          fetchVideos();
        }}
      />

      {/* Modals */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          videos={selectedCourseVideos}
          onClose={() => setSelectedCourse(null)}
          onVideoPlayed={handleVideoPlayed}
        />
      )}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
}
