import { useState, useEffect } from "react";

export default function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchName, setBatchName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch batches
  const fetchBatches = () => {
    fetch("http://localhost:5000/batches")
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching batches:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Add new batch
  const handleAddBatch = async () => {
    if (!batchName.trim()) return alert("Batch name required");

    try {
      const res = await fetch("http://localhost:5000/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: batchName }),
      });

      const newBatch = await res.json();
      setBatches([...batches, newBatch]);
      setBatchName("");
    } catch (err) {
      console.error(err);
      alert("Error adding batch");
    }
  };

  // Start editing
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  // Submit edit
  const handleUpdate = async () => {
    if (!editName.trim()) return alert("Name can't be empty");

    try {
      const res = await fetch(`http://localhost:5000/batches/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });

      const updated = await res.json();
      setBatches(
        batches.map((b) => (b.id === updated.id ? updated : b))
      );
      setEditId(null);
      setEditName("");
    } catch (err) {
      console.error(err);
      alert("Error updating batch");
    }
  };

  // Delete batch
  const handleDelete = async (id) => {
    if (!confirm("Delete this batch?")) return;

    try {
      await fetch(`http://localhost:5000/batches/${id}`, {
        method: "DELETE",
      });
      setBatches(batches.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting batch");
    }
  };

  if (loading) return <p className="p-6">Loading batches...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Batches</h1>

      {/* Add new */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="Enter new batch name"
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleAddBatch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Batch List */}
      <ul className="space-y-3">
        {batches.map((batch) => (
          <li
            key={batch.id}
            className="flex items-center justify-between border-b pb-2"
          >
            {editId === batch.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-grow border border-gray-300 px-2 py-1 mr-2"
                />
                <button
                  onClick={handleUpdate}
                  className="text-green-600 font-bold mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{batch.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(batch.id, batch.name)}
                    className="text-blue-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(batch.id)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
