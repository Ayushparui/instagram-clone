const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true,
        max: 100
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Posts', postSchema);