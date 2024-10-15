const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const isAuth = require('../middleware/isAuthenticated');
const blogController = require('../controllers/blogController');

// Define routes
router.get('/addblog',  blogController.getBlogform);
router.post('/addblog',  upload.single('poster'), blogController.postBlogform);
router.get('/myblog', blogController.getMyblog);
router.get('/allblogs', blogController.getAllBlogs); // Route to view all blogs
router.get('/editblog/:id',  blogController.editBlog);
router.post('/editblog/:id',  upload.single('poster'), blogController.postBlogform); // Allow post edit too
router.post('/deleteblog/:id', blogController.deleteBlog); // Route to delete a blog

module.exports = router;
