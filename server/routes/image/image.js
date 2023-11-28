const express = require('express');
const { cloudinary } = require('../../utils/cloudinary');
const router = express.Router();
const Posts = require('../../models/Posts')

// Image upload to cloudinary
router.post('/image', async (req, res) => {
    
    try {
        const data = req.body.data;
        const responseData = await cloudinary.uploader.upload(data, {
            // c9bdywgl: 'instagram_images',
            // folder: 'instagram_images'
            upload_preset: 'images'
        })
        console.log(responseData)
        res.json({ msg: "Image uploaded successfully", responseData }).status(200);
    } catch (error) {
        console.log(error)
    }
})

// Post Upload to database

router.post('/post', async (req, res) => {
    try {
        const { userId, imageId, caption } = req.body;
        console.log(userId, imageId, caption)

        const uploadPost = new Posts({
            userId,
            imageId,
            caption
        })
        await uploadPost.save();
        res.json({ msg: "Post uploaded successfully" }).status(200);
    } catch (error) {
        console.log(error)
    }
})


// Get all posts from database 

router.get('/myposts', async (req, res) => {
    try {

        const  userId  = req.query.userId
        const posts = await Posts.find({ userId: userId });
        console.log(posts)
        res.json({ posts }).status(200);
    } catch (error) {
        console.log(error)
    }
})


// router.get('/myimages', async (req, res) => {
//     try {
//         const { resoureces } = await cloudinary.search.expression
//         ('folder:images')
//         .sort_by('public_id', 'desc')
//         .max_results(30)
//         .execute()

//         const publicIds = resoureces.map((file) => file.public_id);
//         res.json({ publicIds }).status(200);
//     } catch (error) {
        
//     }
// })


module.exports = router;