import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/admin/dashboard/manage-students" className="hover:underline">Manage Students</Link>
          <Link to="/admin/dashboard/manage-teachers" className="hover:underline">Manage Teachers</Link>
          <Link to="/admin/dashboard/manage-batches" className="hover:underline">Manage Batches</Link>
          <Link to="/admin/dashboard/reports" className="hover:underline">Reports</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-red-50 p-10">
        <Outlet />
      </main>
    </div>
  );
}
