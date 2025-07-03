export default function Schedule() {
    const schedule = [
      {
        day: "Saturday",
        time: "10:00 AM - 12:00 PM",
        batch: "Web Dev - July 2025",
      },
      {
        day: "Monday",
        time: "10:00 AM - 12:00 PM",
        batch: "Web Dev - July 2025",
      },
      {
        day: "Sunday",
        time: "3:00 PM - 5:00 PM",
        batch: "Web Dev - June 2025",
      },
      {
        day: "Tuesday",
        time: "3:00 PM - 5:00 PM",
        batch: "Web Dev - June 2025",
      },
    ];
  
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">My Teaching Schedule</h1>
        <div className="space-y-4">
          {schedule.map((item, i) => (
            <div key={i} className="border p-4 rounded shadow-sm hover:shadow-md transition">
              <p><strong>Day:</strong> {item.day}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Batch:</strong> {item.batch}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  