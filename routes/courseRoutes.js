const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/courses/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, .png, .webp files are allowed'), false);
  }
};


const upload = multer({ storage, fileFilter });

// Create Course with upload
router.post('/', upload.single('main_photo'), courseController.createCourse);

// Other CRUD routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourse);
router.put('/:id', upload.single('main_photo'), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
