import React from 'react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" placeholder="admin01" className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="••••••••" className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
