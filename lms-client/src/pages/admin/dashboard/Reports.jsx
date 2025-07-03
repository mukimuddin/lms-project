export default function Reports() {
    const reports = [
      {
        student: "Sakib Hasan",
        teacher: "Mr. Rahim Uddin",
        batch: "Web Dev - July 2025",
        remarks: "Doing great. Very attentive and quick learner.",
      },
      {
        student: "Naimur Rahman",
        teacher: "Mr. Rahim Uddin",
        batch: "Web Dev - July 2025",
        remarks: "Improved attendance recently. Needs consistency.",
      },
      {
        student: "Rafiul Islam",
        teacher: "Mr. Kazi Arif",
        batch: "Web Dev - June 2025",
        remarks: "Doing okay. Participates in class activities.",
      },
    ];
  
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Student Reports</h1>
        <div className="space-y-4">
          {reports.map((report, i) => (
            <div key={i} className="border p-4 rounded shadow-sm hover:shadow-md transition">
              <p><strong>Student:</strong> {report.student}</p>
              <p><strong>Teacher:</strong> {report.teacher}</p>
              <p><strong>Batch:</strong> {report.batch}</p>
              <p><strong>Remarks:</strong> {report.remarks}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  