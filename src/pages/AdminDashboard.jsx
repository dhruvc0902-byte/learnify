import React, { useEffect, useState } from "react";
import AdminPanel from "../components/AdminPanel";
import { supabase } from "../supabaseClient";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("learnifyAdmin");
    if (stored) {
      setAdmin(JSON.parse(stored));
    } else {
      window.location.replace("/admin"); // if not logged in
    }
  }, []);

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <AdminPanel 
        onDataChanged={() => {
          console.log("Course or video added — reload data if needed.");
        }}
      />
    </div>
  );
}
