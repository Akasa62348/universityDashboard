// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

module.exports = (upload) => {
  router.get("/", blogController.getAllBlogs);
  router.get("/:id", blogController.getBlogById);
  router.post("/", upload.single("thumbnail"), blogController.createBlog);
  router.put("/:id", upload.single("thumbnail"), blogController.updateBlog);
  router.delete("/:id", blogController.deleteBlog);

  return router;
};
