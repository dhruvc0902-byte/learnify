// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { 
  Layers, 
  Plus, 
  Video, 
  BookOpen, 
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  Star
} from "lucide-react";

export default function AdminPanel({ onDataChanged }) {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/addcourse");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

    if (!error && data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
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
      const file = newVideo.file;
      const filePath = `course-${newVideo.course_id}/${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage.from("videos").upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("videos").getPublicUrl(uploadData.path);

      const { error: insertError } = await supabase.from("videos").insert({
        course_id: newVideo.course_id,
        title: newVideo.title,
        description: newVideo.description,
        author_name: newVideo.author_name,
        video_url: publicUrl,
      });

      if (insertError) throw insertError;

      setNewVideo({
        course_id: "",
        title: "",
        description: "",
        author_name: "",
        file: null,
      });

      alert("Video uploaded & saved!");
      onDataChanged?.();
    } catch (err) {
      alert("Error uploading video: " + err.message);
    } finally {
      setLoadingVideos(false);
    }
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/addcourse", label: "Add Course", icon: Plus },
    { path: "/addvideo", label: "Add Video", icon: Video },
    { path: "/courses", label: "All Courses", icon: BookOpen },
  ];

  /** ------------------------------
   * FIXED SIDEBAR COMPONENT
   * ------------------------------ */
  const Sidebar = () => (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl transition-all duration-300 z-50 ${
        sidebarOpen ? "w-72" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learnify
              </span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => setActiveRoute(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${
              activeRoute === item.path
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="font-semibold text-sm">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2 bg-white">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700">
          <Settings className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-semibold text-sm">Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  ); //  ✅ FIXED: Properly closed component HERE

  /** ----------------------------------------------------------------
   * IMPORTANT: REMOVED THIS INVALID BROKEN CODE:
   * ), [sidebarOpen, activeRoute, setSidebarOpen, setActiveRoute, navItems]);
   * ---------------------------------------------------------------- */

  /** ------------------------------
   * REST OF YOUR COMPONENTS
   * ------------------------------ */

  const DashboardView = () => (
    <div className="space-y-8">

      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Courses", value: courses.length, icon: BookOpen, gradient: "from-blue-500 to-cyan-500" },
          { label: "Total Students", value: "24.5K", icon: Users, gradient: "from-green-500 to-emerald-500" },
          { label: "Total Revenue", value: "$45.2K", icon: DollarSign, gradient: "from-purple-500 to-pink-500" },
          { label: "Avg Rating", value: "4.8", icon: Star, gradient: "from-orange-500 to-red-500" },
        ].map((stat, idx) => (
          <div key={idx} className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300">
            <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

    </div>
  );

  /** --------------------------------
   * Add Course View (unchanged)
   * -------------------------------- */

      const AddCourseView = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Add New Course
        </h2>
        <p className="text-gray-600 mt-2">Create an amazing learning experience for your students</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-bold text-gray-900">Course Name *</label>
              <input
                type="text"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                placeholder="e.g., Complete Web Development Bootcamp 2025"
                value={newCourse.name}
                onChange={(e) => setNewCourse((p) => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-bold text-gray-900">Instructor Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="John Doe"
                  value={newCourse.author_name}
                  onChange={(e) => setNewCourse((p) => ({ ...p, author_name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-gray-900">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="4.9"
                  value={newCourse.rating}
                  onChange={(e) => setNewCourse((p) => ({ ...p, rating: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-bold text-gray-900">Students Enrolled</label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="24.5K"
                  value={newCourse.students}
                  onChange={(e) => setNewCourse((p) => ({ ...p, students: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-gray-900">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="29.99"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse((p) => ({ ...p, price: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-900">Course Tags</label>
              <input
                type="text"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                placeholder="React, Node.js, MongoDB (comma separated)"
                value={newCourse.tags}
                onChange={(e) => setNewCourse((p) => ({ ...p, tags: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-bold text-gray-900">Duration</label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="42 hours"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse((p) => ({ ...p, duration: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-gray-900">Total Lessons</label>
                <input
                  type="number"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                  placeholder="156"
                  value={newCourse.lessons}
                  onChange={(e) => setNewCourse((p) => ({ ...p, lessons: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-900">Category *</label>
              <select
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                value={newCourse.category}
                onChange={(e) => setNewCourse((p) => ({ ...p, category: e.target.value }))}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-bold text-gray-900">Course Description</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
                placeholder="Write a compelling description that explains what students will learn and why they should enroll..."
                value={newCourse.description}
                onChange={(e) => setNewCourse((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <button
              onClick={handleCreateCourse}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loadingCourses}
            >
              {loadingCourses ? "Creating Course..." : "Create Course"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm h-fit sticky top-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Existing Courses
            <span className="ml-auto text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {courses.length}
            </span>
          </h3>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">No courses yet</p>
              <p className="text-xs text-gray-400 mt-1">Create your first course</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-gray-100 hover:shadow-lg transition-all hover:border-blue-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 pr-2">
                      {c.name}
                    </h4>
                    <button
                      className="ml-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-xs font-bold transition flex-shrink-0"
                      onClick={() => handleDeleteCourse(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                  {c.category && (
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold mb-2">
                      {c.category}
                    </span>
                  )}
                  <p className="text-xs text-gray-600 font-semibold">{c.author_name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );


  /** --------------------------------
   * Add Video View (unchanged)
   * -------------------------------- */
 
      const AddVideoView = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        Add Video Lesson
      </h2>
      <p className="text-gray-600 mt-2">Upload engaging video content to enhance your courses</p>
    </div>

    <div className="max-w-4xl bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-sm">
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-bold text-gray-900">Select Course *</label>
          <select
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
            value={newVideo.course_id}
            onChange={(e) => setNewVideo((p) => ({ ...p, course_id: e.target.value }))}
          >
            <option value="">Choose a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-900">Video Title *</label>
          <input
            type="text"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
            placeholder="e.g., Introduction to React Hooks"
            value={newVideo.title}
            onChange={(e) => setNewVideo((p) => ({ ...p, title: e.target.value }))}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-900">Instructor Name</label>
          <input
            type="text"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
            placeholder="John Doe"
            value={newVideo.author_name}
            onChange={(e) => setNewVideo((p) => ({ ...p, author_name: e.target.value }))}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-900">Video Description</label>
          <textarea
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition text-gray-900"
            rows={5}
            placeholder="Describe what students will learn in this video lesson..."
            value={newVideo.description}
            onChange={(e) => setNewVideo((p) => ({ ...p, description: e.target.value }))}
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-gray-900">Upload Video File *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Video className="w-8 h-8 text-white" />
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:shadow-lg file:cursor-pointer cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-3 font-medium">Supported formats: MP4, MOV, AVI • Max size: 500MB</p>
          </div>
        </div>

        <button
          onClick={handleCreateVideo}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          disabled={loadingVideos}
        >
          <Video className="w-6 h-6" />
          {loadingVideos ? "Uploading Video..." : "Upload Video"}
        </button>
      </div>
    </div>
  </div>
);


  /** --------------------------------
   * All Courses View (unchanged)
   * -------------------------------- */
  const AllCoursesView = () => (
    <>
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            All Courses
          </h2>
          <p className="text-gray-600 mt-2">Manage and monitor all your courses</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
          {courses.length} Total
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-40 flex items-center justify-center text-5xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="relative z-10">{course.emoji || "📚"}</span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition">
                {course.name}
              </h3>
              <p className="text-sm text-gray-600 font-semibold mb-4">{course.author_name}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-gray-900">{course.rating || "N/A"}</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${course.price}
                </span>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar />

      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"} p-8 min-h-screen`}>
        <div className="max-w-7xl mx-auto">
          {activeRoute === "/dashboard" && <DashboardView />}
          {activeRoute === "/addcourse" && <AddCourseView />}
          {activeRoute === "/addvideo" && <AddVideoView />}
          {activeRoute === "/courses" && <AllCoursesView />}
        </div>
      </main>
    </div>
  );
}
