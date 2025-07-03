export default function ManageTeachers() {
    const teachers = [
      {
        name: "Mr. Rahim Uddin",
        email: "rahim@example.com",
        subject: "Web Development",
        batches: 2,
      },
      {
        name: "Ms. Shirin Akter",
        email: "shirin@example.com",
        subject: "UI/UX Design",
        batches: 1,
      },
      {
        name: "Mr. Kazi Arif",
        email: "arif@example.com",
        subject: "Backend Engineering",
        batches: 3,
      },
    ];
  
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Manage Teachers</h1>
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Subject</th>
              <th className="p-3 border-b">Total Batches</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border-b">{teacher.name}</td>
                <td className="p-3 border-b">{teacher.email}</td>
                <td className="p-3 border-b">{teacher.subject}</td>
                <td className="p-3 border-b">{teacher.batches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  