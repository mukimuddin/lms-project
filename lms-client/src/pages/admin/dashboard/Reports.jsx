export default function AdminReports() {
  // You can later replace with real dynamic data from backend
  const reports = [
    { id: 1, title: "Total Students", value: 35 },
    { id: 2, title: "Active Batches", value: 5 },
    { id: 3, title: "Teachers Registered", value: 12 },
    { id: 4, title: "Pending Tasks", value: 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Reports</h1>
      <div className="grid grid-cols-2 gap-6">
        {reports.map(({ id, title, value }) => (
          <div key={id} className="bg-blue-100 p-4 rounded text-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
