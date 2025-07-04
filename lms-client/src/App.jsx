import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentLogin from './pages/student/Login';
import TeacherLogin from './pages/teacher/Login';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

// Student dashboard subpages
import StudentHome from './pages/student/dashboard/Home';
import StudentBatch from './pages/student/dashboard/Batch';
import StudentSchedule from './pages/student/dashboard/Schedule';
import StudentProgress from './pages/student/dashboard/Progress';

// Teacher dashboard subpages
import TeacherHome from './pages/teacher/dashboard/Home';
import TeacherBatches from './pages/teacher/dashboard/Batches';
import TeacherReports from './pages/teacher/dashboard/Reports';
import TeacherSchedule from './pages/teacher/dashboard/Schedule';

// Admin dashboard subpages
import AdminHome from './pages/admin/dashboard/Home';
import ManageStudents from './pages/admin/dashboard/ManageStudents';
import ManageTeachers from './pages/admin/dashboard/ManageTeachers';
import ManageBatches from './pages/admin/dashboard/ManageBatches';
import AdminReports from './pages/admin/dashboard/Reports';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Student dashboard routes protected for "student" role */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentHome />} />
          <Route path="batch" element={<StudentBatch />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="progress" element={<StudentProgress />} />
        </Route>

        {/* Teacher dashboard routes protected for "teacher" role */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherHome />} />
          <Route path="batches" element={<TeacherBatches />} />
          <Route path="reports" element={<TeacherReports />} />
          <Route path="schedule" element={<TeacherSchedule />} />
        </Route>

        {/* Admin dashboard routes protected for "admin" role */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-teachers" element={<ManageTeachers />} />
          <Route path="manage-batches" element={<ManageBatches />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </Router>
  );
}