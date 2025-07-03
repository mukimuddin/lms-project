import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Student Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/student/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/student/dashboard/batch" className="hover:underline">My Batch</Link>
          <Link to="/student/dashboard/schedule" className="hover:underline">My Schedule</Link>
          <Link to="/student/dashboard/progress" className="hover:underline">Progress Report</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-blue-50 p-10">
        <Outlet /> {/* This renders the nested subpages */}
      </main>
    </div>
  );
}
