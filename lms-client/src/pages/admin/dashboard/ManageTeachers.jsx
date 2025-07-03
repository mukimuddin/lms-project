import { useState, useEffect } from "react";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [editId, setEditId] = useState(null); // null means no edit mode

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/teachers");
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      alert("Failed to fetch teachers");
      console.error(err);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "" });
    setEditId(null);
  };

  const handleSubmit = async () => {
    const { name, email, subject } = form;
    if (!name.trim() || !email.trim() || !subject.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      if (editId === null) {
        // Add new teacher
        const res = await fetch("http://localhost:5000/teachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add teacher");
        const newTeacher = await res.json();
        setTeachers([...teachers, newTeacher]);
      } else {
        // Update existing teacher
        const res = await fetch(`http://localhost:5000/teachers/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update teacher");
        const updatedTeacher = await res.json();
        setTeachers(
          teachers.map((t) => (t.id === editId ? updatedTeacher : t))
        );
      }
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (teacher) => {
    setForm({ name: teacher.name, email: teacher.email, subject: teacher.subject });
    setEditId(teacher.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const res = await fetch(`http://localhost:5000/teachers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete teacher");
      setTeachers(teachers.filter((t) => t.id !== id));
      if (editId === id) resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-6">Loading teachers...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Teachers</h1>

      {/* Form */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId === null ? "Add Teacher" : "Update Teacher"}
          </button>
          {editId !== null && (
            <button
              onClick={resetForm}
              className="ml-3 px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Teacher List */}
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Subject</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{teacher.name}</td>
              <td className="p-3 border-b">{teacher.email}</td>
              <td className="p-3 border-b">{teacher.subject}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}