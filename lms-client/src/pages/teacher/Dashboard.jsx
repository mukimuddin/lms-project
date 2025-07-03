import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Teacher Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/teacher/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/teacher/dashboard/batches" className="hover:underline">My Batches</Link>
          <Link to="/teacher/dashboard/reports" className="hover:underline">Student Reports</Link>
          <Link to="/teacher/dashboard/schedule" className="hover:underline">Schedule</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-green-50 p-10">
        <Outlet />
      </main>
    </div>
  );
}
