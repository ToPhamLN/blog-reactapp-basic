import Blog from './../models/blog.js';
import { convertSlug } from './../utils/convertslug.js';
import { v2 as cloudinary } from 'cloudinary';

export const getAllBlog = async (req, res) => {
    try {
        const blog = await Blog
            .find({})
            .sort([['createdAt', -1]])
            .populate('author');
        res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message,
        });
    }
}

export const getBlog = async (req, res) => {
    try {
        const blog = await Blog
            .findById(req.params.blogID)
            .populate('author');

        res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message,
        });
    }
};

export const postCreateBlog = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({
                status: 0,
                message: 'Cant not load image'
            })
        }
        const newBlog = new Blog({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.file.path,
            public: req.file.filename,
            content: req.body.content,
            slug: convertSlug(req.body.title),
            author: req.user.userID,
        })

        const blog = await newBlog.save();
        res.status(200).json(blog);
    } catch (error) {
        if (req.file) cloudinary.uploader.destroy(req.file.filename);
        return res.status(500).json({
            status: 0,
            message: error.message,
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        console.log(req.file, req.user);
        const blog = await Blog.findById(req.params.blogID);
        if (!blog) {
            return res.status(404).json({
                status: 0,
                message: 'No blog found',
            });
        }
        if (!req.user.userID == blog.author) {
            return res.status(404).json({
                status: 0,
                message: "You're not allowed to do that!",
            });
        }
        const delPublic = blog.public;
        const blogD = await Blog.findOneAndDelete({ _id: req.params.blogID });
        await cloudinary.uploader.destroy(delPublic);
        res.status(200).json({
            status: 1,
            message: 'Blog deleted',
        });

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: error.message,
        });
    }
};

export const putBlog = async (req, res) => {
    try {
        console.log(req.file, req.user);
        const blog = await Blog.findById(req.params.blogID);
        if (!blog) {
            return res.status(404).json({
                status: 0,
                message: 'No blog found',
            });
        }
        if (!req.user.userID == blog.author) {
            return res.status(404).json({
                status: 0,
                message: "You're not allowed to do that!",
            });
        }
        const delPublic = blog.public;
        const newBlog = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            slug: convertSlug(req.body.title),
            author: req.user.userID,
        }
        if (req.file) {
            newBlog.image = req.file.path;
            newBlog.public = req.file.filename;
        };

        const blogN = await Blog.updateOne({ _id: req.params.blogID }, { $set: newBlog });
        const delImg = await cloudinary.uploader.destroy(delPublic);
        res.status(200).json({
            status: 0,
            message: 'Updated successfully',
            blogN: blogN
        })
    } catch (error) {
        if (req.file) {
            cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(500).json({
            status: 0,
            message: error.message,
        });

    }
};