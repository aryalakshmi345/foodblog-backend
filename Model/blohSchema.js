const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    blogContent:{
        type:String,
        required:true
    },
    cuisineType:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true
    },
    timestamp:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true   
    },
    incredients:{
        type:String
    },
    recipe:{
        type:String
    },
    profile:{
        type:String
    },
    likes:{
        type:Array,
    },
    comments:{
        type:Array,
    }
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs