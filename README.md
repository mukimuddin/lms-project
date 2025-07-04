# LMS Project

A simple Learning Management System (LMS) backend API with role-based user management and batch handling. This project serves as the foundation for building a full LMS platform with admins, teachers, and students.

---

## Features

- **User Roles:** Admin, Teacher, Student  
- **User Management:**  
  - Admins can create new users (students, teachers, admins)  
  - Role-based authentication and protected routes  
- **Authentication:** Login system with email and password validation  
- **Batch Management:** CRUD operations on batches (courses or groups)  
- **Reports:** Admin dashboard reports showing total counts of students, teachers, and batches  
- **In-memory Data:** Uses temporary arrays for users and batches (no real database yet)  
- **Middleware:** CORS and JSON parsing enabled for smooth API consumption  

---

## Current Status

- Backend API routes for users, batches, login, and reports implemented  
- Role-based access control applied via protected routes (frontend integration ongoing)  
- Basic validation and error handling in place  
- Passwords stored in plain text (to be improved with hashing in future)  
- Data stored in-memory (to be replaced with persistent database later)  

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- npm (comes with Node.js)  

### Installation

1. Clone this repo:  
   ```bash
   git clone https://github.com/yourusername/lms-project.git
   cd lms-project
npm install
node server.js
The server will start on http://localhost:5000

API Endpoints
User Routes
POST /users — Admin creates a new user (student, teacher, or admin)

POST /login — User login with email and password

GET /users/:role — Get all users by role (admin, teacher, student)

Batch Routes
GET /batches — List all batches

POST /batches — Create a new batch

PUT /batches/:id — Update batch by ID

DELETE /batches/:id — Delete batch by ID

Reports
GET /reports — Get total counts of students, teachers, and batches

Notes & Future Improvements
Security: Passwords are currently stored in plain text. Implement hashing (e.g., bcrypt) before production.

Persistence: Replace in-memory arrays with a real database (MongoDB, PostgreSQL, etc.).

Validation: Enhance input validation and error handling.

Frontend: Connect this API with React frontend including protected routes and dynamic dashboards.

Testing: Add automated tests for routes and functionality.

Contributing
Feel free to open issues or submit pull requests. Your feedback and help are appreciated!

License
MIT

Contact
Mukim Uddin
Email: mdmukimuddin.bd@gmail.com
GitHub: mukimuddin
