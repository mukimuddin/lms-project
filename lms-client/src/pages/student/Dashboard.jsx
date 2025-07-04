import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token"); // if you use tokens
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Student Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-700 text-white p-6 space-y-4">
          <nav className="flex flex-col gap-2">
            <Link to="/student/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/student/dashboard/batch" className="hover:underline">
              My Batch
            </Link>
            <Link to="/student/dashboard/schedule" className="hover:underline">
              My Schedule
            </Link>
            <Link to="/student/dashboard/progress" className="hover:underline">
              Progress Report
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-blue-50 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
