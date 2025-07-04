import { useState, useEffect } from "react";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teachers:", err);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeacher = async () => {
    if (!formData.name || !formData.email || !formData.subject) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add teacher");

      const newTeacher = await res.json();
      setTeachers([...teachers, newTeacher]);
      setFormData({ name: "", email: "", subject: "" });
    } catch (err) {
      console.error("Add error:", err);
      alert("Error adding teacher");
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({ name: teacher.name, email: teacher.email, subject: teacher.subject });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.subject) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/teachers/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update teacher");

      const updated = await res.json();
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingId ? updated : t))
      );
      setEditingId(null);
      setFormData({ name: "", email: "", subject: "" });
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating teacher");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/teachers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting teacher");
    }
  };

  if (loading) return <p className="p-6">Loading teachers...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Teachers</h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {editingId ? (
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={handleAddTeacher}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
        >
          Add Teacher
        </button>
      )}

      <table className="w-full border border-gray-300 text-left">
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
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
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