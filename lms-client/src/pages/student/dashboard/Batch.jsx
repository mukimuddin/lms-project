export default function Batch() {
  const batchInfo = {
    name: "Web Dev Batch - July 2025",
    totalStudents: 25,
    teacher: "Mr. Rahim Uddin",
    timing: "Every Sat, Mon, Wed — 10:00 AM to 12:00 PM",
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">My Batch Info</h1>
      <p><strong>Batch Name:</strong> {batchInfo.name}</p>
      <p><strong>Total Students:</strong> {batchInfo.totalStudents}</p>
      <p><strong>Teacher:</strong> {batchInfo.teacher}</p>
      <p><strong>Class Timing:</strong> {batchInfo.timing}</p>
    </div>
  );
}
