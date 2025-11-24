import { useState } from "react";
import { supabase } from "../supabaseClient";
import bcrypt from "bcryptjs";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !user) {
      setError("Invalid admin credentials.");
      return;
    }

    if (user.role_name !== "admin" && user.role_id !== "admin") {
      setError("You are not authorized to access admin panel.");
      return;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      setError("Invalid password.");
      return;
    }

    localStorage.setItem("learnifyAdmin", JSON.stringify(user));
    window.location.replace("/admin/dashboard");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 border rounded-lg mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
