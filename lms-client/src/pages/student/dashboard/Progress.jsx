export default function Progress() {
  const progress = {
    completedTopics: 8,
    totalTopics: 12,
    attendancePercent: 92,
    grade: "A-",
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Progress Report</h1>
      <p>
        Completed Topics:{" "}
        <strong>
          {progress.completedTopics} / {progress.totalTopics}
        </strong>
      </p>
      <p>Attendance: <strong>{progress.attendancePercent}%</strong></p>
      <p>Current Grade: <strong>{progress.grade}</strong></p>
    </div>
  );
}
