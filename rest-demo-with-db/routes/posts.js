const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().limit(10);
        res.status(200).json(res.json(posts));
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

//get specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post != null) {
            res.json(post);
        }
        res.json({ 'message': "Post with the provided ID could not be found" });
    } catch (err) {
        res.json({ message: err });
    }
})

//post a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(400).json({message: err})
    }

})

router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post != null) {
            const removePost = await Post.remove({ _id: req.params.postId });
            res.json({ "message": "Post deleted successfully" });
        } else {
            res.json({ "message": "Post with the provide Id not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

//update a post 
router.patch('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post != null) {
            const updatedPost = await Post.updateOne(
                { _id: req.params.postId },
                {
                    $set:
                    {
                        title: req.body.title,
                        description: req.body.description
                    }
            });
            res.json(updatedPost);
        } else {
            res.json({ "message": "Post with the provide Id not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
})



module.exports = router;