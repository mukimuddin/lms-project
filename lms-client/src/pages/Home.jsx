import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to CoachPro LMS</h1>
      <div className="flex gap-6 mt-4">
        <Link to="/student/login" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Student Login
        </Link>
        <Link to="/teacher/login" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
          Teacher Login
        </Link>
        <Link to="/admin/login" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
          Admin Login
        </Link>
      </div>
    </div>
  );
}
