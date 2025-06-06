require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://68415904f4e6735fce667fbb--universitydashboardpatna.netlify.app',
    'https://universitydashboardpatna.netlify.app'
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve images

// DB Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Home route
app.get('/', (req, res) => {
  res.send('Hello World from Express and MySQL!');
});

// === Signup Route ===
app.post('/signup', (req, res) => {
  const { fullName, username, password, role } = req.body;
  const sql = 'INSERT INTO users (full_name, username, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [fullName, username, password, role], (err) => {
    if (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ error: 'Signup failed' });
    }
    res.status(200).json({ message: 'Signup successful' });
  });
});

// === Login Route ===
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Login failed' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

// === Routes ===
const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require("./routes/blogRoutes");

// Mount route modules
app.use("/courses", courseRoutes);
app.use("/blogs", blogRoutes(upload));  // <-- Pass multer instance to blog routes

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
