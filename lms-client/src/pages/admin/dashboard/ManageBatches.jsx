import { useState, useEffect } from "react";

export default function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchName, setBatchName] = useState("");

  // Fetch batches from backend
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

      <ul className="list-disc pl-5 space-y-2">
        {batches.map((batch) => (
          <li key={batch.id} className="text-gray-700">
            {batch.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
