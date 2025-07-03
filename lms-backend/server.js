const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ==================== IN-MEMORY DATA ====================

let students = [
  { id: 1, name: "Sakib Hasan", email: "sakib@example.com", batch: "Web Dev - July 2025" },
  { id: 2, name: "Naimur Rahman", email: "naimur@example.com", batch: "Web Dev - July 2025" },
  { id: 3, name: "Rafiul Islam", email: "rafi@example.com", batch: "Web Dev - June 2025" },
];

let batches = [
  { id: 1, name: "Web Dev - July 2025" },
  { id: 2, name: "Web Dev - June 2025" }
];

let teachers = [
  { id: 1, name: "Rafiul Islam", email: "rafi@example.com", subject: "Math" },
  { id: 2, name: "Asif Mahmud", email: "asif@example.com", subject: "Physics" }
];

// ==================== STUDENT ROUTES ====================

app.get("/students", (req, res) => {
  res.json(students);
});

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

app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, email, batch } = req.body;
  const student = students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ error: "Student not found" });

  if (name) student.name = name;
  if (email) student.email = email;
  if (batch) student.batch = batch;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});

// ==================== BATCH ROUTES ====================

app.get("/batches", (req, res) => {
  res.json(batches);
});

app.post("/batches", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Batch name is required" });

  const newBatch = {
    id: batches.length ? batches[batches.length - 1].id + 1 : 1,
    name,
  };

  batches.push(newBatch);
  res.status(201).json(newBatch);
});

app.put("/batches/:id", (req, res) => {
  const batchId = parseInt(req.params.id);
  const { name } = req.body;

  const batch = batches.find((b) => b.id === batchId);
  if (!batch) return res.status(404).json({ error: "Batch not found" });
  if (!name) return res.status(400).json({ error: "Batch name is required" });

  batch.name = name;
  res.json(batch);
});

app.delete("/batches/:id", (req, res) => {
  const batchId = parseInt(req.params.id);
  const index = batches.findIndex((b) => b.id === batchId);
  if (index === -1) return res.status(404).json({ error: "Batch not found" });

  const deletedBatch = batches.splice(index, 1);
  res.json(deletedBatch[0]);
});

// ==================== TEACHER ROUTES ====================

app.get("/teachers", (req, res) => {
  res.json(teachers);
});

app.post("/teachers", (req, res) => {
  const { name, email, subject } = req.body;
  if (!name || !email || !subject) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const newTeacher = {
    id: teachers.length ? teachers[teachers.length - 1].id + 1 : 1,
    name,
    email,
    subject
  };
  teachers.push(newTeacher);
  res.status(201).json(newTeacher);
});

app.put("/teachers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, subject } = req.body;
  const teacher = teachers.find(t => t.id === id);
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });

  if (name) teacher.name = name;
  if (email) teacher.email = email;
  if (subject) teacher.subject = subject;

  res.json(teacher);
});

app.delete("/teachers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = teachers.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Teacher not found" });

  const deleted = teachers.splice(index, 1);
  res.json(deleted[0]);
});

// ==================== ADMIN REPORTS ROUTE ====================

app.get("/reports", (req, res) => {
  res.json({
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalBatches: batches.length,
  });
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
