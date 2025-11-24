import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnifyHero from "./pages/LearnifyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/Login";
import AdminProtectedRoute from "./ProtectedAdminRoute";

import AddCourse from "./pages/admin/AddCourse";
import AddVideo from "./pages/admin/AddVideo";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearnifyHero />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminPanel />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/addcourse"
          element={
            <AdminProtectedRoute>
              <AddCourse />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/addvideo"
          element={
            <AdminProtectedRoute>
              <AddVideo />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
