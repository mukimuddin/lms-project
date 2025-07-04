import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white p-6 flex flex-col">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `mb-4 block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-students"
            className={({ isActive }) =>
              `mb-4 block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Manage Students
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-teachers"
            className={({ isActive }) =>
              `mb-4 block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Manage Teachers
          </NavLink>
          <NavLink
            to="/admin/dashboard/manage-batches"
            className={({ isActive }) =>
              `mb-4 block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Manage Batches
          </NavLink>
          <NavLink
            to="/admin/dashboard/reports"
            className={({ isActive }) =>
              `mb-4 block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            Reports
          </NavLink>
        </nav>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
