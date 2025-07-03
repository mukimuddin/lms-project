export default function Batches() {
    const batches = [
      {
        name: "Web Dev - July 2025",
        students: 25,
        schedule: "Sat, Mon, Wed — 10:00 AM - 12:00 PM",
      },
      {
        name: "Web Dev - June 2025",
        students: 22,
        schedule: "Sun, Tue, Thu — 3:00 PM - 5:00 PM",
      },
    ];
  
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">My Batches</h1>
        <div className="space-y-4">
          {batches.map((batch, i) => (
            <div key={i} className="border p-4 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{batch.name}</h2>
              <p>Total Students: {batch.students}</p>
              <p>Schedule: {batch.schedule}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  