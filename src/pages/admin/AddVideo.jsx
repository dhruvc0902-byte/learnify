import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AddVideo() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [video, setVideo] = useState({
    course_id: "",
    title: "",
    description: "",
    author_name: "",
    file: null,
  });

  useEffect(() => {
    supabase
      .from("courses")
      .select("id, name")
      .then(({ data }) => setCourses(data || []));
  }, []);

  const handleFileChange = (e) => {
    setVideo((v) => ({ ...v, file: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video.course_id || !video.title || !video.file) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const file = video.file;
      const filePath = `course-${video.course_id}/${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage.from("videos").upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("videos").getPublicUrl(uploadData.path);

      const { error } = await supabase.from("videos").insert({
        course_id: video.course_id,
        title: video.title,
        description: video.description,
        author_name: video.author_name,
        video_url: publicUrl,
      });

      if (error) throw error;

      alert("Video Uploaded Successfully!");
      setVideo({
        course_id: "",
        title: "",
        description: "",
        author_name: "",
        file: null,
      });

    } catch (err) {
      alert("Upload failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 font-medium">Course</label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={video.course_id}
            onChange={(e) =>
              setVideo((p) => ({ ...p, course_id: e.target.value }))
            }
            required
          >
            <option value="">Select Course</option>
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
            className="w-full px-3 py-2 border rounded-lg"
            value={video.title}
            onChange={(e) =>
              setVideo((p) => ({ ...p, title: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Video File</label>
          <input
            type="file"
            className="w-full"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
