const Blog = require('../models/blogmodel');
const path = require('path');
const fs = require('fs');

// Get the blog form for adding a new blog
const getBlogform = (req, res) => {
    res.render('addblog');
};

// Post a new blog
const postBlogform = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user._id; // Get the author's ID from the authenticated user
        const Imgpath = req.file ? `/uploads/${req.file.filename}` : null;

        const blog = new Blog({ title, content, author, image: Imgpath });
        await blog.save();

        res.redirect('/myblog'); // Redirect to the user's blog list after adding
    } catch (error) {
        console.error("Error Adding Blog", error);
        res.status(500).send("Error Adding Blog");
    }
};

// Get all blogs for the user
const getMyblog = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id }); // Fetch only the blogs of the logged-in user
        res.render('myblog', { blogs });
    } catch (error) {
        console.error("Error fetching My Blogs", error);
        res.status(500).send("Error fetching My Blogs");
    }
};

// Get all blogs for public view
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blogs from all users
        res.render('allblogs', { blogs }); // You will need to create this view
    } catch (error) {
        console.error("Error fetching All Blogs", error);
        res.status(500).send("Error fetching All Blogs");
    }
};

// Edit blog functionality
const editBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized to edit this blog");
        }
        res.render('addblog', { blog }); // Reuse the add blog form for editing
    } catch (error) {
        console.error("Error fetching Blog for Edit", error);
        res.status(500).send("Error fetching Blog for Edit");
    }
};

// Delete blog functionality
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send("Unauthorized to delete this blog");
        }
        await blog.remove();
        res.redirect('/myblog'); // Redirect after deletion
    } catch (error) {
        console.error("Error deleting Blog", error);
        res.status(500).send("Error deleting Blog");
    }
};

module.exports = { getBlogform, postBlogform, getMyblog, getAllBlogs, editBlog, deleteBlog };
