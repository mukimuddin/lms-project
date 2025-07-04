import { useState, useEffect } from "react";

export default function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchName, setBatchName] = useState("");
  const [editingBatchId, setEditingBatchId] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Fetch all batches
  useEffect(() => {
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
  }, []);

  // Add new batch
  const handleAddBatch = async () => {
    if (!batchName.trim()) {
      alert("Batch name cannot be empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: batchName }),
      });

      if (!res.ok) throw new Error("Failed to add batch");

      const newBatch = await res.json();
      setBatches([...batches, newBatch]);
      setBatchName("");
    } catch (err) {
      console.error("Add batch error:", err);
      alert("Error adding batch");
    }
  };

  // Start editing a batch
  const handleEdit = (batch) => {
    setEditingBatchId(batch.id);
    setEditedName(batch.name);
  };

  // Save the updated batch name
  const handleSave = async (id) => {
    if (!editedName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/batches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      if (!res.ok) throw new Error("Failed to update batch");

      const updated = await res.json();
      setBatches((prev) =>
        prev.map((b) => (b.id === id ? updated : b))
      );
      setEditingBatchId(null);
      setEditedName("");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating batch");
    }
  };

  // Delete a batch
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this batch?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/batches/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete batch");

      setBatches((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting batch");
    }
  };

  if (loading) return <p className="p-6">Loading batches...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Batches</h1>

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
          Add Batch
        </button>
      </div>

      <ul className="space-y-2">
        {batches.map((batch) => (
          <li
            key={batch.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            {editingBatchId === batch.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="flex-grow border rounded px-2 py-1 mr-3"
              />
            ) : (
              <span className="text-gray-800">{batch.name}</span>
            )}

            <div className="flex gap-2">
              {editingBatchId === batch.id ? (
                <button
                  onClick={() => handleSave(batch.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(batch)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(batch.id)}
                className="bg-red-600 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}