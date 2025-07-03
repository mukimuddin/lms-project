export default function StudentHome() {
  const student = {
    name: "Mukim Uddin",
    batch: "Web Dev Batch - July 2025",
    nextClass: "July 5, 2025, 10:00 AM",
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome, {student.name}!</h1>
      <p className="text-gray-700 mb-2">
        Your Batch: <strong>{student.batch}</strong>
      </p>
      <p className="text-gray-700">
        Next Class: <strong>{student.nextClass}</strong>
      </p>
    </div>
  );
}
