import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AddCourse() {
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .then(({ data }) => setCategories(data || []));
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    if (error) alert("Error: " + error.message);
    else {
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
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add New Course</h1>

      <form onSubmit={handleCreateCourse} className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 font-medium">Course Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={newCourse.name}
            onChange={(e) =>
              setNewCourse((p) => ({ ...p, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1 font-medium">Author Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={newCourse.author_name}
              onChange={(e) =>
                setNewCourse((p) => ({ ...p, author_name: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              value={newCourse.rating}
              onChange={(e) =>
                setNewCourse((p) => ({ ...p, rating: e.target.value }))
              }
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            value={newCourse.category}
            onChange={(e) =>
              setNewCourse((p) => ({ ...p, category: e.target.value }))
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Course"}
        </button>
      </form>
    </div>
  );
}
