import { useEffect, useState } from "react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  const handleAddStudent = async () => {
    const name = prompt("Enter student name:");
    const email = prompt("Enter student email:");
    const batch = prompt("Enter student batch:");

    if (!name || !email || !batch) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, batch }),
      });

      if (!res.ok) throw new Error("Failed to add student");

      const newStudent = await res.json();
      setStudents([...students, newStudent]);
    } catch (err) {
      console.error("Add student error:", err);
      alert("Error adding student");
    }
  };

  const handleDeleteStudent = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete student");

      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete student error:", err);
      alert("Error deleting student");
    }
  };

  const handleEditStudent = async (student) => {
    const name = prompt("Enter new name:", student.name);
    const email = prompt("Enter new email:", student.email);
    const batch = prompt("Enter new batch:", student.batch);

    if (!name || !email || !batch) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, batch }),
      });

      if (!res.ok) throw new Error("Failed to update student");

      const updated = await res.json();

      setStudents(
        students.map((s) => (s.id === student.id ? updated : s))
      );
    } catch (err) {
      console.error("Edit student error:", err);
      alert("Error editing student");
    }
  };

  if (loading) return <p className="p-6">Loading students...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Students</h1>

      <button
        onClick={handleAddStudent}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Student
      </button>

      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Batch</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{student.name}</td>
              <td className="p-3 border-b">{student.email}</td>
              <td className="p-3 border-b">{student.batch}</td>
              <td className="p-3 border-b flex gap-2">
                <button
                  onClick={() => handleEditStudent(student)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
