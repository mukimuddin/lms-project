export default function AdminHome() {
    const admin = {
      name: "Mukim Uddin",
      role: "Super Admin",
      totalStudents: 120,
      totalTeachers: 6,
      totalBatches: 4,
    };
  
    return (
      <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, {admin.name} 👑</h1>
        <p className="text-gray-700 mb-2">Role: <strong>{admin.role}</strong></p>
        <div className="mt-6 space-y-2">
          <p>Total Students: <strong>{admin.totalStudents}</strong></p>
          <p>Total Teachers: <strong>{admin.totalTeachers}</strong></p>
          <p>Total Batches: <strong>{admin.totalBatches}</strong></p>
        </div>
      </div>
    );
  }
  