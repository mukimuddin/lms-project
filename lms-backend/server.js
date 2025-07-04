const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ==================== IN-MEMORY DATA ====================

// Unified users array (admin, teacher, student)
let users = [
  { id: 1, name: "Admin One", email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, name: "Teacher One", email: "teacher1@example.com", password: "teachpass", role: "teacher", batchIds: [1] },
  { id: 3, name: "Student One", email: "student1@example.com", password: "studpass", role: "student", batchId: 1 },
];

// Batches array
let batches = [
  { id: 1, name: "Web Dev - July 2025" },
  { id: 2, name: "Web Dev - June 2025" }
];

// ==================== USER ROUTES ====================

// Admin creates users (students, teachers, admins)
app.post("/users", (req, res) => {
  const { name, email, password, role, batchId, batchIds } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Name, email, password, and role are required" });
  }

  // Check if email exists
  if(users.some(u => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    password,
    role,
  };

  if (role === "student") newUser.batchId = batchId;
  if (role === "teacher") newUser.batchIds = batchIds || [];

  users.push(newUser);
  res.status(201).json({ ...newUser, password: undefined }); // don't send password back
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Get users by role (optional)
app.get("/users/:role", (req, res) => {
  const role = req.params.role;
  const filteredUsers = users.filter(u => u.role === role);
  res.json(filteredUsers.map(u => {
    const { password, ...rest } = u;
    return rest;
  }));
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

// ==================== ADMIN REPORTS ROUTE ====================

app.get("/reports", (req, res) => {
  const totalStudents = users.filter(u => u.role === "student").length;
  const totalTeachers = users.filter(u => u.role === "teacher").length;
  const totalBatches = batches.length;
  res.json({ totalStudents, totalTeachers, totalBatches });
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
