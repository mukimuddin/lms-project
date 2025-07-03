export default function Schedule() {
  const upcomingClasses = [
    { date: "July 5, 2025", time: "10:00 AM", topic: "React Basics" },
    { date: "July 7, 2025", time: "10:00 AM", topic: "Tailwind CSS Deep Dive" },
    { date: "July 10, 2025", time: "10:00 AM", topic: "Backend APIs Intro" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Upcoming Classes</h1>
      <ul className="space-y-4">
        {upcomingClasses.map((cls, i) => (
          <li
            key={i}
            className="p-4 border border-gray-300 rounded hover:shadow-md transition"
          >
            <p className="font-semibold">{cls.topic}</p>
            <p className="text-gray-600">
              {cls.date} at {cls.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
