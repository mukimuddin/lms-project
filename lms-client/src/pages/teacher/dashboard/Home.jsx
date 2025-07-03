export default function Home() {
    const teacher = {
      name: "Mr. Rahim Uddin",
      subject: "Full Stack Web Development",
      batches: ["Web Dev - July 2025", "Web Dev - June 2025"],
    };
  
    return (
      <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Welcome, {teacher.name}!</h1>
        <p className="text-gray-700 mb-2">
          Subject: <strong>{teacher.subject}</strong>
        </p>
        <p className="text-gray-700 mb-2">Assigned Batches:</p>
        <ul className="list-disc pl-6 text-gray-700">
          {teacher.batches.map((batch, index) => (
            <li key={index}>{batch}</li>
          ))}
        </ul>
      </div>
    );
  }
  