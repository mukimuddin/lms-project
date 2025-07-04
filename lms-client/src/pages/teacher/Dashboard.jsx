import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-green-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Teacher Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-green-700 text-white p-6 space-y-4">
          <nav className="flex flex-col gap-2">
            <Link to="/teacher/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/teacher/dashboard/batches" className="hover:underline">
              My Batches
            </Link>
            <Link to="/teacher/dashboard/reports" className="hover:underline">
              Student Reports
            </Link>
            <Link to="/teacher/dashboard/schedule" className="hover:underline">
              Schedule
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-green-50 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
