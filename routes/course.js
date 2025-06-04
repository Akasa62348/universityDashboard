const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', upload.single('main_photo'), createCourse);
router.put('/:id', upload.single('main_photo'), updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
