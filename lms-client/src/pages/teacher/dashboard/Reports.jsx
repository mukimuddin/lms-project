export default function Reports() {
    const studentReports = [
      {
        name: "Sakib Hasan",
        batch: "Web Dev - July 2025",
        attendance: 95,
        remarks: "Excellent progress, very active.",
      },
      {
        name: "Naimur Rahman",
        batch: "Web Dev - July 2025",
        attendance: 78,
        remarks: "Needs improvement in consistency.",
      },
      {
        name: "Rafiul Islam",
        batch: "Web Dev - June 2025",
        attendance: 88,
        remarks: "Good understanding, slight delay in tasks.",
      },
    ];
  
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Student Reports</h1>
        <div className="space-y-6">
          {studentReports.map((report, index) => (
            <div key={index} className="border p-4 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{report.name}</h2>
              <p><strong>Batch:</strong> {report.batch}</p>
              <p><strong>Attendance:</strong> {report.attendance}%</p>
              <p><strong>Remarks:</strong> {report.remarks}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  