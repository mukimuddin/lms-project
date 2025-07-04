import { useEffect, useState } from "react";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");

  const [editId, setEditId] = useState(null);

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

  const handleAddOrUpdate = async () => {
    if (!name.trim() || !email.trim() || !batch.trim()) {
      alert("All fields are required");
      return;
    }

    const url = editId
      ? `http://localhost:5000/students/${editId}`
      : "http://localhost:5000/students";

    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, batch }),
      });

      if (!res.ok) throw new Error("Failed to save student");

      const updatedStudent = await res.json();

      if (editId) {
        setStudents((prev) =>
          prev.map((s) => (s.id === editId ? updatedStudent : s))
        );
      } else {
        setStudents((prev) => [...prev, updatedStudent]);
      }

      // Reset
      setName("");
      setEmail("");
      setBatch("");
      setEditId(null);
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Failed to save student");
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setBatch(student.batch);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete");
    }
  };

  if (loading) return <p className="p-6">Loading students...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Students</h1>

      {/* Add/Edit Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Batch"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 sm:col-span-3"
        >
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Student List */}
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
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-600 hover:underline"
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