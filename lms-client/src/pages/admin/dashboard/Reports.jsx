import { useEffect, useState } from "react";

export default function AdminReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading report...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Admin Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-3xl font-bold">{report.totalStudents}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Teachers</h2>
          <p className="text-3xl font-bold">{report.totalTeachers}</p>
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Batches</h2>
          <p className="text-3xl font-bold">{report.totalBatches}</p>
        </div>
      </div>
    </div>
  );
}
