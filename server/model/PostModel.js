const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    comments: [commentSchema],
    
});

module.exports = mongoose.model("Post", PostSchema);
