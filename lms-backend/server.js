const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory students data
let students = [
  { id: 1, name: "Sakib Hasan", email: "sakib@example.com", batch: "Web Dev - July 2025" },
  { id: 2, name: "Naimur Rahman", email: "naimur@example.com", batch: "Web Dev - July 2025" },
  { id: 3, name: "Rafiul Islam", email: "rafi@example.com", batch: "Web Dev - June 2025" },
];

// In-memory batches data
let batches = [
  { id: 1, name: "Web Dev - July 2025" },
  { id: 2, name: "Web Dev - June 2025" }
];

// ==================== STUDENT ROUTES ====================

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Create new student
app.post("/students", (req, res) => {
  const { name, email, batch } = req.body;
  if (!name || !email || !batch) {
    return res.status(400).json({ error: "Please provide name, email, and batch" });
  }
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    email,
    batch,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student by id
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, email, batch } = req.body;

  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (name) student.name = name;
  if (email) student.email = email;
  if (batch) student.batch = batch;

  res.json(student);
});

// Delete student by id
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});

// ==================== BATCH ROUTES ====================

// Get all batches
app.get("/batches", (req, res) => {
  res.json(batches);
});

// Create new batch
app.post("/batches", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Batch name is required" });
  }

  const newBatch = {
    id: batches.length ? batches[batches.length - 1].id + 1 : 1,
    name,
  };

  batches.push(newBatch);
  res.status(201).json(newBatch);
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
